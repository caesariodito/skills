---
name: implementation-plan
description: Create evidence-grounded delivery plans with scope, ordered changes, acceptance, risk and verification; render Markdown/Mermaid in local native Visualizer. Explicit invocation only.
disable-model-invocation: true
---

# Implementation plan

Explicit `/implementation-plan` or `/skill:implementation-plan` writes Markdown with local authored SVG diagrams (Mermaid for small sketches) and opens installed Visualizer unless user requests text only. Planning only: do not modify production code, commit, deploy or infer implementation approval. Work directly; no implicit agents. Read [shared Visualizer delivery rules](../teach/references/visualizer.md) fully.

Inspect repository instructions, relevant source, contracts, tests and existing specs. Reuse canonical spec when present; label unsupported assumptions and resolve blocking choices in chat. For meaningful design decisions load architect; materially risky work follows engineering-lifecycle and its canonical spec/review gates. Do not impose lifecycle ceremony on routine scoped work.

Use only useful sections:
- Goal, boundaries and current evidence.
- Proposed change, file/function map and small Mermaid flow where helpful.
- Ordered implementation steps with dependencies and observable acceptance.
- Failure behavior, compatibility, risk and recovery/rollback where relevant.
- Exact verification commands, manual/native checks and unresolved decisions.

Small task gets small plan, not scaffolding. Prefer deletion, stdlib/native features and installed dependencies. Clearly mark planned checks versus performed checks. Keep canonical decisions authoritative, feedback/approval in chat and derived artifact refreshed after approved changes. No HTML/MDX/JSON renderer, preview server, browser or dependency install. Existing implementation-review skill is separate and unchanged.

Return artifact path, concise next step and unrun checks. Viewer dispatch alone does not prove rendering.
