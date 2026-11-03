---
name: unslop
description: Edit human-facing prose for plain, concrete language without changing technical meaning, evidence, uncertainty or user tone. Use for requested writing cleanup or dense explanations, docs and design decisions.
license: MIT
---

# Unslop

Preserve meaning before style. Use this as editing guidance, not a mandatory separate review pass on every response.

| Look for | Prefer |
|---|---|
| Filler, flattery, chatbot closers | Direct statement or useful next action |
| Vague attribution or unsupported certainty | Named evidence, or explicit assumption/uncertainty |
| Abstract praise and metaphors | Mechanism, observable behavior, measured value |
| Fancy verbs and synonym cycling | Plain words; one consistent name per concept |
| Dense clauses and repeated framing | Short complete explanations at reader's needed depth |
| Decorative formatting, forced triples | Structure that matches actual content |
| Excessive compression | Enough context to understand without decoding |

Never alter code, commands, URLs, identifiers, quotations, legal text, numeric evidence or security warnings for style. Do not remove justified confidence language. User's requested language/tone wins unless it hides safety or technical meaning. Punctuation is not a correctness rule; keep it when clearer. Technical terms such as API surface or primitive are valid when precise, not banned vocabulary.

Adapted from pstack; see [provenance](UPSTREAM.md).
