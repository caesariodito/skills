---
name: project-init
description: Inspect a repository, draft concise repository-local AGENTS.md guidance and, on explicit request, connect it to host-configured Beads tracking. Use when a Git repository lacks local agent instructions, when onboarding a codebase, or when the user asks to initialize project guidance, engineering conventions or Beads issue tracking.
---

# Project initialization

Create durable repository guidance from evidence, not generic doctrine.

## 1. Establish scope

1. Resolve repository root with `git rev-parse --show-toplevel`.
2. Search from repository root toward current working directory for `AGENTS.override.md`, `AGENTS.md`, `AGENTS.MD`, `CLAUDE.md`, and `CLAUDE.MD`.
3. If repository-local guidance exists, offer to audit or improve it instead of creating a competing file.
4. Read relevant parent context, but treat machine-level and ancestor-home files as environment guidance rather than repository policy.

Complete when target repository and applicable context files are known.

## 2. Gather evidence

Inspect only files needed to establish:

- build, test, lint, format, type-check, migration, and run commands
- implementation languages and supported runtime versions
- source and test layout
- module or architectural boundaries visible in code
- CI checks and release constraints
- formatter, linter, compiler, and package-manager configuration
- generated files, vendored code, secrets, deployment state, or destructive operations needing protection
- existing issue tracker evidence: `.beads` directory/symlink/redirect, tracked instructions and host-owned workspace mappings; inspect connection keys without reading or printing credentials. Beads installation alone does not prove project enrollment.

Use manifests, lockfiles, scripts, CI, config, and code as sources of truth. Do not copy values that remain easy to discover unless naming them prevents a common mistake.

For each dominant implementation language, read matching file under `references/`. Load only relevant references. Repository evidence overrides generic language guidance.

Complete when every proposed instruction has repository evidence or guards a universal engineering risk.

## 3. Draft one local file

Default target: `<repository-root>/AGENTS.md`.

Keep draft roughly 30–80 lines and organize only applicable sections:

```markdown
# Repository Guidance

## Commands
## Architecture
## Implementation Rules
## Testing and Verification
## Safety
```

Draft rules:

- State exact commands, paths, ownership boundaries, and completion checks.
- Explain non-obvious constraints and reasons.
- Separate mandatory rules from preferences.
- Prefer existing repository vocabulary.
- Keep each rule in one authoritative place.
- Omit generic slogans such as “write clean code,” “follow SOLID,” or “use best practices.”
- Avoid restating dependency versions, scripts, or settings already obvious from nearby files.
- Link a deeper document only when a clear trigger tells the agent when to read it.
- Preserve human editability; no generated markers or required generator.
- For a verified existing Beads connection, add a short issue-tracking section: load beads skill, run `bd prime`, reuse/claim durable issues, record verification before close, and use `bd remember` only for verified project facts. Keep Pi todo for session steps. Respect existing tracker policy; resolve conflicts rather than declaring two sources of truth.
- Do not put machine-specific endpoints, credentials or absolute workspace symlinks in portable repository guidance. Guidance generation alone never initializes Beads, creates a DB, alters hooks or enrolls repositories; use Beads enrollment below only when requested. Existing AGENTS.md updates require explicit improvement scope; do not bulk-edit sibling projects.

Complete when draft is concise, evidence-backed, and contains no speculative architecture.

## 4. Confirm evidence and authority

Standing global authority permits creating missing repository guidance from observed conventions without a separate approval round. Preserve existing guidance; do not replace it under this default. Resolve conflicting conventions before writing, and honor explicit task restrictions.

Complete when the missing file and evidence-backed rules are established.

## 5. Write and verify

1. Write the missing evidence-backed repository-local file.
2. Re-read it from repository root and check every command and path against repository state.
3. Run cheapest relevant non-destructive validation, such as config parsing or command discovery. Do not run builds or tests solely because guidance names them unless user requested repository validation.
4. Report file path, rules added, evidence used, checks run, and any unresolved uncertainty.

Complete when file exists, references valid repository facts, and verification has no unresolved error.

## Optional: connect Beads

Run only when user explicitly requests Beads setup/connection for this repository; that request authorizes one project DB and local pointer, not other repositories. Unconnected projects otherwise stay unenrolled.

1. Read trusted host guidance for Beads server, client, credential location and enrollment tool. No host-owned tool means report blocker; do not improvise server writes or run raw `bd init`.
2. Enroll original checkout, never linked worktree. Existing `.beads`, conflicting inventory, populated DB without local workspace, identity mismatch or migration prompt is a blocker: inspect and report; never overwrite, reinitialize or bypass identity checks.
3. Run host tool dry run first. Confirm repository path, project prefix and DB name are unique and match host naming. Then apply for exactly that repository. One enrollment at a time; no concurrent init or migration.
4. Verify `bd ready --json` from repository root, Git status unchanged and `.beads` locally ignored. Do not print credentials. Do not change tracked files, hooks or other projects.
5. Report project prefix, database, local pointer, backup impact and any host follow-up, such as private UI pins. Then load beads skill for task tracking; add repository guidance section only under rules above.

Complete when connected repository passes verification, or blocker reported with no partial state hidden.
