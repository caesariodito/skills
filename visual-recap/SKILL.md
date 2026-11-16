---
name: visual-recap
description: Create diff-grounded visual recaps of PRs, branches, commits, or work units. Explicit invocation only; local-files default; preserves canonical specs and host approval rules.
disable-model-invocation: true
license: MIT
---

# Local integration rules

These rules override conflicting instructions in UPSTREAM-SKILL.md, references,
and upstream setup examples. Read UPSTREAM-SKILL.md for composition guidance.

- Explicit invocation only. Pi syntax: /skill:visual-plan or /skill:visual-recap.
  Do not automatically add visual artifacts to ordinary work.
- Preserve global/repository guidance and engineering-lifecycle approval gates.
  Canonical decisions remain in repository spec.md (normally
  docs/specs/<feature>/spec.md); visual MDX is a derived review surface. Update
  canonical decisions first when feedback changes scope, then refresh visuals.
- Default output: ignored .scratch/<task>/plan/ or .scratch/<task>/recap/.
  Verify directory is ignored before writing. Outside a repository, ask for an
  output directory. Do not commit generated artifacts by default.
- Work directly. Upstream delegation, parallel exploration, and reviewer spawning
  do not authorize agents. Require explicit bounded Herdr authorization. Visual
  self-review is not independent review and cannot satisfy its completion gate.
- Planning may write review artifacts, not production source. Feedback grants no
  unrelated implementation, renderer changes, or skill edits.

## Local-files default; no implicit setup

- Treat local-files mode as selected without changing shell environment or Pi
  settings. Read references/local-files.md; use only its local authoring path
  unless user explicitly approves another mode. Set localOnly: true and the
  appropriate kind (plan or recap) in local frontmatter/state.
- No hosted plan writes, publishing, sharing, PR comments, connector registration,
  OAuth, reconnect commands, or auth/exposure changes without explicit approval.
  Missing Plan MCP does not block local source authoring or justify reconnecting.
- No automatic package installation or npx @agent-native/core@latest execution.
  Check for an already-installed reviewed CLI first. If absent, ask before adding
  or running downloaded dependencies. Do not silently substitute another tool.
- Use an existing schema-only get-plan-blocks lookup or installed CLI catalog
  command only if host network policy permits. Send no source, diff, plan content,
  or secrets. Without catalog/tooling, use bundled references and mark schema
  validation unavailable; never claim successful validation or rendering.
- Local-files preview is not necessarily offline: upstream plan local serve can
  open hosted JavaScript that reads a localhost bridge. Do not launch that preview
  or expose a bridge by default. Require explicit approval for hosted UI; prefer
  an already-running loopback Plan app. Preserve selected browser mode/profile.
  Do not use --open to select an everyday browser implicitly.
- Redact secrets. Never commit .plan-url, bridge tokens, or private state. Return
  local artifact paths and honest check results when preview is unavailable.
  Ask for dependency/preview approval only when needed; never publish as fallback.

## Grounding and handoff

Inspect real files and reuse existing components/contracts. For recaps, read real
diff and conversation scope; exclude unrelated dirty changes. Derive file maps,
contracts, schema changes, and code excerpts from exact evidence. Label inferred
UI geometry. Read upstream document-quality and relevant canvas/wireframe guidance.

Keep assumptions and open decisions visible. Obtain existing lifecycle approval
before implementation; visual approval cannot silently replace spec approval.
Report artifact path, validation performed, preview availability, test failures,
and unrun checks. A recap is not proof of correctness or independent review.
Hosted collaboration remains opt-in: approve service, data scope, visibility,
dependencies, and configuration changes explicitly.
