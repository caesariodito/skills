---
name: anti-slop-init
description: Install anti-slop in current repository's project-local Pi scope.
disable-model-invocation: true
---

# Initialize anti-slop

Install anti-slop only for current Git repository.

1. Resolve repository root with `git rev-parse --show-toplevel`. Stop if current directory is outside a Git repository.
2. From repository root, run `pi list` and inspect `.pi/settings.json` when present.
3. If `git:github.com/miqdadbadjuber/anti-slop` is already project-local, report it and make no change. If only a global installation exists, explain that local installation is redundant and ask whether to continue.
4. Tell user that Pi will load third-party project code and request confirmation before granting project trust or installing. On approval, run from repository root:

   ```bash
   pi install -l git:github.com/miqdadbadjuber/anti-slop
   ```

   Let Pi request trust interactively. Use `--approve` only when user explicitly asks to grant trust non-interactively.
5. Verify `.pi/settings.json` contains package source and `pi list` reports it under project packages. Check `git status --short` so user sees changed project files.
6. Report repository root, changed files, and need to start new Pi session or run `/reload`.

Complete when package is listed at project scope without unresolved install errors.
