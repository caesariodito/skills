---
name: visual
description: Create evidence-grounded explanations, plans and diff recaps as Markdown with SVG/Mermaid diagrams in the installed native Visualizer app. Use explicit /visual or /skill:visual; one visual workflow, no hosted renderer.
disable-model-invocation: true
---

# Visual

Explicit `/visual` or `/skill:visual` creates the requested visual document and opens installed Visualizer unless user requests text only. Work directly; no visualization child session. Read [shared Visualizer delivery rules](references/visualizer.md) fully before authoring or opening. User may call app Visualization or viz; verify installed bundle name/path rather than renaming or installing it.

## Ground content

Inspect repository instructions, relevant source, tests and existing specs. Choose content from request, not a required mode picker:

- **Explain:** purpose, actors, pipeline, phases and data/invariants. Use [teach](../teach/SKILL.md) for progressive explanation; visual owns renderer, teach owns pedagogy. Follow one synthetic example; distinguish observed facts, inferred intent and proposals.
- **Plan:** goal, constraints, current evidence, proposed file/contract changes, ordered steps, acceptance, failures/recovery, verification and open decisions. Use architect for meaningful design choices; lifecycle only for materially risky implementation. Planning is not implementation approval.
- **Recap:** inspect exact commit/branch/PR diff and baseline. Trace actual changes, behavior, tests and remaining risks; exclude unrelated dirty work. Do not invent historical intent, measured improvements or passing checks.
- **Compare or diagram:** use smallest useful structure, sequence, timeline, table or side-by-side alternatives grounded in evidence. No mandatory diagram quota or invented UI geometry.

Use concise Markdown, authored local SVG for precise/polished diagrams, Mermaid for small supported sketches, and bounded local PNG evidence where useful. Include meaningful alt text, prose equivalents and semantic color legend; retain readable contrast and keyboard-friendly viewer flow. Canonical decisions stay in repository `spec.md` when applicable; derived visual is not approval authority.

## Boundaries and handoff

Write only requested derived artifacts under ignored `.scratch/<task>/`; outside repository resolve output directory first. Preserve source authority, privacy and existing approval gates. No MDX, HTML, JSON block catalog, Plan MCP, hosted writes, local bridge, preview server, browser, dependency installation or source mutation. No automatic agents. Feedback stays in chat, not viewer interactions.

Keep artifact path stable during revisions. Return path, concise text equivalent, source baseline, actual checks and unrun native validation. App launch success is not rendering proof. If app unavailable, retain Markdown and report limitation; no renderer substitution or installation without approval. Former visual-plan, visual-recap and implementation-plan workflows are consolidated here; use `/visual plan ...`, `/visual recap ...` or `/visual ...`, not separate skills.
