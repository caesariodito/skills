#!/usr/bin/env python3
"""Render a decision sheet: decisions.json -> one self-contained HTML file.

    python3 build.py decisions.json out.html

CSS and JS are inlined from ../assets so the page opens from file:// with no
network and no sibling files. See ../reference/schema.md for the input shape.
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"

# Inline markup allowed in prose fields, applied after escaping.
INLINE = [
    (re.compile(r"`([^`]+)`"), r"<code>\1</code>"),
    (re.compile(r"\*\*([^*]+)\*\*"), r"<b>\1</b>"),
]


def esc(text: object) -> str:
    return html.escape(str(text), quote=True)


def inline(text: object) -> str:
    """Escape, then re-enable `code` and **bold**."""
    out = esc(text)
    for pattern, repl in INLINE:
        out = pattern.sub(repl, out)
    return out


def die(msg: str) -> None:
    sys.exit(f"build.py: {msg}")


# --- blocks ----------------------------------------------------------------


def render_evidence(items: list[dict]) -> str:
    """Evidence entries: a labelled code excerpt, or a prose paragraph."""
    parts = []
    for item in items:
        label = item.get("label")
        if label:
            parts.append(f"  <h4>{inline(label)}</h4>")
        if "code" in item:
            source = item.get("source")
            body = f"{source}\n{item['code']}" if source else item["code"]
            parts.append(f"  <pre><code>{esc(body)}</code></pre>")
        if "text" in item:
            parts.append(f"  <p>{inline(item['text'])}</p>")
        if "note" in item:
            parts.append(f'  <div class="note">{inline(item["note"])}</div>')
    return "\n".join(parts)


OTHER = "__other"
OTHER_TITLE = "Something else — I will say what"
OTHER_WHY = "None of the above, or the right answer needs a conversation. Type it here, or leave it blank and tell me in chat."


def render_options(card_id: str, options: list[dict], allow_other: bool = True) -> str:
    recommended = [o for o in options if o.get("recommended")]
    if len(recommended) > 1:
        die(f"card {card_id}: {len(recommended)} recommended options, expected at most 1")
    for opt in options:
        if opt.get("value") == OTHER:
            die(f"card {card_id}: option value '{OTHER}' is reserved")

    rows = []
    for opt in options:
        for field in ("value", "title"):
            if field not in opt:
                die(f"card {card_id}: option missing '{field}'")
        mine = '<span class="mine">my answer</span>' if opt.get("recommended") else ""
        why = f'<span class="opt-why">{inline(opt["why"])}</span>' if opt.get("why") else ""
        rows.append(
            f'    <label class="opt"><input type="radio" name="{esc(card_id)}" '
            f'value="{esc(opt["value"])}"><span>'
            f'<span class="opt-title">{inline(opt["title"])}{mine}</span>{why}</span></label>'
        )

    if allow_other:
        rows.append(
            f'    <label class="opt"><input type="radio" name="{esc(card_id)}" value="{OTHER}"><span>'
            f'<span class="opt-title">{esc(OTHER_TITLE)}</span>'
            f'<span class="opt-why">{esc(OTHER_WHY)}</span></span></label>\n'
            f'    <textarea class="other" data-other="{esc(card_id)}" rows="2" hidden '
            f'placeholder="Your answer, or a question back to me."></textarea>'
        )
    return '  <div class="opts">\n' + "\n".join(rows) + "\n  </div>"


def render_card(card: dict) -> str:
    card_id = card.get("id") or die("card missing 'id'")
    status = card.get("status", "")
    cls = f"card {status}".strip()
    chip = f'<span class="chip {esc(status)}">{inline(card["chip"])}</span>' if card.get("chip") else ""

    parts = [f'<div class="{esc(cls)}" data-item="{esc(card_id)}">']
    parts.append(
        f'  <div class="card-head"><span class="id">{esc(card_id)}</span>'
        f'<span class="title">{inline(card.get("title", ""))}</span>{chip}</div>'
    )
    if card.get("evidence"):
        parts.append(render_evidence(card["evidence"]))
    if card.get("options"):
        parts.append(render_options(card_id, card["options"], card.get("other", True)))
    parts.append("</div>")
    return "\n".join(p for p in parts if p)


def render_rules(block: dict) -> str:
    """A run of one-line decisions rendered as <select> rows."""
    parts = []
    if block.get("group"):
        parts.append(f"<h3>{inline(block['group'])}</h3>")
    if block.get("context"):
        parts.append(f'<p class="tools">{inline(block["context"])}</p>')

    for rule in block.get("items", []):
        rule_id = rule.get("id") or die("rule missing 'id'")
        why = f'<div class="why">{inline(rule["why"])}</div>' if rule.get("why") else ""
        options = ['<option value="">choose…</option>']
        recommended = 0
        for choice in rule.get("choices", []):
            if choice.get("value") == OTHER:
                die(f"rule {rule_id}: choice value '{OTHER}' is reserved")
            label = choice["label"]
            if choice.get("recommended"):
                recommended += 1
                label += " — my answer"
            options.append(f'<option value="{esc(choice["value"])}">{esc(label)}</option>')
        if recommended > 1:
            die(f"rule {rule_id}: {recommended} recommended choices, expected at most 1")
        other = ""
        if rule.get("other", block.get("other", True)):
            options.append(f'<option value="{OTHER}">something else — I will say what</option>')
            other = (
                f'\n  <textarea class="other" data-other="{esc(rule_id)}" rows="2" hidden '
                f'placeholder="Your answer, or a question back to me."></textarea>'
            )
        parts.append(
            f'<div class="rule"><div class="txt">{inline(rule["text"])}{why}</div>\n'
            f'  <select data-rule="{esc(rule_id)}">' + "".join(options) + f"</select>{other}</div>"
        )
    return "\n".join(parts)


def render_block(block: dict) -> str:
    kind = block.get("type", "card")
    if kind == "card":
        return render_card(block)
    if kind == "rules":
        return render_rules(block)
    if kind == "note":
        return f'<div class="note">{inline(block["text"])}</div>'
    if kind == "text":
        return f"<p>{inline(block['text'])}</p>"
    if kind == "html":
        return block["html"]
    die(f"unknown block type {kind!r}")


def render_section(section: dict) -> str:
    parts = []
    if section.get("heading"):
        parts.append(f"<h2>{inline(section['heading'])}</h2>")
    if section.get("note"):
        parts.append(f'<p class="section-note">{inline(section["note"])}</p>')
    for block in section.get("blocks", []):
        parts.append(render_block(block))
    return "\n\n".join(parts)


# --- page ------------------------------------------------------------------


def build(spec: dict) -> str:
    title = spec.get("title") or die("spec missing 'title'")
    key = spec.get("key") or die("spec missing 'key' (the localStorage key)")
    filename = spec.get("answers_filename", "decisions-answers.md")

    ids: list[str] = []
    for section in spec.get("sections", []):
        for block in section.get("blocks", []):
            if block.get("type", "card") == "card":
                ids.append(block["id"])
            elif block.get("type") == "rules":
                ids.extend(r["id"] for r in block.get("items", []))
    duplicates = {i for i in ids if ids.count(i) > 1}
    if duplicates:
        die(f"duplicate item ids: {', '.join(sorted(duplicates))}")

    css = (ASSETS / "sheet.css").read_text()
    js = (ASSETS / "sheet.js").read_text()
    body = "\n\n".join(render_section(s) for s in spec.get("sections", []))
    sub = f'<p class="sub">{inline(spec["subtitle"])}</p>' if spec.get("subtitle") else ""
    footer = f'\n<footer>\n  {inline(spec["footer"])}\n</footer>\n' if spec.get("footer") else ""

    return f"""<!doctype html>
