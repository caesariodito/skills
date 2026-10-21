---
name: decision-sheet
description: Ask the user a batch of decisions as a single self-contained HTML page, where every question carries the evidence it came from and a recommended answer. Use when you are about to ask three or more questions at once, when you made calls on the user's behalf that they should confirm, or when they ask for a decision sheet, an open-questions page, a question page, a gap report, or to "confirm these choices".
---

# Decision sheet

Turn a batch of open questions into one HTML page the user answers in a single pass, then paste their answers back and apply them.

Use it when three or more decisions are pending. For one or two questions, ask in conversation — a page costs more than it saves.

## Why the page works

The user answers twenty items in one sitting only when each item shows, side by side, what exists today, what is being proposed, and what each option costs. A question without its evidence gets deferred, not answered.

## Steps

1. **Collect the decisions.** For each one, find the authored source — the real file, line, SQL, or code — and quote it. If you cannot quote a source, the item is not ready to ask.
2. **Write `decisions.json`.** Read `reference/schema.md` for the shape. Put it next to the output page, and keep it: the next round starts from a copy.
   - Give every item a stable ID (`B1`, `CODE-3`, `R-PAY-2`). The user pastes IDs back, so they must survive into the transcript.
   - Give every card 2–4 options. Each option's `why` states its consequence, not a restatement of its label.
   - Do not write an "other" option yourself. Every card and every row gets one automatically, with a text box; write only the options you actually predict. Set `"other": false` on the rare item whose choice really is closed.
   - Mark exactly one option `recommended`. Recommend the option you would take, not the safe one. Disagreement on one or two items in twenty is the target rate; zero means the recommendations are too timid to be useful.
   - Use a `rules` block, not cards, above roughly six repetitions of the same small choice.
   - A card with no options records a decision that needs no answer. Include those — they show the user what you did not ask about.
3. **Build.**
   ```sh
   # <skill-dir> = directory containing the decision-sheet SKILL.md
   python3 <skill-dir>/scripts/build.py decisions.json docs/html/open-questions-YYYY-MM-DD.html
   ```
   The script inlines the CSS and JS, and fails on duplicate IDs or a card with two recommendations.
4. **Hand it over.** Give the absolute path and say it opens directly in a browser — no server. Tell the user they can press `Accept every recommendation` and then change only what they disagree with.
5. **Apply the answers.** The user pastes the export, or downloads the answers file and tells you where it landed. Read the IDs back, apply each decision, and state which ones you applied. If an answer conflicts with something in the codebase, say so with file and line before applying it.
6. **Handle the `OTHER` lines first.** An answer of `OTHER — <text>` is the user rejecting every option you predicted; treat the text as the decision and say how it changes the plan. `OTHER — will explain in chat` and the `Not asked about:` block are conversation, not instructions — ask about them before applying anything that depends on them. Do not silently fall back to your recommendation.

## What the page does

Self-contained, opens from `file://`, no network. Answers persist in `localStorage` under the spec's `key`, so the user can close the tab mid-pass. Buttons: `Copy my decisions`, `Download answers file`, `Accept every recommendation`, `Light / dark`, `Clear`.

Every card and row carries a **Something else — I will say what** option with a free-text box, and the page ends with an **Anything I did not ask about** box. The user is never boxed into the answers you predicted.

Answers never leave the browser. Nothing is posted anywhere; the round trip is the user's copy or the downloaded file.

## Files

- `reference/schema.md` — the `decisions.json` shape, field by field. Read before writing a spec.
- `examples/decisions.json` — a worked spec using every block type. Copy it as a starting point.
- `assets/sheet.css`, `assets/sheet.js` — inlined at build time. Edit these, not a generated page; a generated page is disposable output.

## Conventions

- Page copy is normal English prose, whatever style the session is using.
- Name the file for its round: `open-questions-2026-09-21.html`. Give the spec a matching unique `key`, or the previous round's answers reappear.
- Do not commit an unanswered page.
