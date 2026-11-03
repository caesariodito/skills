---
name: architect
description: Explore architecture from real usage, ownership, data models and invariants; compare options and screen design red flags before canonical spec. Use for meaningful design decisions, not every function boundary or small edit.
license: MIT
---

# Architect

Design exploration only by default. Existing [engineering-lifecycle](../engineering-lifecycle/SKILL.md) owns canonical spec, approval and implementation. No automatic implementation, commits, scaffold code or independent review panel.

1. Ground problem in source, callers, constraints, project intent and documented next steps. Separate facts from guesses. Existing system need not change just because another design is elegant.
2. Write realistic caller/user journey first. Sketch core data, ownership, boundaries, transitions and validation, then signatures/module shape only where useful. Prefer deletion, stdlib/native features and installed dependencies.
3. For real architectural fork, use [arena](../arena/SKILL.md) to compare at least two materially different viable shapes. If constraints force one, state evidence; do not invent competition. Delegation requires bounded Herdr authorization.
4. Screen against [design red flags](references/design-red-flags.md). Heuristic is not defect: name actual consequence and smaller sufficient correction. Balance missing functionality/recovery with speculative complexity.
5. Explain big picture and drill-down with [teach](../teach/SKILL.md). Give evidence, meaningful alternatives, accepted trade-offs, limitations and revisit triggers. Human approval gates still apply.
6. Promote chosen design into canonical spec; exploratory notes/prototypes remain disposable evidence, not competing implementation contract. During implementation revisit only when evidence invalidates choice; material changes return to approval.

Project future means approved roadmap, concrete expected use or existing constraints. Do not add extension points for imaginary scale. A deliberate limit needs ceiling and upgrade trigger; never simplify away security, data integrity, compatibility or required accessibility.

Output can be short table and data sketch. Use [rationale prompts](references/rationale.md) only for applicable details; no fixed document ceremony.

Adapted from pstack; see [provenance](UPSTREAM.md).