<html lang="{esc(spec.get('lang', 'en'))}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<style>
{css}</style>
</head>
<body>
<div class="wrap">

<header class="top">
  <h1>{inline(title)}</h1>
  {sub}
  <div class="toolbar">
    <button class="primary" onclick="collect()">Copy my decisions</button>
    <button onclick="download()">Download answers file</button>
    <button onclick="acceptAll()">Accept every recommendation</button>
    <button onclick="toggleTheme()">Light / dark</button>
    <button onclick="clearAll()">Clear</button>
  </div>
  <p id="flash" hidden></p>
</header>

{body}

<h2>Anything I did not ask about</h2>
<div class="card">
  <p class="section-note">Questions back at me, a decision this sheet missed, or context that changes several answers at once. It travels with the export.</p>
  <textarea class="other" id="notes" rows="3" placeholder="Free text. Nothing here has to fit an option."></textarea>
</div>

<h2>Your answers</h2>
<div class="card">
  <p class="section-note">Kept in this browser only. Press <b>Copy my decisions</b> and paste back into the session, or <b>Download answers file</b> and tell me where it landed.</p>
  <textarea class="out" id="out" readonly placeholder="Nothing selected yet."></textarea>
  <div class="toolbar"><button class="primary" onclick="collect()">Copy my decisions</button><button onclick="download()">Download answers file</button></div>
</div>
{footer}
</div>
<script>
const KEY={json.dumps(key)};
const TITLE={json.dumps(title)};
const FILENAME={json.dumps(filename)};
{js}</script>
</body>
</html>
"""


def main(argv: list[str]) -> None:
    if len(argv) != 3:
        sys.exit(__doc__)
    spec = json.loads(Path(argv[1]).read_text())
    out = Path(argv[2])
    out.write_text(build(spec))
    cards = sum(
        1
        for s in spec.get("sections", [])
        for b in s.get("blocks", [])
        if b.get("type", "card") == "card" and b.get("options")
    )
    rules = sum(
        len(b.get("items", []))
        for s in spec.get("sections", [])
        for b in s.get("blocks", [])
        if b.get("type") == "rules"
    )
    print(f"{out} — {cards} card(s), {rules} one-line row(s)")


if __name__ == "__main__":
    main(sys.argv)
