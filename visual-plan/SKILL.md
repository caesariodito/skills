---
name: visual-plan
description: Create grounded visual plans in Markdown/Mermaid and open local native Visualizer. Explicit invocation only; canonical specs and approval gates preserved.
disable-model-invocation: true
license: MIT
---

# Visual plan

Explicit `/visual-plan` or `/skill:visual-plan` writes Markdown with local authored SVG diagrams (Mermaid for small sketches) and opens installed Visualizer unless user requests text only. Work directly. Read [shared Visualizer delivery rules](../teach/references/visualizer.md) fully before authoring or opening.

## Grounded plan

Inspect relevant source, existing plans and project instructions. Explain desired outcome, current behavior, proposed changes and boundaries. Add smallest useful system/phase diagram, file map, alternatives or risk table only when they clarify actual decisions. Label proposals and unknowns; source each code/file claim from inspected evidence. Never manufacture UI geometry or a diagram quota.

For meaningful architecture decisions load architect; materially risky work follows engineering-lifecycle. Canonical decisions stay in repository spec.md when required; visual plan is derived, not approval authority. Keep scope, acceptance, failure recovery and verification visible. Resolve blocking choices in chat using structured questions. Feedback grants no implementation or unrelated changes.

## Renderer boundary

Native Visualizer replaces previous MDX/Plan renderer path for this skill. Do not follow UPSTREAM-SKILL.md or local-files references for renderer/schema/setup commands. No MDX, JSON block catalog, Plan MCP, hosted writes, local bridge, browser preview, package install or delegation. Retained upstream files are provenance only for this skill, not active instructions. Other skills such as visual-recap remain unchanged.

Return local artifact path, short recommendation, actual checks and remaining questions. App launch success is not rendering proof. Never claim visual approval from viewer interactions.
