---
name: technical-spec
description: Draft or update deep technical specifications as structured, self-contained HTML pages covering contracts, diagrams, data models, algorithms, examples, failure handling, security, and technical verification. Use when implementation details need review separately from a concise implementation plan.
---

# Technical spec

Turn repository evidence into one deep technical contract and one self-contained browser review page. Keep delivery sequencing, business case, staffing, estimates, and rollout ownership in `implementation-review`.

## Steps

1. Inspect project instructions, relevant code, API/schema docs, runtime config, deployment files, tests, and linked implementation plan. Mark unsupported claims as assumptions.
2. Read [`reference/schema.md`](reference/schema.md) and [`reference/template.md`](reference/template.md). Preserve fixed section order.
3. Resolve at most two blocking ambiguities in chat. Put three or more technical choices in page.
4. Ensure `.scratch/` is ignored when working inside a repository. Write `.scratch/<feature>/technical-spec.json` and preserve stable IDs.
5. Build:
   ```sh
   # <skill-dir> = directory containing the technical-spec SKILL.md
   python3 <skill-dir>/scripts/build.py \
     .scratch/<feature>/technical-spec.json \
     .scratch/<feature>/technical-spec.html
   ```
6. Validate page opens from `file://`, contains no external assets or secrets, and links back to implementation plan.
7. Return absolute HTML path. Reviewer can accept recommendations, change exceptions, then paste or download exported answers.
8. When answers return, handle `OTHER` first. Apply stable IDs, supersede changed decisions, update examples/contracts, bump version, add change-log entry, and rebuild.

## Ownership boundary

Technical spec owns:

- business-to-system flow and runtime sequence;
- component boundaries and ports;
- API, webhook, command, and message contracts;
- logical/physical data model and invariants;
- parsing, normalization, matching, versioning, and processing rules;
- synthetic/redacted example input and output;
- failure handling, retries, idempotency, concurrency, and recovery;
- security, privacy, access, retention, and trust boundaries;
- technical tests, observability, capacity ceilings, and upgrade triggers;
- deep technical decisions and unresolved technical questions.

Implementation plan owns:

- business context, goals, scope, and non-goals;
- module/workstream summaries, phases, estimates, owners, and dependencies;
- rollout and rollback sequencing;
- plan-level risks, approvals, and business questions.

Link across pages by stable IDs instead of duplicating detail. Implementation plan can say `M2 implements TS-04` and deep-link `./technical-spec.html#CT-01`; technical spec can say `TD-03 affects plan M2`. Plan decisions use `D-xx`; technical decisions use `TD-xx`. Plan definition-of-done items reference "technical release gates in §10" (`verification.gates`) as one item instead of copying each gate.

The ID registry in [`../implementation-review/reference/schema.md`](../implementation-review/reference/schema.md#id-registry) is the single source for every prefix in both documents. Do not invent prefixes.

## Authoring contract

- Preserve fixed order: overview; flows and sequences; architecture; contracts; data model; processing rules; examples; reliability and failure handling; security and privacy; technical verification and observability; technical decisions; open technical questions; change log.
- Give every section and decision a one-line TL;DR.
- Keep IDs stable: flows and sequences `TS-01…`, components `C1…`, contracts `CT-01…`, processing rules `PR-01…`, examples `EX-01…`, decisions `TD-01…`, questions `TQ1…`. Each rendered item gets an anchor equal to its ID.
- Prefer typed diagrams and tables over prose walls. Keep examples synthetic or redacted.
- State authority for every derived field: payload, sender roster, parser rule, counter, or user entry.
- Define failure outcome beside happy path. Ambiguity must become explicit error or review state.
- Preserve superseded decisions as `Superseded (by TD-xx)`.
- Add 2–4 browser choices only for genuine technical decisions, with exactly one useful recommendation.
- Link large generated schemas or full OpenAPI files; embed only review-critical excerpts.
- Record contract, model, algorithm, capacity, security, or verification changes in change log.

## Completion

Done when:

- JSON validates and all sections render in fixed order;
- plan cross-link works, and every ID resolves as `technical-spec.html#<ID>`;
- actor handoffs, runtime ordering, data ownership, contracts, processing rules, and failure paths are explicit;
- examples prove field derivation without personal data;
- invariants have runnable or planned checks;
- security and retention boundaries are explicit;
- HTML is self-contained and secret-free;
- answer export updates technical decisions by stable ID.
