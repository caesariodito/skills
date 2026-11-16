---
name: handoff
description: Write a portable handoff document so a fresh session, harness or colleague can continue current work. Explicit invocation only; prefer compaction when nothing needs to move.
disable-model-invocation: true
license: MIT
---

# Handoff

Write one concise Markdown document tailored to the user's stated next task. Use the OS temporary directory (`$TMPDIR`, else `/tmp`; `%TEMP%` on Windows), not the workspace. Resolve it with native tools and create a unique file without overwriting another handoff; use restrictive permissions where supported. Warn that temporary files may disappear; use a durable destination only when requested.

Include only what the next session needs:

- Goal, scope, constraints and intended next task.
- Repository/directory, branch and exact relevant commit/worktree when known; identify uncommitted work and unrelated edits to preserve.
- Decisions and reasons, rejected alternatives that matter, assumptions and unknowns. Distinguish verified facts from beliefs.
- Current progress, exact checks run and results, failed/unrun checks, blockers and next concrete steps. Never infer completion from an agent's idle/done status.
- Existing approvals and their limits, pending protected actions and required review/waiver status. A handoff grants no new authority and does not launch another agent.
- A suggested skills section naming installed skills the next agent should read or explicitly invoke. Use advertised paths or harness-native commands, not an assumed Skill tool.

Reference existing specs, plans, ADRs, issues, commits and diffs by path or URL; do not copy their contents or create a parallel source of truth. Flag machine-local or temporary references that will not travel to the destination. Include only relevant paths and evidence, never unrelated private state.

Redact secrets, credentials, auth/session data and unnecessary personal information before writing. Do not copy raw environment dumps or sensitive logs. Do not mark unverified claims as facts.

Return the exact file path and a short instruction for the next session: read that file, then continue the stated task under its own applicable instructions. Do not interpolate the document into a shell command. Keep the current session unchanged apart from the requested file; no automatic clear, compaction, agent launch, commit or workspace edit.

Adapted from Matt Pocock's handoff skill; see [provenance](UPSTREAM.md).
