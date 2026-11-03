import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, lstatSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const root = mkdtempSync(join(tmpdir(), 'skills-sync-'));
const home = join(root, 'home'), canon = join(root, 'source');
const run = (...args) => spawnSync('bash', [resolve(import.meta.dirname, 'skills-sync'), ...args], { env: { PATH: process.env.PATH, HOME: home, SKILLS_HOME: canon }, encoding: 'utf8' });
try {
  mkdirSync(home); mkdirSync(join(canon, 'example'), { recursive: true });
  writeFileSync(join(canon, 'example/SKILL.md'), 'example');
  assert.equal(run('-n').status, 0);
  assert.deepEqual(readdirSync(home), []);
  assert.equal(run().status, 0);
  assert.equal(run().status, 0);
  assert.ok(lstatSync(join(home, '.agents/skills/example')).isSymbolicLink());
  rmSync(join(home, '.claude/skills/example'));
  mkdirSync(join(home, '.claude/skills/example'));
  writeFileSync(join(home, '.claude/skills/example/private'), 'keep');
  assert.equal(run().status, 1);
  assert.equal(readFileSync(join(home, '.claude/skills/example/private'), 'utf8'), 'keep');
  symlinkSync(join(canon, 'removed'), join(home, '.agents/skills/removed'));
  assert.equal(run('-n').status, 1);
  assert.ok(lstatSync(join(home, '.agents/skills/removed')).isSymbolicLink());
  assert.equal(run().status, 1);
  assert.ok(!readdirSync(join(home, '.agents/skills')).includes('removed'));
  assert.equal(run('adopt', '--all').status, 2);
  console.log('skills-sync checks passed');
} finally { rmSync(root, { recursive: true, force: true }); }
