---
name: cleanup
description: Tidy one repository's local Git state, including merged branches, stale worktrees and stray untracked Markdown notes. Builds a read-only inventory and cleanup plan, then applies only the exact items the user approves. Explicit invocation only.
disable-model-invocation: true
---

# Cleanup

Clean one repository at a time. Inventory is read-only. Removal needs approval for the exact item list in this session. A general request such as "clean everything" is not approval for unmerged work, dirty worktrees, stashes or tracked files.

## 1. Inventory

1. Resolve repository root and read applicable AGENTS/CLAUDE guidance. Guidance protections win.
2. Run `python3 <skill-dir>/scripts/inventory.py <repo>` and add `--base <branch>` when the default branch is ambiguous. The script reads only. Classes:
   - **safe:** branch fully merged into base; clean merged worktree; missing worktree directory.
   - **review:** unique or unpushed commits, dirty or locked worktree, detached HEAD, recent activity, stray untracked/ignored Markdown.
   - **keep:** current, base and protected branches; branches checked out elsewhere; AGENTS/CLAUDE/README and similar project files.
3. Read uncertain items before classifying them, for example a review branch's log or a note's first lines. Check active claims: open PRs, Beads issues, running agents or Herdr terminals using a worktree. Do not delete work another session still owns.
4. Tracked `.md` files are project content, not cleanup. If one looks obsolete, list it as a suggested separate reviewed commit.

## 2. Plan

Present one table: item, class, evidence, proposed action and recovery path. Preselect nothing from `review`. Ask with one structured question round: approve safe items, then pick review items individually. Default unapproved items to keep.

| Item | Action | Recovery |
|---|---|---|
| Merged branch | `git branch -d <b>` | Recreate from printed SHA |
| Clean worktree | `git worktree remove <path>` | Re-add from branch |
| Missing worktree | `git worktree prune` | Metadata only |
| Untracked/ignored note | Move to holding folder | Move back |

Record each branch SHA in the plan before deleting.

## 3. Apply

- Approved items only, in this order: worktrees, then branches, then notes. Re-check state right before each action. If anything changed since inventory, stop and re-plan that item.
- Non-force commands only: `git worktree remove` without `--force`, `git branch -d` not `-D`. When Git refuses, report it; never escalate to force.
- Unmerged branch deletion needs that branch named and approved with its SHA. Use `git branch -D` only for those approved branches.
- Move notes to `${XDG_STATE_HOME:-~/.local/state}/cleanup/<repo-name>/<timestamp>/`, keeping relative paths. Never use `rm` for notes.
- Never touch: remote branches, pushes, history rewrites, stashes, `git clean`, `git reset`, `git checkout --`, `.beads`, `.env*`, credentials, dependency/build directories, submodules or other repositories. Each needs separate explicit approval and is outside this skill's default scope.

## 4. Verify and report

Re-run inventory. Report what was removed or moved (with SHAs and holding path), what was kept and why, Git refusals, and remaining tracked changes. Never claim the repository is clean while review items or tracked changes remain; list them.
