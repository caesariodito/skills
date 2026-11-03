# Skills

Canonical portable workflows for Pi, Claude Code, and Agent Skills-compatible tools. Each skill owns its procedure; global AGENTS.md keeps safety, approvals, and short routing rules. Machine configuration belongs in [.dotfiles](https://github.com/caesariodito/.dotfiles); server installation belongs in [pi-server-agents](https://github.com/caesariodito/pi-server-agents). Legacy GitHub `.pi` repository is not required. Local `~/.pi` remains Pi runtime state.

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

## Provenance

- project-init and gateway skills migrated from personal dotfiles revision `444a91a3fa2c1c39d4533fc9b2ac91cde0e7f6f3`; gateway capability text originates from decolua/9router. Review upstream updates rather than replacing local adaptations blindly.
- server-operations extracts existing personal deployment reference from pi-server-agents `833318e9edbb0fe4bee5f208e3b0dce2d35e9296`, with conditional host applicability and secret-safe validation.
- security-audit retains pinned Cloudflare source, MIT license, and local provenance in security-audit/UPSTREAM.md. Installation does not provision independent agents or required OS sandbox controls.
- emil-design-eng retains bundled license. Herdr remains upstream-managed rather than redistributing an unversioned local snapshot.

## Checks

```sh
node bin/skills-sync.test.mjs
node --test implementation-review/scripts/preview.test.mjs security-audit/*.test.cjs
python3 implementation-review/scripts/smoke_test.py
python3 technical-spec/scripts/smoke_test.py
bash -n bin/skills-sync
git diff --check
```
