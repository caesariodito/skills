# Native spec explainer

Optional Herdr desktop explanation beside an agent. Browser HTML remains the review/approval/export surface. `spec.md` remains authority. No dependencies or herdr-core changes.

## Use

Read installed `herdr` skill and select backend. Desktop control requires managed core context and `herdr-app --skill`; legacy TUI cannot render this mod. Inspect current app guide and APIs before adapting to another version.

Source: this directory. Install `main.js`, `model.mjs`, `mod.json` into `~/.config/herdr-app/mods/spec-explainer/` after permission. Never overwrite an unknown/user-modified copy. No keys or layout changes needed. Mod reads the explicitly supplied local JSON and writes generated SVG cache under app home's `data/spec-explainer`; it does not run commands, fetch URLs, write source, or capture decisions. Mod code is trusted executable code, not a sandbox.

```sh
node <skill-dir>/herdr/model.test.mjs
node <skill-dir>/herdr/view.test.mjs
herdr-app check ~/.config/herdr-app/mods/spec-explainer
herdr-app ls
```

Locate the caller's terminal in `ls` using `HC_TERMINAL_ID`; use its actual pane ID, not the focused pane. Opening UI changes focus: do it only when requested.

```sh
herdr-app do pane.split '{"pane":"<verified-caller-pane>","direction":"right","mod":"spec-explainer","props":{"file":"/Users/<you>/.cache/agent-work/<repo>/<feature>/explanation.json"}}'
```

If caller tab is not shown, select its verified tab explicitly before presenting view; never switch an unrelated tab. Keep returned pane ID for subsequent targeting. Closing that mod pane does not close adjacent agent terminal. No automatic cleanup.

## Author explanation

Use `example.json` for shape, not content. Write `~/.cache/agent-work/<repo>/<feature>/explanation.json`. Explain real spec/code; label assumptions. Set `spec` to authoritative source path and `source_version` to exact source revision/version or a clearly labeled working draft. Refresh explanation after material feedback; viewer does not verify source freshness automatically.

Contract v1:

- Required root: `version: 1`, `title`, `spec`, `source_version`, `sections`.
- 1–40 sections: unique `id`, `title`, Markdown `body`, optional Markdown `details`, 1–20 `scenarios`.
- Scenarios: unique per-section `id`, `title`, Markdown `body`, optional `diagram`.
- Diagram: required `alt` text equivalent, integer `width`/`height` (100–2400), 1–30 `nodes`, 0–60 `edges`.
- Node: unique `id`, `title` (48 characters max), integer `x`/`y`; fixed 180×56 box must fit diagram bounds. Use at least 260px width for comfortable labels; labels should stay short. Edges connect bottom-center of source to top-center of destination.
- Edge: `from`/`to` existing node IDs; optional `label` (80 characters max).
- IDs: `[a-zA-Z0-9_-]{1,64}`. Titles/source version: 200 characters max. Spec path: 4096. Bodies/details/alt: 16000. JSON: 256 KiB UTF-8 max.
- No raw HTML, embedded Markdown images, arbitrary SVG/PNG paths, remote assets or executable content. Links in Markdown are inert. Native viewer generates fixed-vocabulary SVG from validated nodes/edges and escapes labels. Unknown fields have no behavior.

```json
{
  "version": 1,
  "title": "Payment processing",
  "spec": "/repo/docs/specs/payments/spec.md",
  "source_version": "v2 · draft",
  "sections": [{
    "id": "validation",
    "title": "1. Validate request",
    "body": "Reject malformed input before writing payment state.",
    "details": "Acceptance: invalid currency leaves state unchanged.",
    "scenarios": [{"id": "invalid", "title": "Invalid currency", "body": "Return validation error. No write occurs."}]
  }]
}
```

Agent draws diagrams through positioned nodes and edges, then writes clear text equivalent. Use separate scenario diagrams for alternate paths. This is intentionally not an arbitrary widget framework; retain browser HTML for richer custom interactions.

## Interaction and checks

Click pane to focus. Up/Down select phase; Left/Right select scenario; D toggles details; R refreshes. Native `pane.go` navigation can focus mod. No global keys installed. Narrow views stack phase controls above content; wider views put them beside it. No animations. Theme colors and focus border follow Herdr; diagrams use fixed high-contrast palette with text equivalent.

JSON polls every 3 seconds while copy exists, even hidden. No overlapping reloads. Invalid/missing JSON preserves last valid view and shows error; valid refresh retains IDs or selects first remaining item. Diagram-cache write failure shows text instead. Source/version stay visible. Manual Refresh retries cache generation too.

`herdr-app check` checks initial render only. Test live data loading, scenario keys/clicks, details, narrow pane, invalid JSON/recovery, source path and visible diagram. Capture app screenshot only in `~/.cache/agent-work/<repo>/<feature>/`. Do not claim keyboard/visual checks passed without evidence.

Cache is app-owned generated output in a unique per-copy directory, with at most 800 current section/scenario images. Removed IDs, hot reloads and closed copies may leave cache entries; remove only after confirming no live pane needs them. No automatic deletion. Add lifecycle cleanup if observed disk use warrants it.
