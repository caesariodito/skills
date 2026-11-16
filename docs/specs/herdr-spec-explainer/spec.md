# Native Herdr spec explainer

Status: delivered with documented native reload validation gaps; independent source review accepted.
Baseline: skills repository `6dab3227d7cb7dff0fcbbb0e7f0b2bd54ad0e840` plus existing unrelated user changes, which remain untouched. Skills is a nested Git repository ignored by parent dotfiles; canonical spec moved here after ownership discovery. Parent dotfiles baseline `9a21069` is not feature source baseline.

User approved Build and install, including one targeted preview pane and one isolated read-only reviewer plus fix recheck. No dependencies, commits, unrelated source edits or layout changes authorized.

## Goal

Provide reusable, interactive explanations of specifications inside Herdr desktop. Keep canonical `spec.md` authoritative and existing browser HTML review/approval/export behavior unchanged.

## Grounding

- Source skill: `skills/implementation-review/SKILL.md`.
- Installed desktop: herdr-app 0.1.14; core: hc 0.1.19.
- Installed API authority: `~/.config/herdr-app/AGENTS.md`, `herdr.d.ts`, `gpui-kit.d.ts`.
- Native mods use GPUI builders, `TextView.markdown`, image assets, event handlers and theme colors. No DOM, CSS or embedded browser. Rich HTML text is not a browser renderer.
- `readTextFile` reads UTF-8 up to 1 MiB; `watchFolder` supports local reload. Mods are trusted executable code with unrestricted program/network access.
- Current invocation has HC_TERMINAL_ID, not legacy HERDR_ENV. Never mix legacy TUI and core control APIs.
- No repository-local AGENTS.md found. Project-init guidance may be added separately with approval; not required for this bounded feature.

## Alternatives

| Option | Benefit | Cost / ceiling |
| --- | --- | --- |
| Markdown/Mermaid preview only | Existing approach; minimal code | Does not meet selected goal of reusable interactive scenario exploration; Mermaid may need renderer dependencies |
| Reusable native viewer with explanation JSON | One reviewed renderer; agent changes data, not executable code | Fixed composition of sections, scenarios and diagram variants |
| Generate arbitrary mod code per spec | Maximum native flexibility | Repeated trusted-code execution, checks and maintenance |

Recommendation: reusable native viewer. No new dependency, browser embedding, agent callbacks or core changes.

## Proposed experience

Open explicit explanation artifact in a dedicated Herdr mod pane. Header shows title, authoritative spec path and source version. Select section/phase; read Markdown explanation and text equivalent of diagram. Select scenario to switch explanation and diagram. Expand details without leaving terminal workspace. Narrow panes stack controls and content. Manual refresh plus gentle local live reload; selection survives valid refresh when its ID remains present.

## Ownership and artifacts

- Tracked reusable mod source and a small runnable validation check live with implementation-review skill; exact file split stays minimal.
- Install a copy into `~/.config/herdr-app/mods/spec-explainer/` only after approval; never edit generated Herdr guide, shipped mods or default layout.
- Per-feature explanation JSON lives in ignored `.scratch/<feature>/` and derives from canonical spec. Viewer generates its own app-data SVG cache; no supplied assets.
- Native view is optional explanation, not replacement for implementation/technical HTML reviews and not an approval surface.

## Data contract

Versioned JSON: format version, title, authoritative spec path, source version, and uniquely identified sections. Each section has heading, Markdown body, optional expandable details and scenarios. A scenario has unique ID, title, Markdown explanation and optional diagram reference plus required text equivalent when a diagram exists. Diagram variants are bounded positioned nodes/edges, not arbitrary scripts or supplied image paths. Native viewer generates escaped, fixed-vocabulary SVG into a unique per-copy app-data cache. This avoids arbitrary file/remote asset loading and needs no dependencies. Confirmed SVG image loading in live Herdr pane.

Contract lives in `implementation-review/herdr/README.md` and validator `model.mjs`: v1; 256 KiB UTF-8; 1–40 sections, each 1–20 scenarios; diagrams 100–2400 pixels, 1–30 nodes and at most 60 edges; fixed 180×56 node boxes inside bounds; unique safe IDs; mandatory text alternatives. Raw HTML and Markdown images rejected; links inert. Reject unsupported versions, duplicate IDs, wrong types and oversized artifacts. Never evaluate strings as code or execute document commands.

## Trust and recovery

- Renderer only reads explicitly selected artifact and its scoped assets; no source writes, shell commands, network fetches, callbacks or silent answer storage.
- Artifact has no image paths or SVG markup. Diagram coordinates, IDs and edge endpoints are validated; generated labels XML-escaped. Viewer only loads its own app-relative generated SVG. This removes asset traversal and external resource references from data contract.
- Cache stored under `data/spec-explainer/<unique-copy>/`; copy identity prevents cross-pane cache collisions. No source writes. Removed IDs/closed copies can leave generated cache files; no automatic deletion. Revisit cleanup when disk use warrants it.
- Failed reload keeps last valid content with visible error/stale indication. Missing diagrams retain readable text. Async reload must not apply stale results after newer input.
- Source version/path visible; no claim that generated explanation is automatically synchronized with spec. Skill regenerates after material spec feedback.

