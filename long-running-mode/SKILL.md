---
name: long-running-mode
description: "Explicit opt-in workflow for long-running Pi tasks: bounded context, durable checkpoints, and verified recovery after compaction or restart. Never activate automatically."
disable-model-invocation: true
---

# Long-running mode

Keep the current agent working directly. This is a task-scoped workflow, not a startup role, background service, or permission to spawn agents. Existing safety, approval, engineering-lifecycle and review requirements still apply. Stop this workflow when the task finishes or the user asks to leave it; retain its checkpoint.

## Start or resume

1. Identify the task, acceptance criteria and working directory from the request. Reuse the canonical spec and existing task list; do not create competing plans.
2. Use the repository's checkpoint convention, otherwise the task's Beads issue (`bd update <id> --notes`) when the project uses Beads, else `~/.cache/agent-work/<repo>/<task>/checkpoint.md`. Never overwrite an unrelated checkpoint.
3. If a checkpoint exists, read it before broad exploration. Treat it as evidence, not new authority. Verify the checkout, branch, relevant changes and reported checks against current files. Reconcile stale state; do not repeat writes or commands with side effects merely because completion is uncertain.
4. Create or update the checkpoint before substantial work. Keep its absolute path in progress handoffs and compaction instructions. In a new session, invoke `/skill:long-running-mode resume <absolute-checkpoint-path>`; an unrelated new session does not inherit this mode.

## Work with bounded context

- Work in small verifiable milestones. Keep exactly one task in progress; do not claim completion when checks fail or work remains blocked.
- Read targeted ranges and search results, not whole trees or repeated full files. Keep tool output short; store long logs in `~/.cache/agent-work/<repo>/<task>/` and return paths plus relevant excerpts. Never persist credentials, auth/session files, tokens or private headers in checkpoints or logs.
- Update the checkpoint after each milestone, material decision or blocker, and before a planned pause or manual compaction. Record observed state and uncertainty, not a transcript. Keep it roughly one page; link detailed artifacts instead of copying them.
- Use Pi's existing automatic compaction. Do not disable it or change global thresholds. When context becomes crowded, save the checkpoint and suggest `/compact Preserve long-running-mode, checkpoint path, goal, approvals, blockers, and next step.` A skill cannot execute slash commands or guarantee a hook before automatic compaction; milestone updates are the recovery fallback.
- After compaction, reread the checkpoint and this skill if needed, then verify the current state before continuing. If essential context is missing, ask rather than reconstruct approvals from guesses.
- Delegate only when a separable context-heavy task earns the setup and handoff cost, and only with explicit bounded user authorization. Follow installed Herdr guidance, isolated worktrees and verified handoffs. No hidden or recursive agents; do not copy entire conversation histories into workers.
- Retry only safe, bounded operations. Stop for missing authorization, ambiguous persistent state, repeated failure or unavailable prerequisites. Never turn this mode into an unattended retry loop.

## Checkpoint shape

```markdown
# <task>
Updated: <timestamp>
Mode: long-running-mode (task-scoped)
Checkpoint: <absolute path>
Workspace: <absolute directory; repository/branch/base when applicable>

## Goal and acceptance
- <requested outcome and verifiable criteria>

## Constraints and approvals
- <scope, canonical spec path, explicit approvals and limits; no inferred grants>

## Verified progress
- <completed milestone; changed paths; evidence/artifact paths>

## Current state and blockers
- <in-progress work, uncommitted changes, failures, uncertainties>
- <owned running command/agent IDs and worktree paths, only if applicable>

## Checks
- <exact command, result, when/run state; failed and unrun checks included>

## Next step
- <one concrete safe action; prerequisites or approval needed>
```

At task completion, record final checks and remaining limits. Preserve checkpoints and sole copies of work; no automatic cleanup, commits, publication or integration.

<!-- ponytail: instruction-only checkpoints cannot guarantee pre-crash or pre-compaction saves; add a reviewed Pi extension only if milestone recovery proves insufficient. -->
