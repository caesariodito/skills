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

## Native visualization

Explicit `/teach` or `/skill:teach` invocation writes a grounded Markdown/Mermaid explanation and opens installed Visualizer by default, unless user requests text only. Work directly; no visualization child session. Read [visual](../visual/SKILL.md) and its [shared Visualizer delivery rules](../visual/references/visualizer.md) fully; use the same artifact, compatibility, launch and verification boundaries. Teach owns explanation structure; visual owns rendering. Do not invoke another agent or create a second document. Automatic skill selection may stay in chat; do not open GUI without requested visualization or prior approval.

For proposed architectures, use [architect](../architect/SKILL.md). Visualization is working explanation, not canonical authority; accepted decisions go into lifecycle spec, and durable visual artifacts are optional derived views.

Adapted from pstack; see [provenance](UPSTREAM.md).
