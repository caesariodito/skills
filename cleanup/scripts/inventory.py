#!/usr/bin/env python3
"""Read-only Git cleanup inventory for one repository. Prints JSON; changes nothing.

Usage: inventory.py [repo] [--base <branch>] [--days 30]
Classes: safe (removable with non-force Git commands), review (unique or dirty work),
keep (current/default/protected/guidance). Agent still presents plan before any action.
"""
import argparse
import json
from pathlib import Path
import subprocess
import time

PROTECTED = {'main', 'master', 'develop', 'dev', 'trunk', 'production', 'staging', 'release'}
KEEP_MD = {'agents.md', 'agents.override.md', 'claude.md', 'readme.md', 'changelog.md', 'license.md', 'contributing.md', 'security.md'}
NEVER = ('.beads', '.env', '.git')
# Dependency/build trees: tool-managed, not notes. Clean with their own tooling, never this skill.
SKIP = ('node_modules', 'vendor', '.venv', 'venv', 'bower_components', 'Pods', 'dist', 'build', 'target', '.next')


def git(repo, *args, check=True):
    # No optional locks: inventory must not write .git/index.
    r = subprocess.run(['git', '--no-optional-locks', '-C', str(repo), *args], capture_output=True, text=True)
    if check and r.returncode:
        raise SystemExit(f'git {args[0]} failed: {r.stderr.strip()}')
    return r.stdout if r.returncode == 0 else ''


def default_branch(repo):
    head = git(repo, 'symbolic-ref', '--quiet', '--short', 'refs/remotes/origin/HEAD', check=False).strip()
    if head:
        return head.removeprefix('origin/')
    names = git(repo, 'for-each-ref', '--format=%(refname:short)', 'refs/heads').split()
    return next((n for n in ('main', 'master', 'trunk', 'develop') if n in names), None)


def worktrees(repo):
    out, item = [], {}
    for line in git(repo, 'worktree', 'list', '--porcelain').splitlines() + ['']:
        if not line:
            if item: out.append(item)
            item = {}
            continue
        key, _, value = line.partition(' ')
        item[key] = value or True
    return out


def classify_branches(repo, base, current, checked_out, days):
    rows = []
    fmt = '%(refname:short)%00%(upstream:short)%00%(upstream:track)%00%(committerdate:unix)'
    for line in git(repo, 'for-each-ref', f'--format={fmt}', 'refs/heads').splitlines():
        name, upstream, track, stamp = line.split('\0')
        unique = int(git(repo, 'rev-list', '--count', f'{base}..refs/heads/{name}').strip() or 0) if base else None
        age = int((time.time() - int(stamp)) / 86400)
        reasons = []
        if name == current: reasons.append('current branch')
        if name == base or name in PROTECTED or name.startswith(('release/', 'hotfix/')): reasons.append('protected')
        if name in checked_out: reasons.append('checked out in worktree ' + checked_out[name])
        if reasons:
            cls = 'keep'
        elif unique == 0:
            cls = 'safe'; reasons.append(f'fully merged into {base}')
        else:
            cls = 'review'
            reasons.append(f'{unique} commits not in {base}' if unique else 'no base to compare')
            if not upstream: reasons.append('no upstream: local-only commits')
            elif 'ahead' in track: reasons.append('unpushed: ' + track)
            if age < days: reasons.append(f'touched {age}d ago')
        rows.append({'branch': name, 'class': cls, 'reasons': reasons, 'upstream': upstream or None, 'age_days': age,
                     'gone_upstream': track == '[gone]'})
    return rows


def classify_worktrees(repo, base, main):
    rows, checked_out = [], {}
    for w in worktrees(repo):
        path = w['worktree']
        branch = str(w.get('branch', '')).removeprefix('refs/heads/') or None
        if branch: checked_out[branch] = path
        if Path(path).resolve() == main:
            continue
        reasons = []
        if not Path(path).exists():
            rows.append({'worktree': path, 'branch': branch, 'class': 'safe', 'reasons': ['missing directory: prunable metadata']}); continue
        dirty = git(path, 'status', '--porcelain=v1', '--untracked-files=all', check=False).strip()
        if w.get('locked'): reasons.append('locked')
        if dirty: reasons.append(f'{len(dirty.splitlines())} uncommitted/untracked paths')
        if branch and not git(repo, 'rev-parse', '--verify', '--quiet', f'refs/heads/{branch}', check=False).strip():
            reasons.append('unborn branch: no commits yet')
        elif branch and base:
            unique = int(git(repo, 'rev-list', '--count', f'{base}..refs/heads/{branch}').strip() or 0)
            if unique: reasons.append(f'{unique} commits not in {base}')
        if 'detached' in w: reasons.append('detached HEAD')
        rows.append({'worktree': path, 'branch': branch, 'class': 'review' if reasons else 'safe', 'reasons': reasons or ['clean, merged']})
    return rows, checked_out


def classify_markdown(repo, days):
    rows = []
    for flag, kind in (('--others', 'untracked'), ('--others --ignored', 'ignored')):
        for rel in git(repo, 'ls-files', *flag.split(), '--exclude-standard', '-z').split('\0'):
            if not rel.lower().endswith(('.md', '.mdx')) or any(part in NEVER or part in SKIP for part in Path(rel).parts):
                continue
            path = repo / rel
            age = int((time.time() - path.stat().st_mtime) / 86400) if path.exists() else None
            keep = Path(rel).name.lower() in KEEP_MD
            rows.append({'path': rel, 'kind': kind, 'class': 'keep' if keep else 'review', 'age_days': age,
                         'reasons': ['guidance/project file name'] if keep else [f'{kind}, modified {age}d ago']})
    return rows


def main():
    a = argparse.ArgumentParser()
    a.add_argument('repo', nargs='?', default='.'); a.add_argument('--base'); a.add_argument('--days', type=int, default=30)
    a = a.parse_args()
    repo = Path(git(a.repo, 'rev-parse', '--show-toplevel').strip()).resolve()
    common = Path(git(repo, 'rev-parse', '--path-format=absolute', '--git-common-dir').strip()).resolve()
    main_tree = common.parent if common.name == '.git' else repo
    base = a.base or default_branch(repo)
    if base and not git(repo, 'rev-parse', '--verify', '--quiet', base, check=False).strip():
        raise SystemExit(f'Base branch not found: {base}')
    current = git(repo, 'branch', '--show-current').strip() or None
    trees, checked_out = classify_worktrees(repo, base, main_tree)
    status = git(repo, 'status', '--porcelain=v1').splitlines()
    print(json.dumps({
        'repo': str(repo), 'main_worktree': str(main_tree), 'base': base, 'current': current,
        'status': {'tracked_changes': sum(not l.startswith('??') for l in status), 'untracked': sum(l.startswith('??') for l in status)},
        'stashes': git(repo, 'stash', 'list').splitlines(),
        'worktrees': trees,
        'branches': classify_branches(repo, base, current, checked_out, a.days),
        'markdown': classify_markdown(repo, a.days),
        'remote_branches_untouched': True,
    }, indent=2))


if __name__ == '__main__':
    main()
