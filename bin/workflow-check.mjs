import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const manifest = JSON.parse(read('package.json'));
const required = ['unslop', 'teach', 'architect', 'arena', 'independent-review', 'engineering-lifecycle', 'grill-me', 'handoff'];
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
for (const name of ['grill-me', 'handoff']) {
  const text = read(`${name}/SKILL.md`);
  assert.match(text, /^disable-model-invocation: true$/m);
  assert.match(read(`${name}/LICENSE`), /Copyright \(c\) 2026 Matt Pocock/);
  assert.match(read(`${name}/UPSTREAM.md`), /4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/);
  assert.doesNotMatch(text, /Call the Skill tool|dispatch a sub-agent/);
  checkLinks(`${name}/UPSTREAM.md`);
}
const grill = read('grill-me/SKILL.md');
for (const phrase of ['ask_user_question', '1–4', '2–4', 'Do not stack', 'read-only', 'No sub-agent dispatch', 'No files by default', 'materially risky']) assert.ok(grill.includes(phrase), phrase);
const handoff = read('handoff/SKILL.md');
for (const phrase of ['temporary directory', 'unique file', 'restrictive permissions', 'Redact secrets', 'suggested skills', 'grants no new authority']) assert.ok(handoff.includes(phrase), phrase);
const lifecycle = read('engineering-lifecycle/SKILL.md');
function ordered(text, first, next) {
  const start = text.indexOf(first), end = text.indexOf(next);
  assert.ok(start >= 0 && end >= 0 && start < end, `${first} must exist before ${next}`);
}
for (const [first, next] of [['| Explore |', '| Specify |'], ['| Build and verify |', '| Independent review |']]) {
  ordered(lifecycle, first, next);
  assert.throws(() => ordered(lifecycle.replace(first, ''), first, next));
  assert.throws(() => ordered(lifecycle.replace(next, ''), first, next));
}
assert.match(lifecycle, /Required reviewer spawning has standing global authorization/);
assert.match(lifecycle, /Reviewer role itself never triggers another reviewer/);
const review = read('independent-review/SKILL.md');
for (const phrase of ['guidance mode','Herdr worktree separation is not sandbox','at most two','explicit waiver','read-only','Needs validation']) assert.ok(review.includes(phrase), phrase);
for (const name of ['Intent','Security','Simplicity','Sufficiency','Project direction']) assert.ok(review.includes(`| ${name} |`));
for (const path of ['arena/SKILL.md', 'independent-review/SKILL.md']) {
  const text = read(path);
  for (const phrase of ['HC_TERMINAL_ID', 'native Git worktrees', 'Herdr retired']) assert.ok(text.includes(phrase), `${path}: ${phrase}`);
  assert.doesNotMatch(text, /require HERDR_ENV=1|Require HERDR_ENV=1/);
}
assert.match(read('teach/SKILL.md'), /Work directly; no visualization child session/);
assert.match(read('teach/SKILL.md'), /references\/visualizer\.md/);
if (process.env.HERDR_SKILL_DIR) {
  const skill = readFileSync(resolve(process.env.HERDR_SKILL_DIR, 'SKILL.md'), 'utf8');
  const core = readFileSync(resolve(process.env.HERDR_SKILL_DIR, 'references/core.md'), 'utf8');
  for (const phrase of ['HC_TERMINAL_ID', 'references/core.md', 'Legacy Herdr retired', 'never launch/install legacy Herdr']) assert.ok(skill.includes(phrase), phrase);
  for (const phrase of ['--outlive-parent', 'first_message.sent', 'seconds', 'separate Git worktree', '--force', 'never invent `hc worktree`', 'An absent status is not readiness', 'No success inferred from idle/done alone']) assert.ok(core.includes(phrase), phrase);
  console.log('Installed core-only Herdr skill contracts: PASS');
}
const policy = read('pi/AGENTS.md');
for (const phrase of ['Related work needed to finish the task is authorized', 'Bounded Herdr delegation has standing authorization', 'full source-only audits', 'Active security testing requires explicit target authorization', 'Reviewer spawning has standing authorization', 'report path and rules added', 'Report blockers immediately']) assert.ok(policy.includes(phrase), phrase);
for (const phrase of ['destructive operations', 'irreversible migrations', 'public API breaks', 'new dependencies', 'deployments', 'exposure/auth changes', 'history rewrites and cleanup still require separate explicit authorization', 'everyday Chrome needs explicit live-mode choice']) assert.ok(policy.includes(phrase), phrase);
for (const path of ['pi/AGENTS.md', 'engineering-lifecycle/SKILL.md', 'independent-review/SKILL.md', 'arena/SKILL.md', 'project-init/SKILL.md']) assert.doesNotMatch(read(path), /Ask before expanding scope|ask before scope expansion|does not authorize reviewer spawning|create only with approval|Do not create or replace repository guidance without approval|Herdr candidates need explicit grant/);
assert.match(read('project-init/SKILL.md'), /Preserve existing guidance/);
assert.match(read('security-audit/SKILL.md'), /Active security testing requires explicit target authorization and all execution controls/);
assert.match(read('pi/AGENTS.md'), /not automatic includes/);
assert.match(read('pi/AGENTS.md'), /canonical source directory/);
console.log(`Workflow contracts, provenance and ${manifest.pi.skills.length} skill entrypoints: PASS`);
