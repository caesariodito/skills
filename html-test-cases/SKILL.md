---
name: html-test-cases
description: Generates self-contained HTML test cases grounded in a commit hash, branch diff, or GitHub PR. Use when user asks for QA cases, acceptance tests, manual test plans, regression checklists, or test cases in HTML tied to code changes.
---

# HTML Test Cases

Build one reviewable, printable HTML test suite from implementation evidence.

## Inputs

Accept one or more references:

- commit hash or range
- branch name
- GitHub PR number or URL
- issue/spec number or URL

If no change reference exists, ask for one. If change reference exists but no spec exists, derive expected behavior from tests and public-interface changes; label uncertain product expectations as assumptions.

## Workflow

1. **Resolve evidence.**
   - Commit: inspect `git show --stat <ref>` and `git show <ref>`.
   - Range/branch: inspect merge-base diff against target branch.
   - PR: use `gh pr view <ref> --json title,body,url,baseRefName,headRefName,commits,files` and inspect PR diff.
   - Issue/spec: read linked issue and comments.
   - Completion: every changed public behavior, fixed bug, and compatibility path has evidence.

2. **Build coverage map.**
   - Map changed behavior to user-observable seam: CLI, API, UI, message, file, PDF, DB, or integration.
   - Include happy path, boundary, negative input, combined conditions, and regression path when evidence supports them.
   - Rank cases Critical, High, or Normal from user/data risk.
   - Completion: every relevant changed behavior maps to at least one case, or is explicitly excluded with reason.

3. **Write executable cases.**
   Each case contains:
   - stable ID and title
   - priority/risk
   - preconditions
   - complete, directly runnable input or fixture; never provide only changed lines when workflow requires a full form/request
   - short numbered steps
   - literal expected output, order, state, or error
   - evidence/defect notes field

   Expected results must come from spec, existing tests, or changed code. Keep implementation details in coverage references, not execution steps.

4. **Generate one self-contained HTML file.**
   Default path: `docs/test-cases/<reference>-<slug>.html`.
   Keep long complete fixtures inside native `<details><summary>…</summary><pre>…</pre></details>` blocks so page stays compact. Use separate collapsed fixtures for variants. Add one keyboard-accessible `Copy form` button per fixture; copy only that fixture's exact `<pre>` text, show brief success/failure feedback, and support non-secure local `file://` pages with a clipboard fallback.

   Include embedded CSS and small native JavaScript only. Include:
   - title and scope
   - source links/references
   - environment, build, tester, date fields
   - PASS / FAIL / BLOCKED / NOT RUN selectors with immediate color highlighting on initial load, individual changes, and bulk changes: green PASS, red FAIL, amber BLOCKED, neutral NOT RUN
   - live result counts
   - always-present `Copy results to clipboard` button producing plain-text report with suite title, source reference, environment/build/tester/date, every case ID/title/status, non-empty evidence, and summary counts; include clipboard fallback and success/failure feedback
   - automatic browser persistence with a suite-specific, source-reference-specific `localStorage` key; restore statuses, evidence notes, and execution metadata after reload
   - print stylesheet that hides interactive copy controls
   - coverage map
   - exit criteria and sign-off

   Use semantic HTML, labels, readable contrast, responsive layout, and no external dependencies.

5. **Validate.**
   - Confirm HTML has doctype, title, viewport, and balanced structure.
   - Search document for every case ID and source reference.
   - Reconcile case count with result counter default.
   - Reconcile fixture count with copy-button count and verify each button targets its containing fixture.
   - Verify every result selector receives correct state color on load and after individual or bulk result changes; keep text labels so color is never sole status signal.
   - Verify status, evidence, and execution metadata survive reload; isolate saved data by suite and change reference to prevent cross-suite contamination.
   - Verify copied result report includes all case statuses, non-empty evidence, execution metadata, source reference, and correct summary counts.
   - Run repository checks only when user also asks to validate implementation.
   - Completion: file opens standalone and every coverage-map case exists.

## Guardrails

- Keep secrets, credentials, customer data, and private URLs out of fixtures.
- Prefer realistic synthetic data.
- Separate observed requirements from assumptions.
- Avoid duplicate cases that exercise same behavior and risk.
- Preserve exact labels, formatting, and ordering when those are acceptance requirements.
- Reuse safe representative fixture data, changing only fields needed by each case. Keep arithmetic internally consistent.
- Leave unrelated working-tree files untouched.
- Persist locally only; avoid servers, analytics, cookies, and external dependencies.

## Output

Report:

- HTML path
- source change reference
- case count
- main coverage and explicit exclusions
- validation performed
