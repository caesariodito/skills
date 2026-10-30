# Review navigation and live Markdown preview

Status: delivered; automated checks passed. Optional real-browser interaction check unavailable (Playwright connection timeout).

## Scope

Enhance implementation-review, technical-spec, and engineering-lifecycle only. Add conspicuous paired-page navigation near both page headers. Keep current structured review renderers and decision exports. Render canonical Markdown dynamically through a localhost engine, without writing an HTML copy of Markdown. Update password-reset example and instructions.

## Evidence and decision

Existing implementation plan links technical page only in System shape; technical page return link is primarily sidebar/overview. Current renderers are Python stdlib and self-contained HTML. No Python Markdown engine or preview CLI found. Active Pi installation already includes marked 18.0.11. Use existing marked with Node stdlib HTTP; resolve active installation at startup, no dependency added. Keep explicit renderer data separate from Markdown preview; do not replace interactive review schema with prose parsing.

Alternative: browser-side Markdown fetch needs a server anyway and duplicates transport/security handling. New framework or sanitizer dependency is unnecessary if renderer escapes raw HTML, disables images, and emits only safe links. Markdown preview uses strict CSP as defense in depth. Static review pages remain trusted generated HTML, not a sanitizer for arbitrary local HTML.

## Acceptance

1. Paired review headers visibly link to Technical specification / Implementation review; plan-only pages do not invent a technical-page link.
2. One local preview command serves only explicitly selected document directory, bound to 127.0.0.1 with random unguessable URL prefix; reject unexpected Host/Origin, traversal, symlink escapes, directories, unsupported methods/types, and oversized documents.
3. Markdown is read and rendered on each request with installed marked; source edits appear on refresh; no Markdown-derived .html file is written. Relative Markdown links use same preview server. Review links to spec.md open formatted preview while served through engine.
4. Untrusted Markdown cannot execute raw HTML, scripts, unsafe URL schemes, or embedded images. Escape raw HTML; allow normal relative links, fragments, HTTPS/HTTP/mailto links with safe attributes. CSP disallows scripts in Markdown response; no third-party assets. Preview exposes only user-selected non-sensitive review directory, not repo root or home.
5. Existing review HTML remains file:// compatible. Local browser review mode preserves decision/answer interactions. Browser state is origin-specific; export before moving from file:// to localhost or changing port.
6. Focused Node assert tests cover Markdown output, live refresh, link protocols, traversal/symlinks, host/origin checks, method/type restrictions and missing files. Existing Python smoke tests cover header navigation; run both renderers and rebuild example. Browser interaction smoke test attempted, unavailable browser tooling reported.

## Plan

Add one shared preview.mjs and one assert-based test under implementation-review/scripts, reuse from technical-spec and lifecycle via documented path. Minimal changes to both renderer headers and smoke tests. Update three skill docs with preview command and source authority. Rebuild example from existing JSON source.

## Failure / rollback

Missing marked or unsupported runtime fails startup with clear error; never auto-installs. No external binding, secret-directory serving, auto-opening other tabs, or background process persistence. Ctrl+C stops server. Existing file:// pages remain usable when preview unavailable. Rollback removes preview entry point/documentation and header additions; Markdown source unaffected.

## Dry-run review

Verified renderer header insertion points and existing URL validators. marked installed under current managed Pi release. Preserve link URL validation, HTML escaping, and interactive page JS. Local HTTP server must not allow arbitrary filesystem navigation or bind all interfaces. Existing static renderers are trusted input, not arbitrary HTML upload hosting. Tests must exercise actual server handler and port 0 loopback binding. No frontend framework or new dependency required.

## Verification / feedback

User selected local engine and review-workflow scope, then explicitly approved this design before implementation.

Passed: node implementation-review/scripts/preview.test.mjs; implementation-review/scripts/smoke_test.py; technical-spec/scripts/smoke_test.py; password-reset example rebuild; git diff --check. Preview test covers actual loopback HTTP, live source refresh, tables/code blocks, raw HTML escaping, image suppression, unsafe URL obfuscation, host/origin, traversal/symlink containment, size/type/method limits, and missing files. Header smoke tests cover paired navigation plus plan-only omission.

Review/fix/re-review: preserved existing URL validation and decision JavaScript; removed unused import; added obfuscated-link/formatting cases and reran focused check. Remaining ceiling: preview is local trusted-directory tooling, not a hostile concurrent filesystem sandbox. Markdown renderings persist no HTML copies. Static generated HTML intentionally retains inline scripts for review controls; do not host arbitrary HTML. Browser interaction smoke test attempted; Playwright extension failed to connect within 30 seconds. Browser controls were not changed, but real-browser validation remains unverified. No production application/security acceptance implied.

## Design refresh (2026-10-30)

Browser evidence on password-reset example: Markdown preview was unstyled system-ui with hard-coded header links (404 when a page was absent) and no contents. Mermaid used `neutral` theme on dark pages, making sequence text unreadable; `min-width:100%` upscaled the ERD about 3× and squashed the deployment topology to 109px tall; a shared `.label` class later collided with Mermaid labels during development. Technical spec sidebar showed raw lowercase link keys, and its Excluded box rendered empty.

Changes: preview shell moved to `implementation-review/assets/preview.css` with review-page tokens, sidebar **Links** (only existing review documents, current page marked) and **Contents** (H2/H3), unique heading slugs with hover/focus anchors, skip link, collapsible mobile sidebar, print styles. Plain Markdown stays script-free. Diagram loader moved to `assets/preview-diagrams.mjs`: theme variables from page tokens, re-render on scheme change, natural-size fit (no upscaling, 70% minimum scale, then horizontal scroll), Full size dialog with focus return. Review sidebars sentence-case link labels; empty boundary sides read "None stated"; schema documents the `Excludes ` prefix.

Verified: preview Node checks (adds outline, slug, sidebar, and loader assertions), both Python smoke tests, example rebuild, and built-in browser checks at 1280px dark and 375px light (no page overflow, all six diagrams render, viewer opens without scroll jump and closes on Escape). Animation timing only checked with the pane hidden, where animations were throttled.
