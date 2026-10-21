---
name: implementation-review
description: Draft or update concise implementation plans as self-contained HTML review pages covering business context, goals with a verifiable definition of done, workstreams, phases, rollout, risks, and browser-answerable plan decisions. Use for delivery plans and pre-code review. Produces the plan alone for copy, styling, configuration values, routine dependency updates, or small local behavior; pairs it with a technical-spec page when work changes contracts, persistent data, architecture, trust boundaries, reliability behavior, or non-trivial processing rules.
---

# Implementation review

Turn repository evidence into one durable plan and one browser review page. Chat carries file path and short handoff.

## Steps

1. Inspect project instructions, relevant code, config, deployment files, tests, and existing plans. Every proposed change must have an authored source or be marked as an assumption.
2. Read [`reference/schema.md`](reference/schema.md). Consult [`reference/template.md`](reference/template.md) when authoring section content; keep the template's section order.
3. Resolve at most two blocking ambiguities in chat. Put three or more review choices in page.
4. Apply the technical-spec trigger below. When it fires, load `technical-spec` and author both documents as a pair; otherwise produce the implementation plan only.
5. Ensure repository `.scratch/` is ignored before creating artifacts. Write source to `.scratch/<feature-slug>/implementation-plan.json`. Start from [`reference/example.json`](reference/example.json) only for shape; replace every example value.
6. Build page:
   ```sh
   # <skill-dir> = directory containing the implementation-review SKILL.md
   python3 <skill-dir>/scripts/build.py \
     .scratch/<feature-slug>/implementation-plan.json \
     .scratch/<feature-slug>/implementation-plan.html
   ```
7. When paired, build `technical-spec.json` and `technical-spec.html` using the `technical-spec` skill. Keep both artifacts in the same `.scratch/<feature-slug>/` directory.
8. Validate every generated page exists, has no external assets or secrets, and opens from `file://`. Smoke-test browser choices and cross-links when browser tooling is available.
9. Return absolute path for every generated HTML page. Say reviewer can accept recommendations, change exceptions, then paste or download exported answers.
10. When answers return, handle `OTHER` answers first. Apply stable IDs to owning source document, update affected decisions/questions/phases, bump version and updated date for material changes, add change-log entry, and rebuild affected pages.
11. When all blocking review choices are resolved and Deliver is approved or invoked, hand the finalized `implementation-plan.json` and, when present, `technical-spec.json` to `delivery-workflow`. Do not implement from these review artifacts directly; Deliver composes and independently reviews `spec.md` and `plan.md` before ticketing and implementation approval.

## Deliver handoff

Treat finalized review sources as authoritative inputs, not parallel contracts:

- `implementation-plan.json` feeds `spec.md` problem, goals, scope, non-goals, and acceptance criteria, plus `plan.md` business context, workstreams, ordering, ownership, rollout, risks, dependencies, and definition of done.
- `technical-spec.json`, when present, feeds `spec.md` behavior, contracts, data, architecture, trust boundaries, failure handling, security, and technical verification.
- Exported answers must already be applied to their owning JSON source. HTML pages are review views, not synthesis sources.
- Preserve stable IDs as references where useful. Resolve conflicts in favor of the owning source and ask the user about unresolved product or architecture decisions.
- Deliver may ask only for missing or conflicting requirements; it must not repeat settled review questions.

The handoff is ready when source JSON validates, pages are rebuilt, every implementation-blocking question is resolved, and paired plan/spec links pass. This handoff does not authorize implementation.

## Technical-spec trigger

Generate a paired technical specification when proposed work introduces or materially changes any of these:

- external or internal contracts;
- persistent data models, migrations, or source-of-truth behavior;
- component boundaries, ports, or deployment architecture;
- authentication, authorization, privacy, retention, or other trust boundaries;
- concurrency, idempotency, retries, recovery, or capacity ceilings;
- parsing, matching, versioning, reconciliation, or other non-trivial processing rules.

Produce implementation plan only when change is limited to copy, styling, configuration values, routine dependency updates, or small local behavior that changes none of the items above.

When trigger fires:

1. Load `technical-spec` before authoring technical content.
2. Generate paired `.scratch/<feature-slug>/technical-spec.json` and `.scratch/<feature-slug>/technical-spec.html` beside implementation-plan artifacts.
3. Add bidirectional relative links: implementation plan links to `./technical-spec.html` from `system_shape.technical_spec`; technical spec links to `./implementation-plan.html`.
4. Reference technical IDs (`TS`, `C`, `CT`, `PR`, `EX`, `TD`, `TQ`; see the ID registry in schema) from workstream `technical_refs` or plan decisions.
5. Keep technical details out of the implementation plan: diagrams, architecture, contracts, ERD, algorithms, examples, failure handling, security controls, and technical tests. Do not duplicate technical detail between pages.

## Authoring contract

- Preserve the template's section order: 30-second read; business context; goals and definition of done; system shape; workstreams; key decisions; phases; risks and assumptions; rollout and rollback; outcome metrics and observability; open questions; change log.
- Write business context for an engineer unfamiliar with business domain. Quantify pain, target, and measurement.
- Separate delivery from outcomes. Definition-of-done items are binary, name a verifier, and decide when delivery is finished. Outcome targets are measured later and never block delivery.
- Give every workstream and decision a one-line TL;DR.
- Use only IDs from the schema's ID registry. Keep them stable and never reuse them.
- Use schema status vocabulary exactly. Preserve old decisions as `Superseded (by D-xx)`.
- Keep plan decisions, risks, and questions at plan level: scope, ownership, budget, schedule, rollout, hosting or procurement, process adoption, staffing, dependencies, approvals, and operational readiness. Technical choices, failure modes, and questions go to the technical spec as `TD`, reliability entries, and `TQ`.
- Give every open question browser choices: 2–4 options, one useful recommendation, consequences in every `why`, and checkable evidence where available. Free-text "other" covers answers the options miss.
- Add decision options only for genuine reviewer choices, with the same rules.
- Treat questions without owner, due date, or blocked item as incomplete.
- Record every scope, decision, estimate, exit-criteria, or definition-of-done change in change log.
- Keep guides short and hidden by default. Final page must remain useful with guides never opened.

## Decision-sheet integration

Implementation plan renderer owns layout and schema. It reuses decision-sheet interaction contract: stable IDs, 2–4 options, one recommendation, free-text alternatives, `localStorage`, accept-all, copy, and download. Use standalone `decision-sheet` skill for generic batches not needing full implementation plan.

## Scope discipline

Prefer deletion, standard library, native platform, and installed dependencies. Propose smallest secure diff. Name one skipped-scope boundary. No scaffolding for future scope.

## Plan ready when

- structured JSON validates;
- every template section renders in template order;
- technical-spec trigger was evaluated explicitly; paired artifacts exist when any trigger condition applies;
- paired pages use working bidirectional relative links and plan workstreams reference owning technical IDs;
- deep technical details live in linked technical spec, not implementation plan;
- every definition-of-done item has a verifier and is covered by one phase;
- current phase matches phase table;
- risks have mitigations and owners;
- open questions have owners, dates, and blockers;
- HTML is self-contained, secret-free, and opens directly;
- exported answers can update plan by stable ID without another long proposal.

## Completion

- Mark a DoD item verified only with evidence: command output, a link, or a named sign-off. Code inspection alone is not evidence.
- When every DoD item is verified, set status to `shipped`, record the evidence, and stop. Report outcome targets with their check dates.
- If an item can't be verified in this environment, leave it open, say why, and name who can verify it.
- Changing a DoD item after review is a material change: bump the version and log it.
