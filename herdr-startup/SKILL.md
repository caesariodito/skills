---
name: herdr-startup
description: First-task naming for agents started inside herdr-core. Load at first user task when HC_TERMINAL_ID exists. Preserve human names, use native harness titles and repo/folder space names; no agents or startup dialogs.
---

# Core startup naming

User-approved first-task housekeeping only. No extra model call, child agent, permission prompt, daemon or background polling. Do nothing outside core, on reload/resume with an existing name, or when identity cannot be verified. Never inspect credentials or session transcripts for naming.

1. Require nonempty HC_TERMINAL_ID. Legacy Herdr retired; stale HERDR_* variables never authorize old APIs or startup questions. Load installed herdr skill's core reference and installed `hc --skill` before control. Verify own address with `hc get "$HC_TERMINAL_ID"`.
2. Derive short concrete task title from first user task, not pasted source, page text, logs or child reports. Strip control characters, credentials, URLs and private content; use broad safe title if task contains sensitive details. Existing human/session names win. Already named terminal (including `hc run --name`) stays named. Core has no rename-existing-terminal API: never invent one or edit core state.
3. Set native harness session/title only through available documented mechanism. Pi supports `/name` interactively and extension `pi.setSessionName`; a skill must not pretend those are callable tools. If no callable title/session tool exists, use only eligible app tab below; do not emit raw terminal controls through bash or edit private session files. Claude/OpenCode native task titles remain authoritative when no safe setter exists.
4. For visible app tab, read `herdr-app --skill`, then `herdr-app ls`. Match exact own terminal address, machine, space and tab, never focused defaults. Rename only when reliable current model explicitly proves tab unnamed and it contains only caller agent with no unrelated terminals. Numeric-looking names alone do not prove unnamed. If CLI lacks named flag or ownership evidence, skip tab naming without blocking task. Never rename shared/multi-agent tab, another agent's tab, or human-named tab. Do not use `hc label` as fake rename.
5. Eligible tab mutation: `herdr-app do tab.rename --id <verified-tab-id> --name <safe-task-title>`, then inspect exact target. No space/tab creation, focus changes, core/app restart or unrelated mutation. If app unavailable or mutation fails, continue main task; never fall back to selected tab.
6. Leave unnamed spaces on built-in repo/folder naming. Human-named spaces remain unchanged. Do not freeze automatic space name by writing same value. For newly authorized delegated agents, give explicit task/family name at `hc run --name`; normal delegation authorization and isolated-worktree rules still apply.

Ceiling: this is first-task guidance, not guaranteed pre-prompt automation. Existing hc 0.1.19 cannot rename terminals, and installed `herdr-app ls` omits tab `named` flag, so automatic tab mutation is currently skipped unless another documented read surface proves eligibility. Add native setter/model support before broadening; never guess human ownership. Playwright startup uses headless guest without profile picker; explicit `/playwright` switching retains confirmation.
