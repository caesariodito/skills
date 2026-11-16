# Skills

Canonical portable workflows for Pi, Claude Code, and Agent Skills-compatible tools. Each skill owns its procedure; global AGENTS.md keeps safety, approvals, and short routing rules. Machine configuration belongs in [.dotfiles](https://github.com/caesariodito/.dotfiles); server installation belongs in [pi-server-agents](https://github.com/caesariodito/pi-server-agents). Legacy GitHub `.pi` repository is not required. Local `~/.pi` remains Pi runtime state.

## Global Pi guidance

`pi/AGENTS.md` owns portable always-on safety and table-based workflow routing. Detailed harness operations live in `pi/references/operations.md`, read explicitly on demand. Resolve relative modules from canonical source after following runtime AGENTS.md symlink; Markdown links are not automatic includes. Machine-specific paths and operations belong in host `~/AGENTS.md`, not this shared file. Pi package installation does **not** activate AGENTS.md automatically. For local authoring, review existing destination before creating link:

```sh
mkdir -p ~/.pi/agent
ln -s /absolute/path/to/skills/pi/AGENTS.md ~/.pi/agent/AGENTS.md
```

Use configured `PI_CODING_AGENT_DIR` instead when applicable. Do not overwrite an existing file/link blindly. Restart Pi or `/reload` afterward. Server installer keeps its server-specific runtime baseline; this opt-in link does not replace host policy automatically.

## Pi installation

Review source, then install an exact reviewed commit:

```sh
pi install git:github.com/caesariodito/skills@<reviewed-commit>
```

`package.json` explicitly exposes skills without installing optional renderer dependencies. Use Pi package resource filters to select skills. Server installer pins its selected subset; update that pin only after reviewing source changes.

## Local authoring / other harnesses

```sh
git clone https://github.com/caesariodito/skills ~/.local/share/agent-skills
~/.local/share/agent-skills/bin/skills-sync -n
~/.local/share/agent-skills/bin/skills-sync
```

Existing `~/.dotfiles/skills` checkout remains supported; script derives canonical root from its own location. `SKILLS_HOME` overrides it. Links go into `~/.agents/skills` and `~/.claude/skills`. Pi discovers the former natively; remove redundant explicit `settings.skills` entry before switching. Do not install the same skills through both Git package and local links.

Conflicting real directories or foreign links are preserved and reported with nonzero exit status. Merge explicitly; automatic `adopt` moves are no longer supported. Dry run performs no writes. Dead links are pruned only when they point into canonical root. Upstream skills such as Herdr/find-skills/REA stay independently installed; do not adopt them blindly.

References use skill-relative paths. `<skill-dir>` means directory containing SKILL.md; sibling skills must be installed together when referenced. Optional review commands use `<implementation-review-dir>` / `<technical-spec-dir>` from advertised skill locations. Preview supports managed Pi and npm Pi; Python 3 needed for builders. Mermaid optional: review lockfile, then explicitly run `npm ci --ignore-scripts` inside technical-spec. No automatic dependency installation.

## Exploration and review

| Skill | Owns |
|---|---|
| grill-me | Explicit, read-only decision interview using dependency-aware structured rounds; no automatic specs or implementation |
| handoff | Explicit portable session brief in a private temporary file; preserves evidence and approval boundaries, launches no agents |
| architect / arena | Usage/data/ownership-first design and meaningful alternatives before spec; optional explicitly authorized Herdr candidates |
| teach / unslop | Progressive human understanding and concrete prose, preserving evidence and user tone |
| visual | Single `/visual` workflow for explanations, plans and diff recaps in native Visualizer; `/teach` shares its renderer rules |
| engineering-lifecycle | Canonical decisions/approval, implementation verification and completion gates |
| independent-review | One authorized fresh Herdr reviewer after materially risky implementation, bounded fixes/rechecks; Cloudflare guidance, not full audit |
| observability | Separate advisory companion alongside every lifecycle implementation review; incident diagnosis, pkg-logging/Sentry/LGTM coverage, optional Monoscope and evidence-based capacity advice |

Exploration permits scoped scratch sketches and safe local experiments without repeated questions, never implicit production edits, dependencies, external writes or delegation. Required implementation review and bounded delegation use standing global authority; no recursive reviewer. Lifecycle parent also launches a separate advisory observability agent against the same snapshot; its findings or unavailability do not block delivery. Missing independent reviewer blocks completion unless user explicitly waives gate. Visual and teach use local Markdown/SVG/Mermaid in installed Visualizer; accepted decisions return to canonical spec. Use `/visual`, `/visual plan ...`, `/visual recap ...` or `/teach`. Former visual-plan, visual-recap and implementation-plan skills/commands are removed.

Adapted skills retain MIT license/provenance from pstack commit ae5650febf4320793844c12c4adaa937f417f8da. No upstream plugin, Cursor tool/model dependencies or automatic review panels installed.

## Provenance

- project-init and gateway skills migrated from personal dotfiles revision `444a91a3fa2c1c39d4533fc9b2ac91cde0e7f6f3`; gateway capability text originates from decolua/9router. Review upstream updates rather than replacing local adaptations blindly.
- server-operations extracts existing personal deployment reference from pi-server-agents `833318e9edbb0fe4bee5f208e3b0dce2d35e9296`, with conditional host applicability and secret-safe validation.
- security-audit retains pinned Cloudflare source, MIT license, and local provenance in security-audit/UPSTREAM.md. Installation does not provision independent agents or required OS sandbox controls.
- emil-design-eng retains bundled license. Herdr remains upstream-managed rather than redistributing an unversioned local snapshot.

Use `/skill:grill-me <idea>` or `/skill:handoff <next task>` in Pi; `/grill-me` or `/handoff` in harnesses with skill slash commands. Reload after installation. Both retain pinned Matt Pocock source and MIT attribution in their own `UPSTREAM.md` and `LICENSE` files.

## Checks

```sh
node bin/workflow-check.mjs
node bin/skills-sync.test.mjs
node --test implementation-review/scripts/preview.test.mjs security-audit/*.test.cjs
python3 implementation-review/scripts/smoke_test.py
python3 technical-spec/scripts/smoke_test.py
bash -n bin/skills-sync
git diff --check
```
