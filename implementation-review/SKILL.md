---
name: implementation-review
description: "Build optional self-contained HTML delivery-plan review pages for complex human reviews or explicit HTML requests. Derive scope, decisions, acceptance, and sequencing from canonical spec.md. Pair with technical-spec HTML when consequential technical detail needs a separate review view. Small low-risk work needs no page."
---

# Implementation review

Turn canonical `spec.md` and repository evidence into an optional browser review page. Load `engineering-lifecycle` for canonical spec location and approval/review gates; this skill only owns the HTML view. Small edits stay direct unless the user requests a page.

## Source authority

`spec.md` owns requirements, decisions, acceptance, and feedback. JSON is renderer input; HTML is a derived review view. Include the canonical spec path in page links. Update the spec first when answers return, then synchronize JSON and rebuild. Never implement from conflicting or stale views; do not add renderer IDs to the spec unless useful for traceability.

## Steps

1. Inspect project instructions, relevant code, config, deployment files, tests, and existing plans. Every proposed change must have an authored source or be marked as an assumption.
2. Read [`reference/schema.md`](reference/schema.md). Consult [`reference/template.md`](reference/template.md) when authoring section content; keep the template's section order.
3. Resolve only blocking ambiguities or consequential decisions. Use structured questions for one or two choices; put three or more genuine reviewer choices in the requested page. Do not manufacture questions for ordinary implementation details.
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
10. When answers return, handle `OTHER` first. Apply decisions to canonical `spec.md`, then update owning view JSON by stable ID, bump version/date for material changes, log the change, and rebuild. Material changes return to lifecycle dry-run review and approval.
## Technical-spec trigger

When producing this optional HTML plan, generate a paired technical review view when proposed work introduces or materially changes any of these:

- external or internal contracts;
- persistent data models, migrations, or source-of-truth behavior;
- component boundaries, ports, or deployment architecture;
- authentication, authorization, privacy, retention, or other trust boundaries;
- concurrency, idempotency, retries, recovery, or capacity ceilings;
- parsing, matching, versioning, reconciliation, or other non-trivial processing rules.

For an explicitly requested page covering copy, styling, configuration values, routine dependency updates, or small local behavior, produce the plan only. Without an explicit page request, skip HTML ceremony for these changes.

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
