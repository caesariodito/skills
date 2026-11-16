---
name: grill-me
description: Stress-test an idea, plan or design through dependency-aware question rounds before committing to it. Explicit invocation only; fits the existing exploration, approval and specification workflow.
disable-model-invocation: true
license: MIT
---

# Grill me

Sharpen the user's thinking, not produce a plan for them to rubber-stamp. Start from their idea and existing context; no fresh session, repository or worked-out plan required. Interview only: no implementation, file writes, automatic specs or agents. Preserve settled decisions unless new evidence challenges them.

## Ground and map

State the goal, scope and known constraints briefly. Inspect relevant instructions, source, checks and existing decisions directly with read-only tools when available; do not ask the user for observable facts. Distinguish evidence, assumptions and unknowns. Without access, name the gap rather than inventing facts. No sub-agent dispatch: delegation requires explicit bounded Herdr authorization under existing guidance.

Map a decision tree internally. Each decision depends on settled prerequisites. The frontier contains only questions answerable now; downstream questions wait. Prioritize consequential unknowns: intended outcome, users, scope/non-goals, constraints, alternatives, failure/recovery, observable acceptance and trade-offs. Skip irrelevant branches and trivia.

## Ask in rounds

Use `ask_user_question` for each round: 1–4 independent frontier questions in one invocation, 2–4 concrete options per question, concise labels and descriptions explaining trade-offs. Put a supported recommendation first with `(Recommended)`; do not manufacture a recommendation without evidence. Use `multiSelect: true` only for compatible choices. Leave custom answers to the tool's built-in row; never author an Other or Type something option. With no structured question tool, ask the same bounded round in numbered text and accept free-form answers.

Do not stack questionnaire calls back-to-back. Wait for answers, summarize changed decisions or explain the next dependency, then recompute the frontier. If more than four decisions are ready, ask the highest-impact four first; do not force the entire frontier into one call. Group blocking choices and any relevant protected-action approvals or required-review authorization/waiver into the same round when possible. Do not re-request approvals already granted.

Ask neutral questions, invite disagreement and preserve the user's wording and scope. An unknown answer stays unknown; silence or abandoning a questionnaire is not consent. Do not turn agreement with an idea into permission to implement, install dependencies, deploy, change exposure/auth or delegate.

## Stop and route

Stop when consequential in-scope decisions are settled, deferred explicitly, or blocked on evidence, or when the user asks to stop. Do not chase every hypothetical branch. If answers need something to react to or measured behavior, identify the smallest useful preview or experiment and pause that branch. This interview does not authorize creating it; existing exploration authority and frontend/safety guidance apply.

Close with a concise conversation summary: agreed goal and boundaries, decisions with reasons/trade-offs, unresolved assumptions and cheapest next evidence, observable acceptance and next step. Ask for confirmation of shared understanding; do not act on it without implementation authority. No files by default. If continuing existing specified work, proposed changes return to its canonical source before implementation, not a competing document.

For meaningful design forks use [architect](../architect/SKILL.md) and [arena](../arena/SKILL.md); use [teach](../teach/SKILL.md) when explanation would unblock a decision. [Engineering lifecycle](../engineering-lifecycle/SKILL.md) retains ownership of risk classification, canonical specs, approval and review gates. Routine scoped work needs no mandatory spec or independent review; materially risky work and explicit requests retain their existing requirements.

Adapted from Matt Pocock's grill-me and grilling skills; see [provenance](UPSTREAM.md).
