# Workflow consolidation

## Approval and scope

User approved implementing audit recommendations and pushing changes for GitHub review. Three authorities: skills owns portable workflows; dotfiles owns Mac configuration/restore; pi-server-agents owns server installation/runtime integration. User handles deletion of legacy GitHub .pi repository. Never delete local ~/.pi or private state. No VPS deployment, credential publication, new runtime dependency, or automatic delegation.

## Evidence and decisions

- Mac dotfiles HEAD 444a91a; shared skills HEAD fdc06a2; server HEAD 833318e. Existing Mac/lifecycle edits and security-audit import are intentional approved work; preserve and publish after verification.
- Pi 1.5.0 supports Git packages pinned to commits and explicit skill resource manifests. Use native package installation rather than copied server snapshots. Mac authors local shared checkout; server consumes pinned reviewed revision.
- Keep safety/approval/delegation invariants always-on. Skills own procedures. Host policy remains local; deployment procedure becomes portable server-operations skill.
- Move project-init and gateway skills into canonical skills repo; retain upstream security files unchanged with provenance. Herdr remains separately installed upstream skill; no unknown-provenance redistribution.
- Bring server npm-Pi preview fallback upstream; replace personal absolute paths with skill-relative references. Narrow decision-sheet HTML trigger.
- Existing daily-skills directories stay intact for rollback but leave discovery settings; remove vendored copies from server source. Keep unknown settings/state. Runtime migration backs up changed files. No mass deletion on installed hosts.
- Remove unused tracked server binaries/catalogs; Git history retains recovery. Keep base settings, gateway extension, and optional features unchanged.

Alternative: vendor snapshots with update tooling. Rejected: adds duplicate authority and drift. Trade-off: first shared package install requires GitHub access; exact commit and cached package support rollback/offline reuse.

## Acceptance

1. Canonical package exposes all maintained skills; local references resolve without personal paths; project-init and server-operations available.
2. Shared preview supports managed and npm Pi; optional diagram engine remains optional.
3. Skill linking supports native shared discovery, never mutates under dry run, preserves conflicts, and has a runnable regression test.
4. Mac retains local editing workflow, no duplicate skill discovery, thin safety/routing guidance, tracked restore sources including existing approved additions; secrets stay private.
5. Server daily profile uses exact shared Git commit; reruns preserve user packages/settings/auth/sessions and retire old managed discovery path without deleting files. Base server-operations available independently of daily profile.
6. Server deployment instructions separate host invariants from procedure. No implicit commits/push in maintenance guidance.
7. Focused Node/Python/shell checks and repository diff checks pass. Published commits and residual runtime/VM limitations reported accurately.

## Dry-run review

Clean server checkout fast-forwarded before edits. Preserve dirty Mac/shared changes. Pin shared source only after its tests and commit succeed; push shared before dependent server commit. Native package manifest avoids new installer. Relative sibling references require package retaining repository layout. Old daily files remain disabled, not deleted. Installer must normalize Git package identity and remove only known legacy discovery path. Runtime-local extensions copied into Mac restore source without moving originals. No need to alter active provider or MCP configuration.

## Verification and rollback

Run shared link regression, preview tests, upstream audit validator tests, Python renderer smoke tests, skill/package reference checks; server setup/gateway tests and shell syntax; Mac Playwright tests, JSON parse, diff checks. Review standards and acceptance separately before push. Rollback source commits and runtime timestamped backups; restore former settings skill path if needed. Never roll back by deleting runtime directories.

## Stage

Shared-source slice verified: link regression passed; 66 Node preview/audit-validator tests passed; both Python renderer smoke tests passed; shell syntax and diff checks passed. Standards review: no upstream audit file edits, no dependency additions, symlink conflicts preserved. Scope review: package manifest includes portable workflows and gateway skills; server and Mac consumer slices remain in progress. Runtime reload, real fresh-VM/mobile/reboot acceptance remain separate manual checks.
