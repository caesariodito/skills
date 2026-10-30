# Mermaid diagram reference

Status: approved for implementation by user; pinned local Mermaid dependency separately approved.

## Scope and evidence

Add optional diagrams.md, rendered live by existing local preview, for detailed flowchart, sequence, ERD, UML-style class/state, and deployment-style topology views. Existing technical spec keeps concise summaries and tables. Both review headers link to diagram reference when configured; relevant technical sections deep-link to diagrams.md anchors. Canonical spec remains authoritative; diagrams are derived, with source version, related IDs, assumptions, and explanations. No new JSON diagram schema, separate approval system, or mandatory diagram count.

Existing marked engine parses Markdown; grok-mermaid only renders terminal art. Use pinned mermaid 12.2.0 in technical-spec/package.json and lockfile, installed with lifecycle scripts disabled. Browser loads local engine assets only. Alternative CDN violates offline/privacy goals; handcrafted SVG duplicates Mermaid functionality.

## Trust boundary and failure behavior

Markdown raw HTML remains escaped. Only mermaid fences become escaped diagram-source containers. A generated nonce authorizes one controlled module loader; user Markdown cannot inject scripts. Serve only .js assets from installed Mermaid dist under reserved route, with path containment and existing Host/Origin protections. CSP permits local modules, no network connections, images, frames, or arbitrary inline scripts. Mermaid strict mode, disabled HTML labels and click actions, and reject source config directives/frontmatter to avoid policy override. Invalid or unsupported diagrams show visible error and readable source; ordinary Markdown still works if Mermaid missing. Limit source size; document that rendering is local review tooling, not a hostile-input compute sandbox.

## Acceptance and verification

- Relevant diagram types supported by installed engine and illustrated in password-reset diagrams.md; example all synthetic and labeled.
- Live headings expose stable anchors; plan/spec header navigation appears only when diagram-reference link exists; technical flows/architecture/data sections link to optional diagram anchors without new required schema fields.
- Existing decision/export controls unchanged. Plain Markdown responses retain script-src none; diagram responses authorize controlled local loader. Test traversal and MIME allowlist of asset route, directive rejection, source escaping, heading links, missing-engine fallback, and existing preview protections.
- Run Node HTTP/assert checks, both Python smoke tests, Mermaid syntax checks for all example diagrams, example rebuild, diff checks. Attempt real-browser render check; report tooling gaps.

## Dry-run and review

Preserve existing script-free Markdown default; allow engine only on Mermaid pages. Use existing generic links object for diagram-reference/section anchors, avoid adding schema fields or mandatory third page. Mermaid dependency assets remain ignored and reproducible via npm ci --ignore-scripts. Rollback removes optional links and preview Mermaid branch; canonical Markdown unaffected. No migration, publishing, or commit authorized.

## Completion

Implemented. User approved workflow and pinned local dependency. Mermaid 12.2.0 installed with --ignore-scripts; npm reported zero vulnerabilities at install time.

Passed: Node preview HTTP/assert checks; both Python renderer smoke tests; example rebuild; git diff --check. Isolated headless Chrome using already installed Playwright rendered all six example diagrams (flow, sequence, ERD, class, state, deployment-style topology), reported zero page errors/alerts, followed diagram header link, verified three technical-section links, and exercised Accept recommendations. Evidence screenshot and browser check live in ignored .scratch/review-preview/.

Review/fix/re-review: updated heading assertions after adding stable IDs; corrected diagram placement outside collapsible source; tested directive rejection and reserved asset traversal/type checks; reran all checks. Node-only Mermaid parsing proved unsuitable because DOMPurify requires browser DOM; replaced that check with actual isolated Chrome rendering, not sanitizer stubs. No fresh dependency needed for browser validation.

Residual ceiling: local directory is trusted, not a hostile concurrent filesystem or CPU sandbox. Mermaid source limited to 50,000 characters; renderer still processes diagram complexity in browser. Missing engine/error paths retain source, no automatic network installation. Dependency and lockfile add footprint only to technical-spec; node_modules ignored. No commits or public actions performed.
