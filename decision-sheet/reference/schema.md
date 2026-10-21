# decisions.json schema

One JSON object per sheet. `examples/decisions.json` is a working instance of everything below.

Prose fields (`title`, `subtitle`, `note`, `text`, `why`, `footer`, option titles) are HTML-escaped, then `` `code` `` becomes `<code>` and `**bold**` becomes `<b>`. Raw HTML in those fields is shown as text, not rendered — use a `html` block when you need markup.

## Top level

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | Page title and `<h1>`. Also the first line of the exported answers. |
| `key` | yes | `localStorage` key. Make it unique per round, e.g. `archetype-open-questions-2026-09-21`. Reusing a key resurrects the previous round's answers. |
| `subtitle` | no | One paragraph under the title: what the sheet is for and what answering it changes. |
| `answers_filename` | no | Name of the downloaded answers file. Default `decisions-answers.md`. |
| `footer` | no | Source and provenance line. |
| `lang` | no | `<html lang>`. Default `en`. |
| `sections` | yes | Ordered list of sections. |

## Section

| Field | Required | Meaning |
| --- | --- | --- |
| `heading` | no | `<h2>`. Number them (`1. …`) so they can be referred to in conversation. |
| `note` | no | Muted paragraph under the heading: the principle the section's decisions share. |
| `blocks` | yes | Ordered list of blocks. |

## Block: `card` (the default when `type` is absent)

One decision. A card with no `options` records a decision without asking for one.

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Stable ID, unique across the sheet: `B1`, `CODE-3`, `R-PAY-2`. This is what appears in the export and what the user pastes back. |
| `title` | yes | The decision in one line, phrased as a question or a claim. |
| `status` | no | `rec` (green), `warn` (amber), `flag` (terracotta). Sets the left border. |
| `chip` | no | Short label in the header: `Answer needed`, `No action`, `Likely wrong data`. Takes its color from `status`. |
| `evidence` | no | Ordered list of evidence entries, see below. |
| `options` | no | 2–4 options. At most one may be `recommended`. |
| `other` | no | `false` removes the automatic **Something else** option from this card. Default `true`. Only set it `false` where the choice really is closed, e.g. yes/no on a column that exists or does not. |

### Evidence entry

Each entry may carry any of these keys; they render in this order:

- `label` — small uppercase heading, e.g. `What exists today`, `Proposed`.
- `code` + `source` — a `<pre>` excerpt. `source` is printed as the first line of the block; use `path/to/file.md:29` so the quote is checkable.
- `text` — a paragraph of reasoning.
- `note` — a blue-bordered aside.

Quote the real file. The format works because every card shows current behavior, proposed behavior, and the cost of each option.

### Option

| Field | Required | Meaning |
| --- | --- | --- |
| `value` | yes | Machine value, unique within the card. |
| `title` | yes | The choice itself. |
| `why` | no | Its consequence — not a restatement of the label. This is the field that makes the sheet answerable. |
| `recommended` | no | `true` on at most one option. Renders the `my answer` badge and is what `Accept every recommendation` selects. |

`__other` is a reserved `value`; the build fails if a spec uses it. Every card gets one **Something else — I will say what** option appended automatically, with a text box that appears when it is picked. The typed text rides along in the export as `OTHER — <text>`; picking it and typing nothing exports `OTHER — will explain in chat`, and the export's last line counts those. `Accept every recommendation` never selects it.

The page also ends with an **Anything I did not ask about** box, for questions back at you or a decision the sheet missed. It belongs to no item and is always present.

## Block: `rules`

A run of near-identical small decisions, rendered as one line plus one `<select>` each. Use this above roughly six repetitions of the same choice; cards become unreadable at that point.

| Field | Required | Meaning |
| --- | --- | --- |
| `group` | no | `<h3>` above the run, usually the source document. |
| `context` | no | Muted line under it, e.g. the tool list the choices draw from. |
| `items` | yes | The rows. |

Each item: `id` (stable, unique), `text` (the rule verbatim), `why` (optional, one line), and `choices` — each `{ "value", "label", "recommended"? }`. A blank `choose…` option and a trailing `something else — I will say what` option are added automatically, and the recommended choice gets `— my answer` appended. Set `"other": false` on an item, or on the whole `rules` block, to drop the escape hatch from those rows.

## Blocks: `note`, `text`, `html`

- `{ "type": "note", "text": "…" }` — blue-bordered aside between cards.
- `{ "type": "text", "text": "…" }` — plain paragraph.
- `{ "type": "html", "html": "…" }` — raw HTML, inserted verbatim. For tables or anything the schema does not cover. The CSS already styles `table`, `th`, `td`.

## Build

```sh
# <skill-dir> = directory containing the decision-sheet SKILL.md
python3 <skill-dir>/scripts/build.py decisions.json out.html
```

The script fails on duplicate item IDs, on more than one recommendation per card or row, and on missing required fields. CSS and JS are inlined, so the output is a single file that opens from `file://` with no network.
