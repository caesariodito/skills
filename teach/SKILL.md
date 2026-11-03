---
name: teach
description: Explain a system, implementation or proposed design progressively from big picture to pipeline, phases and data model. Use when user asks to understand, explore visually or inspect design choices before deciding.
license: MIT
---

# Teach

Explain, do not change implementation. Establish what the person needs to understand from conversation and source evidence; ask only for blocking missing context. Separate what code does from inferred historical intent. No mandatory investigation agents or dependency on upstream how/why skills.

Start with smallest complete explanation. Add detail where requested or where needed for a real decision. Use [unslop](../unslop/SKILL.md) for clarity without overriding user tone or uncertainty. No quizzes, theatrical pauses or compulsory offers.

## Progressive view

| Level | Human should understand |
|---|---|
| Goal and boundary | Problem, actors, expected outcome, what is outside scope |
| Pipeline | Inputs, phases, outputs and ownership |
| Phase | Transformation, decisions, state, errors and recovery |
| Data | Concrete example records, relationships, keys, invariants and lifecycle |
| Choice | Alternatives, evidence, trade-offs and what would change recommendation |

Follow one synthetic example through relevant phases. Keep names and values consistent. Show only applicable levels; do not manufacture data models for a prose question. Mark observed facts, assumptions, proposals and unresolved questions visibly.

Use available native generative UI/show_widget when an interactive view helps: overview, selectable phases, expandable records/invariants, side-by-side alternatives. Follow tool design/accessibility guidelines. Keep text equivalents, keyboard access, readable contrast and reduced-motion behavior. Native widget interaction is local only: no agent callbacks, silent decision capture or writes. Ask for final decisions in conversation or structured question tool. No new visualization dependency without approval; if unavailable, use concise tables, code examples or supported diagrams and say what is unavailable.

For proposed architectures, use [architect](../architect/SKILL.md). Visualization is working explanation, not canonical authority; accepted decisions go into lifecycle spec, and durable visual artifacts are optional derived views.

Adapted from pstack; see [provenance](UPSTREAM.md).
