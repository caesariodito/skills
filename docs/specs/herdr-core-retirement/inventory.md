# Legacy Herdr retirement inventory

Initial read-only inventory followed by explicit user authorization to stop/remove legacy Herdr on Mac and all four configured Tailscale hosts. Retirement executed through existing core connections. No core service/app stop or worktree cleanup performed.

## Preserve

- hc, herdr-core, herdr-app and /Applications/Herdr.app (current app belongs to new core).
- Core user units hc-serve-* / hc-hold-*, core sockets/state and SSH machine connections.
- ~/.herdr/worktrees: shared convention used by both generations; inspect each Git worktree and preserve uncommitted/untracked work. Never delete directory wholesale.
- Pi questionnaire extension's core OSC path; existing tests. Shared skill should become core-only, not disappear.

## Local Mac candidates

- Running legacy binary ~/.local/bin/herdr, observed PID 5066. Requires explicit approved shutdown after determining active legacy panes/jobs.
- Legacy state ~/.config/herdr: session.json, session-snapshots, plugins, plugins.json, logs, sockets and locks. Contains private state; archive privately before approved cleanup, never publish contents.
- Pi ~/.pi/agent/extensions/herdr-agent-state.ts (legacy managed reporter).
- Claude ~/.claude/hooks/herdr-agent-state.sh and matching SessionStart hook only; preserve unrelated hooks/settings.
- OpenCode ~/.config/opencode/plugins/herdr-agent-state.js, herdr-tui-session.js, herdr-opencode/tui.js and corresponding entries in cli.json/tui.jsonc. Do not remove unrelated plugins or whole config files. tui.json currently empty plugin list.
- Shared ~/.agents/skills/herdr/SKILL.md legacy section; core reference retained. Consumer arena/review/teach dual-backend wording becomes core-only after approved retirement.
- Pi questionnaire bridge: remove legacy environment/bus branch only, retain core transport and coverage.
- ~/.local/share/herdr-web-ui: multiple remote-v40/v42/v43 directories and running bun under remote-v43 observed. Ownership/dependencies not yet established; inspect exact launcher and protocol before classifying as removable. Do not assume name proves legacy-only.
- No Herdr-named launch-agent file found in inspected user/system LaunchAgents directories. Not proof of no alternate launcher.

## Remote candidates

| Host / user | Legacy binary/state | Live legacy process | Additional setup |
|---|---|---|---|
| id-batikwolter-1 / dito | /home/dito/.local/bin/herdr; /home/dito/.config/herdr | PID 4160551, herdr server | daily-skills/herdr; Pi AGENTS.md hard-requires HERDR_ENV=1; ~/.herdr/worktrees exists; legacy plugins |
| eu-batikwolter-1 / root | /root/.local/bin/herdr; /root/.config/herdr | PID 2321626, herdr server; executable marked deleted | daily-skills/herdr; Pi AGENTS.md hard-requires HERDR_ENV=1; ~/.herdr/worktrees exists |
| dito-asus-laptop / dito | /home/dito/.local/bin/herdr; /home/dito/.config/herdr | PID 1017920, herdr server | daily-skills/herdr; Pi routing guidance; legacy plugins and temporary install remnants |
| budi-asus-laptop / dito | /home/dito/.local/bin/herdr; /home/dito/.config/herdr | PID 2362728, herdr server; executable marked deleted | No Herdr skill found in inspected daily-skills path; bashrc mention is only NVM comment, not launcher |

PIDs are observations, not stable shutdown targets. Revalidate executable/ownership before any authorized action. Deleted executable images keep running; deleting binary alone is insufficient. No legacy Herdr-named systemd unit found in inspected current-user/system unit listings and unit paths. Core units present and must remain. Inspect process ancestry/launcher and active legacy jobs before shutdown. Non-login hc exec PATH omitted ~/.local/bin on these hosts: initial command lookup null did not mean binaries absent; explicit paths verified.

