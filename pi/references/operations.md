# Pi operations routing

Read when configuring/debugging harness, GitHub access, gateway or private runtime recovery. Mandatory safety remains in ../AGENTS.md.

| Concern | Procedure |
|---|---|
| Runtime | ~/.pi/agent or PI_CODING_AGENT_DIR holds private runtime state, not shared workflow source. Host guidance owns local configuration/backup paths. Never publish auth, sessions, browser profiles or MCP credentials. |
| Harness changes | Identify active installation/version; read matching installed README, relevant docs and examples in full before edits. Resolve managed/npm paths from actual install, not hardcoded version or another host. |
| GitHub | Use authenticated gh; read-only unless mutation requested. Verify intended account when permissions differ. Never print tokens or credential-bearing headers. |
| Gateway | Load installed 9router skill. Host operations reference owns local credential source and discovery behavior; never replace credentials from another machine. |
| Browser | Preserve selected mode/profile and existing isolation. Ordinary automation is not permission to attach everyday browser. Host browser operations reference handles configuration. |
| Reload | Restart Pi or /reload after guidance, skill, settings or extension changes. Confirm discovery and relevant integrations afterward. |

Pi package installation does not automatically activate global AGENTS.md or its linked modules. Local setup uses reviewed explicit link; server installer composes its own short runtime guidance. No executable include loader needed.
