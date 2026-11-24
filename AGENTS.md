# Skills repository guidance

- This repository owns portable agent workflows. Machine facts and credentials belong in host guidance, not reusable skills.
- Each skill lives in `<name>/SKILL.md` with matching lowercase-hyphen name and a description that states when to load it.
- Register new packaged skills in `package.json` under `pi.skills`. Local `bin/skills-sync` discovers directories with SKILL.md separately.
- `pi/AGENTS.md` owns global safety and short routing; detailed procedures belong in skills. Relative links are explicit on-demand reads.
- Preserve approval, delegation, credential and recovery boundaries when editing workflow text. Skill installation grants no infrastructure or integration authority.
- Follow README.md ownership and provenance rules. Do not copy runtime auth, sessions, browser profiles or server secrets into this repository.

## Checks

For skill, routing or discovery changes:

```sh
node bin/workflow-check.mjs
node bin/skills-sync.test.mjs
git diff --check
```

Run relevant script tests listed in README.md when their implementation changes. Do not install renderer dependencies merely to edit guidance.
