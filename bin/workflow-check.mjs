import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const manifest = JSON.parse(read('package.json'));
const required = ['unslop', 'teach', 'architect', 'arena', 'independent-review', 'engineering-lifecycle'];
for (const name of required) assert.ok(manifest.pi.skills.includes(`./${name}`), name);
const checked = new Set();
function checkLinks(path) {
  if (checked.has(path)) return;
  checked.add(path);
  const text = read(path);
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith('/')) continue;
    const absolute = resolve(root, dirname(path), target);
    assert.ok(existsSync(absolute), `${path}: ${target}`);
  }
}
for (const path of manifest.pi.skills) {
  const file = `${path}/SKILL.md`, text = read(file);
  assert.match(text, new RegExp(`^name: ${basename(path)}$`, 'm'));
  assert.match(text, /^description: .+/m);
  checkLinks(file);
}
for (const name of ['unslop', 'teach', 'architect', 'arena']) {
  assert.match(read(`${name}/LICENSE`), /Lauren Tan/);
  assert.match(read(`${name}/UPSTREAM.md`), /ae5650febf4320793844c12c4adaa937f417f8da/);
  assert.doesNotMatch(read(`${name}/SKILL.md`), /~\/\.cursor|subagent_type:|run_in_background:|grok-4|claude-opus-/);
}
for (const path of ['pi/AGENTS.md','pi/references/operations.md','architect/references/design-red-flags.md','architect/references/rationale.md']) checkLinks(path);
const lifecycle = read('engineering-lifecycle/SKILL.md');
assert.ok(lifecycle.indexOf('| Explore |') < lifecycle.indexOf('| Specify |'));
assert.ok(lifecycle.indexOf('| Build and verify |') < lifecycle.indexOf('| Independent review |'));
assert.match(lifecycle, /does not authorize reviewer spawning/);
assert.match(lifecycle, /Reviewer role itself never triggers another reviewer/);
const review = read('independent-review/SKILL.md');
for (const phrase of ['guidance mode','Herdr worktree separation is not sandbox','at most two','explicit waiver','read-only','Needs validation']) assert.ok(review.includes(phrase), phrase);
for (const name of ['Intent','Security','Simplicity','Sufficiency','Project direction']) assert.ok(review.includes(`| ${name} |`));
assert.match(read('pi/AGENTS.md'), /not automatic includes/);
assert.match(read('pi/AGENTS.md'), /canonical source directory/);
console.log(`Workflow contracts, provenance and ${manifest.pi.skills.length} skill entrypoints: PASS`);
