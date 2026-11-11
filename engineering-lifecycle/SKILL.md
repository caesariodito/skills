---
name: engineering-lifecycle
description: Run consequential changes through exploration, human understanding, approved canonical spec, implementation verification and one independent Herdr review. Use for contract, persistent-data, architecture, trust-boundary, concurrency or recovery changes. Small low-risk edits stay direct.
---

# Engineering lifecycle

For approved repository implementation, follow [automatic local delivery](../pi/references/local-delivery.md): create/reuse an exclusively task-owned branch/worktree before edits, then commit verified task changes with Conventional Commits after required checks/review pass. This standing local authorization does not grant push, merge, cleanup or reviewer spawning. Report branch, commit hash and worktree path at completion.

One workflow authority. Small low-risk edits use direct implementation and focused verification; duration alone needs task tracking, not documents or agents. Use existing repository conventions and [project-init language references](../project-init/SKILL.md) when relevant. Prefer deletion, stdlib, native platform and installed dependencies. Work in current session except explicitly authorized Herdr delegation.

| Stage | Action and exit condition |
|---|---|
| Ground | Inspect instructions, callers, code, manifests, checks, CI, runtime, existing decisions and Git baseline. State problem, constraints, scope and cheapest evidence. |
| Explore | Before canonical spec, use [architect](../architect/SKILL.md) for meaningful design forks and [arena](../arena/SKILL.md) for distinct alternatives/experiments. Evidence supports recommendation and remaining uncertainty is explicit. |
| Explain and decide | Use [teach](../teach/SKILL.md) when human needs big picture, pipeline, phase or data/invariant drill-down. Resolve consequential/product choices; do not ask human to guess observable facts. |
| Specify | Promote chosen design into existing spec convention, otherwise docs/specs/<feature>/spec.md. Include applicable requirements below; no parallel architecture authority. |
| Dry-run and approve | Trace plan against real code and failure paths, security/data/accessibility, dependencies and rollback. Resolve blockers; obtain explicit approval before consequential implementation. Exploration request is not implementation approval. |
| Build and verify | Small approved slices, one writer per checkout, focused regression plus required broader checks. Verify actual user behavior where relevant. Missing checks stay visible. |
| Independent review | Load [independent-review](../independent-review/SKILL.md) after author checks pass. One fresh authorized Herdr reviewer covers intent, security, sufficiency, simplicity and documented project future. No recursive review or mandatory panel. |
| Fix and recheck | Verify findings, fix blockers, record dismissals/deferrals and rerun checks. Reviewer rechecks exact updated scope. Material design changes return to spec and approval; two unresolved rounds stop with blocker. |
| Done | Acceptance evidence, relevant checks, required independent review and blocker disposition recorded. Report source paths, results and residual limits. No completion claim when required gate blocked. |

## Exploration authority

Within approved problem scope, inspect/research, sketch usage/data models, revise hypotheses, create disposable prototypes in ignored .scratch/<task>/ and run safe local checks with installed tools. Use isolated synthetic data/ports, no shared services or unrelated private state. No approval needed for each bounded exploratory step. Outside repository ask for output directory. Do not impose a full spec before learning enough to choose.

Exploration does not authorize production edits, dependency installation, external writes, publishing, deployment, exposure/auth changes, destructive operations or unsafe code execution. Herdr candidates require explicit task-level grant specifying scope/count/budget and stop conditions; grant can cover bounded candidate work without repeat questions, never recursive spawning. Actual security checks retain all upstream sandbox requirements. Ask when experiment crosses these boundaries.

## Canonical spec contents

| Include when relevant | Record |
|---|---|
| Intent | Problem, goal, constraints, scope, non-goals, numbered observable acceptance and failure cases |
| Decisions | Source evidence, distinct alternatives, why chosen, accepted trade-offs, assumptions and human choices |
| Shape | Ownership, contracts, data/invariants, processing, trust boundaries, concurrency/recovery, compatibility and accessibility |
| Project direction | Documented expected use/roadmap, deliberate ceilings and revisit triggers; no speculative infrastructure |
| Delivery | Small verifiable slices, affected areas, checks mapped to acceptance, rollout/rollback where affected |
| Review | Approval scope, exact baselines/heads, independent-review authorization, coverage/findings/disposition, completion evidence and residual gaps |

Feedback updates canonical source first. Optional HTML/JSON/diagrams derive from it. Load implementation-review/technical-spec only when requested or clearly useful; follow their scoped preview rules. Use [shared Markdown preview](../implementation-review/SKILL.md) on request, not another authored HTML copy. Working generative UI is explanatory, not durable source or implicit decision channel.

## Completion boundaries

Implementation approval alone does not authorize reviewer spawning; obtain bounded review grant unless already explicit. If Herdr/independence unavailable, required gate stays blocked until environment/grant supplied or user explicitly waives it in spec. Trivial edits do not acquire mandatory review. Reviewer role itself never triggers another reviewer. Full security audit remains separate from guidance-mode implementation review.

Inspect final intended diff including staged, unstaged and relevant untracked files. Tests exercise observable behavior, use independent expected results, and leave a runnable regression for non-trivial logic. Never mark partial implementation, failed required checks or unresolved blockers complete. Commit only under automatic local-delivery authority or explicit task authorization; never publish, merge or deploy without separate explicit authority.
