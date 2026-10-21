# Skills

Canonical agent skills shared by Claude Code and Pi. Each skill is a directory with a `SKILL.md`.

## How both harnesses see one copy

- Pi reads this folder through `"skills": ["~/.dotfiles/skills"]` in `~/.pi/agent/settings.json`.
- Claude Code reads only `~/.claude/skills`, so each skill here has a symlink there.
- Edits from either harness change these files directly. Commit them here.

Reference bundled files relative to the skill directory. Do not hardcode `~/.claude/skills` or `~/.pi/agent/skills`; write `<skill-dir>/scripts/...` and say that `<skill-dir>` is the directory containing the SKILL.md.

## skills-sync

```sh
bin/skills-sync                # link skills into ~/.claude/skills, prune dead links, list unshared skills
bin/skills-sync adopt NAME     # move a skill created in ~/.claude/skills or ~/.pi/agent/skills here
bin/skills-sync adopt --all    # adopt every unshared harness-local skill
bin/skills-sync -n ...         # dry run
```

Run it after creating a skill in either harness. A skill that exists in both harnesses or already exists here is reported as a conflict and left for a manual merge.

## Restore on a new machine

```sh
git clone <skills-repo-url> ~/.dotfiles/skills
~/.dotfiles/skills/bin/skills-sync
```
