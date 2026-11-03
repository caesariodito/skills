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
| architect / arena | Usage/data/ownership-first design and meaningful alternatives before spec; optional explicitly authorized Herdr candidates |
| teach / unslop | Progressive human understanding and concrete prose, preserving evidence and user tone |
| engineering-lifecycle | Canonical decisions/approval, implementation verification and completion gates |
| independent-review | One authorized fresh Herdr reviewer after consequential implementation, bounded fixes/rechecks; Cloudflare guidance, not full audit |

Exploration permits scoped scratch sketches and safe local experiments without repeated questions, never implicit production edits, dependencies, external writes or delegation. Required review needs explicit task grant; no recursive reviewer. Missing independent reviewer blocks completion unless user explicitly waives gate. Native generative UI is optional and local-interaction-only; accepted decisions return to canonical spec.

Adapted skills retain MIT license/provenance from pstack commit ae5650febf4320793844c12c4adaa937f417f8da. No upstream plugin, Cursor tool/model dependencies or automatic review panels installed.

## Provenance

- project-init and gateway skills migrated from personal dotfiles revision `444a91a3fa2c1c39d4533fc9b2ac91cde0e7f6f3`; gateway capability text originates from decolua/9router. Review upstream updates rather than replacing local adaptations blindly.
- server-operations extracts existing personal deployment reference from pi-server-agents `833318e9edbb0fe4bee5f208e3b0dce2d35e9296`, with conditional host applicability and secret-safe validation.
- security-audit retains pinned Cloudflare source, MIT license, and local provenance in security-audit/UPSTREAM.md. Installation does not provision independent agents or required OS sandbox controls.
- emil-design-eng retains bundled license. Herdr remains upstream-managed rather than redistributing an unversioned local snapshot.

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
