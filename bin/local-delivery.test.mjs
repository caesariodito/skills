import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const global = read('pi/AGENTS.md');
const lifecycle = read('engineering-lifecycle/SKILL.md');
const policy = read('pi/references/local-delivery.md');

assert.match(global, /\[automatic local delivery\]\(references\/local-delivery\.md\)/);
assert.match(global, /standing authorization/);
assert.match(lifecycle, /\[automatic local delivery\]\(\.\.\/pi\/references\/local-delivery\.md\)/);
assert.match(lifecycle, /Commit only under automatic local-delivery authority/);
for (const phrase of [
  'Read-only requests create no worktree or commit',
  'Explicit task restrictions override this default',
  'Preserve existing dirty work and index exactly',
  'Worktrees do not inherit dirt',
  'git check-ref-format --branch',
  'Failed required checks, unresolved blockers or missing required review stop delivery',
  'Stage explicit task-owned paths only',
  'never bypass failures',
  'verify committed content matches the verified/reviewed snapshot',
  'never create an empty commit',
  'Never automatically push, merge, integrate, delete branches or remove worktrees',
  'not an executable Git hook',
]) assert.ok(policy.includes(phrase), phrase);
assert.ok(policy.indexOf('## Start') < policy.indexOf('## Finish'));
console.log('Automatic local-delivery policy contracts: PASS');
