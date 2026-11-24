#!/usr/bin/env python3
"""Fixture check: inventory classifies correctly and writes nothing."""
import json
from pathlib import Path
import subprocess
import tempfile

SCRIPT = Path(__file__).with_name('inventory.py')

with tempfile.TemporaryDirectory() as d:
    repo = Path(d) / 'repo'
    def git(*a, cwd=repo): subprocess.run(['git', '-C', str(cwd), '-c', 'user.name=t', '-c', 'user.email=t@example.invalid', *a], check=True, capture_output=True)
    subprocess.run(['git', 'init', '-q', '-b', 'main', str(repo)], check=True)
    git('commit', '--allow-empty', '-qm', 'base')
    git('branch', 'merged')
    git('checkout', '-qb', 'unmerged'); git('commit', '--allow-empty', '-qm', 'unique'); git('checkout', '-q', 'main')
    git('worktree', 'add', '-q', '-b', 'wt-clean', str(Path(d) / 'clean'))
    git('worktree', 'add', '-q', '-b', 'wt-dirty', str(Path(d) / 'dirty'))
    (Path(d) / 'dirty' / 'x.txt').write_text('work')
    git('worktree', 'add', '-q', '-b', 'wt-gone', str(Path(d) / 'gone'))
    subprocess.run(['rm', '-rf', str(Path(d) / 'gone')], check=True)
    git('worktree', 'add', '-q', '--orphan', '-b', 'wt-unborn', str(Path(d) / 'unborn'))
    (repo / 'notes.md').write_text('old')
    (repo / 'AGENTS.md').write_text('guide')
    (repo / 'node_modules').mkdir(); (repo / 'node_modules' / 'pkg.md').write_text('dep')
    git('stash', 'list')
    before = subprocess.run(['find', str(repo / '.git'), '-newer', str(repo / 'notes.md')], capture_output=True, text=True).stdout
    out = json.loads(subprocess.run(['python3', str(SCRIPT), str(repo)], capture_output=True, text=True, check=True).stdout)
    after = subprocess.run(['find', str(repo / '.git'), '-newer', str(repo / 'notes.md')], capture_output=True, text=True).stdout
    assert before == after, 'inventory wrote to .git'
    branch = {b['branch']: b['class'] for b in out['branches']}
    assert branch == {'main': 'keep', 'merged': 'safe', 'unmerged': 'review', 'wt-clean': 'keep', 'wt-dirty': 'keep', 'wt-gone': 'keep'}, branch  # Unborn branch has no ref yet.
    trees = {Path(w['worktree']).name: w['class'] for w in out['worktrees']}
    assert trees == {'clean': 'safe', 'dirty': 'review', 'gone': 'safe', 'unborn': 'review'}, trees
    md = {m['path']: m['class'] for m in out['markdown']}
    assert md == {'notes.md': 'review', 'AGENTS.md': 'keep'}, md
    assert out['base'] == 'main' and out['status']['untracked'] >= 2
print('Cleanup inventory: classification, protections and read-only behavior passed')
