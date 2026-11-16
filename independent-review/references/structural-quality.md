# Structural quality checks

Review changes against the baseline and affected callers, not an imagined ideal codebase. Ask whether existing ownership or a simpler state model could remove whole branches, flags, helpers or layers while preserving required behavior. Prefer deletion, stdlib/native features and existing canonical utilities before adding abstractions.

| Signal | Investigate |
|---|---|
| Scattered branching | New feature checks, repeated predicates, nullable modes or special cases across unrelated flows; can one existing owner or a clearer invariant remove them? |
| Type-contract erosion | New casts, `any`, optional fields or silent fallbacks hiding invalid states; validate untrusted input at its boundary. `unknown` is appropriate before validation, not a defect by itself. |
| Boundary drift | Feature policy in shared plumbing, leaked implementation details, duplicate helpers or state; use existing canonical ownership where it actually fits. |
| Growing modules | Compare cohesion, coupling and reasons to change before/after. Crossing 1,000 lines prompts inspection, not automatic rejection or extraction; account for generated code and data tables. |
| Unearned abstraction | Thin wrappers, one-use interfaces, policy objects or state machines that move complexity without reducing concepts; direct conditionals may be simpler. |
| Orchestration | Related writes that can leave invalid partial state; independent work serialized without reason. Check ordering, side effects, resource bounds, cancellation and failure semantics before suggesting parallelism. |

Reuse architect red flags for ownership and abstraction checks; do not duplicate their workflow. Extraction earns its keep only when it reduces reasoning cost, not merely file length. Preserve security, validation, recovery, compatibility, accessibility and required observability.

For each finding, name the changed source and concrete consequence, the smallest sufficient correction and a focused regression or validation plan. For proposed simplifications, show the viable alternative and which concepts disappear; account for affected callers, failure paths and migration cost. Treat behavior preservation as a claim needing evidence, not something implied by fewer lines or passing unrelated tests.

Prioritize concrete regressions over optional redesign opportunities. Missed elegance, plausible rewrites and size thresholds alone never block acceptance. A clear structural regression can block when it violates approved requirements or creates a source-grounded risk preventing safe acceptance; explain that link. No findings is valid. Review remains read-only; broader restructuring needs separate scope and approval.