## Accessibility

Native theme colors, visible focus, keyboard-accessible section/scenario selection, text alternatives, scrollable narrow layout, no animation requirement. Verify actual keyboard behavior and layout, not only eager render checks.

## Acceptance

1. Synthetic spec opens in native mod pane with title, source path/version and readable sections.
2. Mouse and keyboard select phases/scenarios; diagram/text changes consistently.
3. Valid artifact edits refresh; invalid edits preserve last valid view and show error; removed selection falls back predictably.
4. Malformed/oversized input and unsafe asset paths are rejected by runnable checks.
5. Missing diagram is nonfatal and text equivalent stays available.
6. Browser HTML generation, answers and exports remain unchanged; focused existing regression checks pass.
7. `herdr-app check` passes, followed by live native UI and keyboard checks where authorized/available; unrun checks remain explicit gaps.
8. Skill documents generation/opening, source freshness, native versus browser limits and text fallback.

## Delivery and approval gates

Approved scope built as reusable native viewer and validated node/edge diagrams; no external assets. Affected paths: `implementation-review/SKILL.md`, `implementation-review/herdr/{main.js,model.mjs,mod.json,model.test.mjs,view.test.mjs,example.json,README.md}`, this spec. Install personal mod and open explicitly targeted caller pane after permission. No layout switch, dependency installation, commits, publishing or unrelated edits.

One independent read-only Herdr reviewer is required after author checks, but spawning requires separate bounded authorization and compatible installed workflow guidance. If unavailable, leave review gate blocked unless explicitly waived. One authorized reviewer spawned; no other agents.

## Verification evidence

- `node implementation-review/herdr/model.test.mjs`: passed; malformed/oversized UTF-8 JSON, duplicate/non-string/unsafe IDs, raw HTML/images, coordinates/endpoints, XML escaping and selection fallback.
- `node implementation-review/herdr/view.test.mjs`: passed; load, keyboard handlers, details, narrow render, invalid/missing JSON last-good recovery and refresh/selection fallback. Harness stubs native builders: not proof of OS keyboard delivery or visual layout.
- `herdr-app check ~/.config/herdr-app/mods/spec-explainer`: passed. Initial check missed absent runtime TextEncoder; live test found it and validator now counts UTF-8 with ECMAScript iteration, no browser globals.
- Live `herdr-app shot` confirms text, controls and generated diagram in native pane. Screenshot evidence `.scratch/spec-explainer/render2.png`. Follow-up alignment fix uses top-aligned phase navigation.
- Existing `implementation-review/scripts/smoke_test.py`, `node --test implementation-review/scripts/preview.test.mjs`, `node bin/workflow-check.mjs`: passed.
- Installed mod is copy of three runtime source files. Feature-created pane `pa0b341fe8b66088862693dc08f288aa2` beside supervisor terminal `t1s`, tab `tb6b83756a96b65f59fa87afeba3371872`. User may change app focus; do not infer current view from prior commands.
- User confirmed native phase/scenario clicks, Show details, arrow keys, D/R and narrowed-pane readability through structured acceptance question. Native invalid-file recovery and same-ID image invalidation remain follow-up checks; automated harness covers state recovery.
- Reviewer `sxe-child-review` terminal `t1x`, isolated detached worktree `.scratch/spec-explainer/review-worktree`, baseline above; read-only feature snapshot, source-only security review. Startup browser question explicitly resolved by user as headless guest. Initial review found B1 cache filename aliases, B2 fatal directory creation failure, B3 wrong-type IDs in initial snapshot; fixes and regressions applied. B1 uses numeric section/scenario indices; B2 catches directory error and preserves valid text; B3 requires string IDs with numeric/boolean/array/missing regression cases. Controls now have button roles and accessible labels. Generated checker declarations/jsconfig ignored locally. Source fix recheck accepted: `.scratch/spec-explainer/review-worktree/.scratch/review/recheck.md`. No remaining source-supported blockers; native same-ID SVG cache invalidation and live invalid/repaired-file checks remain explicit follow-ups, not claimed passes. One initial reviewer plus one recheck consumed; reviewer terminal/worktree retained.

## Rollback and ceiling

Close only feature-created preview pane when user requests; remove installed copy only after confirming no user changes. Tracked diff can be reverted without changing canonical specs or existing HTML review artifacts. Start local-only; remote documents, arbitrary custom widgets, animation engines, approvals and automatic browser conversion are out of scope. Revisit composition only after concrete explanations exceed sections/scenarios/diagram variants.