Remote ~/.pi/agent/extensions contains 9router-models.ts and some backups, no legacy Herdr state reporter in inspected directories. Do not remove 9Router files. Other users, containers, alternate XDG paths and uninspected service managers are not covered.

## Safe retirement sequence (approval required)

1. Verify core access independently on every host; validate actual agent question/permission handling and worktree access.
2. Inventory legacy jobs/panes and safely hand off or stop them with explicit approval. Privately preserve required session/config state and Git changes. Do not transfer credential/session files into reports.
3. Stop only confirmed legacy servers through verified legacy session control in approved maintenance scope. Do not use broad process-name kills; never stop core units/app.
4. Remove legacy hook registrations first, then exact managed legacy files and binary. Archive legacy state before deleting it; preserve worktrees.
5. Update owning installer/source plus installed remote skill/routing so future setup cannot reinstall legacy hooks or require HERDR_ENV=1.
6. Verify new sessions use HC_TERMINAL_ID/native OSC, no legacy process/socket/launcher remains, and core machine connections/services survive.

## Startup changes implemented locally

Pi Playwright startup now explicitly selects guest-headless; /playwright remains manual picker/switch command with existing confirmation. Regression asserts zero startup selections and isolated/headless flags; test passed.

herdr-startup skill installed into shared canonical skills and linked into Agent Skills/Claude discovery. Pi/Claude/OpenCode first-task guidance loads it in core context. Task-aware titles preserve human names; new delegated terminals receive --name. Unnamed spaces keep native repo/folder naming. Existing hc 0.1.19 lacks terminal rename API; herdr-app ls omits tab named flag, so uncertain tab ownership is skipped. Skill is best-effort first-task guidance, not executable pre-prompt auto-renaming. No automatic app mutation performed.

## Executed retirement

Verified exact legacy process trees on five hosts: only idle shell children, no active child agents/builds/services. Stopped each legacy server through exact installed legacy CLI. Removed active binary ~/.local/bin/herdr and ~/.config/herdr into private quarantine; retained verified private tar archives. Remote archive/quarantine suffix 20261108T181953Z under user ~/backups/herdr-legacy-retired-*; Mac suffix 20261108T182038Z. Archives mode 0600, directories 0700. Deleted executable images also stopped. No process-name broad kill used.

Local managed Pi legacy reporter, Claude hook and OpenCode legacy plugin files quarantined. Removed matching Claude SessionStart registration and exact OpenCode cli.json/tui.jsonc plugin entries; JSON parsed successfully. Shared installed Herdr skill and arena/review/teach changed core-only. Remote installed daily-skills/herdr and HERDR_ENV-required Pi routing updated in place; originals archived. Pi questionnaire extension removed legacy transport; tests now standalone core-only, no dependency on removed reporter. No remote startup/browser rollout performed.

Verification: zero legacy herdr processes on all five hosts; active binary/config absent; remote core binaries and processes remain (id=4, eu=3, dito=6, budi=2 at check). All four hc machine connections remain connected. Worktrees preserved; budi had no ~/.herdr/worktrees before removal. Mac current Herdr app and core preserved.

herdr-web-ui retained: inspected server/shared source explicitly supports herdr-core and legacy runtime migration; not legacy-only artifact. Do not delete based on directory name. No legacy launcher match found in inspected local shell/LaunchAgents paths; other-user/alternate-XDG/package installer sources not exhaustively inspected.

Checks: Playwright/core-questionnaire regressions, workflow contracts (19 skills), skills-sync regression and whitespace checks passed. One contract assertion initially failed due to lowercase/uppercase wording; fixed expected common phrase and reran successfully. Two remote archive+stop calls exceeded initial tool deadline; state re-inspected before retrying stop, verified stopped before quarantining. No new independent reviewer authorized for retirement follow-up; independent-review gate remains pending, not claimed complete. Existing user changes preserved; no commits.
