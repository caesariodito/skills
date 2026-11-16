# Dual Herdr migration

## Approval and scope
User approved full dual support, preserving legacy setup, no installs/upgrades/restarts/commits, and one independent reviewer in isolated Git worktree with at most two rechecks. Existing unrelated edits remain untouched. Skills baseline: 6dab3227d7cb7dff0fcbbb0e7f0b2bd54ad0e840. Dotfiles baseline: 9a21069397cfdecf65b30b0323f354d6ec6059bc.

## Decision
Route shared installed Herdr skill by managed context. Legacy HERDR_ENV=1 uses existing herdr instructions. HC_TERMINAL_ID uses hc documentation and isolated Git worktrees (not legacy worktree APIs). Both contexts require explicit user choice before control; neither permits session control. No automatic cross-backend fallback. Window changes use herdr-app only when requested.

Prefer native OSC 7501 over new reporters: installed Pi 1.5.0, Claude Code 2.1.319 and OpenCode 2.2.5 contain native program-status reporting. Pi questionnaire companion already supports both transports. Keep managed legacy v9/v11/v13 files and OpenCode config unchanged. Source/artifact support does not establish live parity.

Update installed skill entrypoint and add core reference without adopting upstream skill into local skills package. Update arena, independent-review and teach references to accept either managed backend while preserving authorization, isolated checkouts, exact snapshots, safe approvals, pull-based handoffs and retention.

## Acceptance
1. Legacy-only context retains existing workflow. Core-only context routes to hc. Ambiguous context asks; missing context stops control.
2. Core child agents use fresh interactive sessions, explicit scope, separate Git worktree, exact baseline/snapshot, no recursive agents, no implicit commits or cleanup.
3. Readiness/first-message failure, blocked/error, timeout and incomplete history never imply success or authorize blind retries.
4. IDs never cross backends/machines. hc timeout units seconds; legacy milliseconds. Core child terminals normally die with parent: preserved review work uses --outlive-parent explicitly.
5. Native status reporters remain authoritative. No duplicate core lifecycle hooks. Pi questionnaire regression remains passing.
6. Independent reviewer inspects exact final migration snapshot including external installed skill changes. Live legacy/core questionnaire and permission parity remain explicit pending checks unless actually observed.

## Verification and rollback
Run workflow contracts, skills-sync regression, Pi questionnaire regression, whitespace checks; retain runnable routing contract check. Record native status evidence, inspect loaded configuration without exposing credentials. Reviewer source-only unless safe checks explicitly assigned. Roll back only migration-specific edits; preserve previous installed skill snapshot and all pre-existing user changes. Reload Pi/restart other agent sessions when convenient; do not restart services.

## Evidence
hc 0.1.19 --help/--skill and herdr-app --help/--skill establish split APIs. Current core terminal reports app=pi,state=working through hc get. Core SHA256 98b0653b40f22028eea6020b6bf3e39ff77e6012286437ca9f8efd24b7ecd758; REA evidence ev_0008e510c8572ddf8ab49657faf9ebbd71016a8ee8beadfc6c37bac4a758de88 confirms OSC parser strings but does not prove full runtime behavior. Installed Claude/OpenCode embedded JavaScript includes OSC capability negotiation and state reporters, including permission/question status; artifact excerpts still need retained checks/evidence.

## Completion
Installed shared Herdr skill now routes legacy/core contexts with explicit ambiguity handling and core reference. Arena, independent-review and teach retain original user edits while using backend-specific worktrees/terminals. Managed legacy integrations and all harness configuration unchanged; native core reporters need no extra hooks.

Author checks passed: workflow-check (including HERDR_SKILL_DIR installed-skill contracts), skills-sync regression, 66 Node preview/security-audit tests, both HTML-builder smoke tests, bash syntax, git diff --check, and Pi questionnaire regression (legacy synthetic socket plus core OSC). First attempted relative check command ran from wrong working directory and failed to locate scripts; rerun from skills root passed. No implementation/test failure remains from that invocation.

Native reporter excerpts with binary hashes retained at ignored .scratch/herdr-dual/native-status-evidence.json. hc get verified current Pi working status. Reviewer t1v (hdm-child-review) started in separate worktree branch from recorded baseline, --outlive-parent; startup browser picker resolved to headless guest with explicit user approval. Exact initial snapshot and manifest retained in .scratch/herdr-dual/snapshot. Reviewer read-only. Initial review found no blocking defect and one nonblocking installed-routing contract coverage gap. Added optional HERDR_SKILL_DIR checks without making external skill mandatory for normal package tests. Recheck round 1 independently verified all eight updated snapshot hashes and live equality, reran default/opt-in checks, closed N1, and accepted final source-level scope. Manifest SHA256 933b07af8a11efc662ec072ac2a7d004390e0e74b03b0e5bc21325e50912b61d; handoff .scratch/herdr-dual/review.md. Supervisor read and acknowledged handoff; no remaining source-review gate. Live parity remains pending.

Live acceptance pending: legacy and core permission/question badge cycles for all three harnesses, including Pi questionnaire after reload. Native reporter presence and synthetic checks are not full live-client parity. No commits, server restarts, installations, core/app layout changes or cleanup performed. Rollback copies of pre-migration skill/workflow files retained in ignored scratch.
