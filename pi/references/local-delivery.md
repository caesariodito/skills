# Automatic local delivery

Default for every approved repository implementation task, including routine fixes and documentation/configuration changes. Read-only requests create no worktree or commit. This policy is standing user authorization to create a local task branch/worktree and commit only verified task changes. Explicit task restrictions override this default. It grants no push, merge, rebase, cherry-pick, cleanup, deployment or agent-delegation authority.

## Start

- Inspect repository instructions, status (including staged/untracked files), worktrees and intended base before editing. Record the exact base commit. Use the current HEAD when it unambiguously represents the requested starting point; never silently switch to main or fetch/reset another base.
- Create a native Git worktree on a new task branch before implementation. Follow repository branch conventions; otherwise use `<type>/<short-kebab-slug>`, such as `feat/token-refresh`, `fix/token-expiry` or `docs/local-delivery`. Validate with `git check-ref-format --branch`. Never overwrite an existing branch/path; choose an unused suffix for collisions.
- Use repository worktree-location convention, otherwise `${XDG_DATA_HOME:-$HOME/.local/share}/pi-worktrees/<repo-name>/<branch-slug>`. Verify path unused, branch/base correct, clean status and matching Git common directory. Repository-name collisions need a unique directory suffix.
- An existing worktree may be reused only when verified as exclusively assigned to this same task and its branch/base/changes are known. Never switch another checkout's branch or take over another task's worktree.
- Preserve existing dirty work and index exactly. Worktrees do not inherit dirt. If task needs uncommitted changes, unclear base or unclear ownership, ask for the precise inclusion/base decision before continuing; never silently stash, copy, discard or commit them. Unrelated dirt does not block a task that can start from the verified commit.
- Run every edit/check/Git command against the task worktree explicitly. Delegated agents still need separate worktrees and explicit bounded authorization; reviewers remain read-only.
- Non-Git targets need an explicit alternative; never auto-initialize a repository. Creating a branch/worktree is not permission to expand implementation scope.

## Finish

- Complete acceptance checks and any required independent review or explicit waiver before committing. Routine tasks gain no mandatory spec/reviewer. Failed required checks, unresolved blockers or missing required review stop delivery; preserve work and report the blocker.
- Inspect the entire intended diff, including untracked files. Stage explicit task-owned paths only; never `git add .` or `git add -A` indiscriminately. Inspect the staged diff for scope, secrets and accidental files. Mixed ownership blocks staging until resolved.
- Commit with Conventional Commits: `<type>(<optional-scope>): <description>`, using `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`, `style` or `revert` as appropriate. Branch names are a separate convention. Breaking changes still require explicit approval and the appropriate `!`/`BREAKING CHANGE:` marker.
- Run normal commit hooks/signing; never bypass failures, change identity/signing configuration, amend or rewrite history automatically. After hooks, verify committed content matches the verified/reviewed snapshot. Any changed content needs renewed applicable checks/review before acceptance.
- Verify commit success, resulting HEAD and clean task-worktree status. Unexpected leftovers remain visible and block a clean-delivery claim. If task produces no diff, report no-op; never create an empty commit merely to satisfy this policy.
- Report branch, commit hash, worktree path, checks/review results and residual limits. Keep branch and worktree available. Never automatically push, merge, integrate, delete branches or remove worktrees; those require separate explicit authorization.

This is agent guidance, not an executable Git hook or enforced sandbox. Existing sessions must reload guidance before relying on the default.
