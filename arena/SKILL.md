---
name: arena
description: Compare materially different solutions before committing to an architectural choice. Use for requested brainstorming, competing designs or decisions where cheap experiments can distinguish real alternatives; Herdr candidates require bounded authorization.
license: MIT
---

# Arena

Explore a decision, not every coding task. Use current project evidence and [architect](../architect/SKILL.md) criteria. Existing lifecycle owns spec and implementation approval. Arena does not authorize production changes or publishing.

| Phase | Action |
|---|---|
| Frame | State problem, constraints, decision, two plausible different shapes and 3–6 concrete comparison criteria. Define experiment/time/agent budget and stop condition. |
| Explore | Develop each option with caller example, ownership/data flow, invariants, failure paths, cost and smallest implementation. Avoid cosmetic variants and forced third option. |
| Compare | Evaluate evidence criterion by criterion. If unknown matters, run cheapest safe discriminating experiment or mark open. |
| Synthesize | Choose coherent base; borrow only compatible improvements. Record rejected options and trade-offs. No automatic extra judge or review panel. |
| Explain | Use teach when useful. Human decides consequential/product choices; promote accepted result into canonical spec. |

Direct alternative analysis is default. Label it same-agent reasoning, never independent agreement. Invoking arena alone is not permission to spawn. Explicit task-level Herdr grant can cover named candidates and bounded rechecks without repeated questions; no recursive spawning. For independent candidates load installed herdr skill, require HERDR_ENV=1, create separate linked worktrees with exact baselines and standalone briefs. Give each same task/evidence and isolated output; parent defines comparison rubric. Candidate cannot edit production checkout, commit/push or access unrelated private state. Safe experiments need separate data/ports and existing dependencies; no live services.

Supervisor waits, reads handoffs, inspects artifacts and checks evidence. Dropout is coverage gap, not pass. Preserve worktrees until accepted. Missing Herdr/authorization means direct analysis or stop for decision, never substitute hidden subagents. Model diversity optional and explicit; no Cursor model slugs or silent fallback.

Output recommendation, evidence matrix, remaining unknowns, accepted trade-offs and next decision. No canonical spec until exploration earns a choice.

Adapted from pstack; see [provenance](UPSTREAM.md).
