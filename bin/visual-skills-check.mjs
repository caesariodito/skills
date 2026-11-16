// Run: node bin/visual-skills-check.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const visual = read('visual/SKILL.md');
assert.match(visual, /^name: visual$/m);
assert.match(visual, /^disable-model-invocation: true$/m);
for (const rule of ['shared Visualizer delivery rules', '**Explain:**', '**Plan:**', '**Recap:**', 'No MDX', 'No automatic agents', 'App launch success is not rendering proof', 'spec.md']) assert.ok(visual.includes(rule), rule);
const teach = read('teach/SKILL.md');
assert.ok(teach.includes('../visual/references/visualizer.md'));
assert.ok(teach.includes('Teach owns explanation structure; visual owns rendering'));
const delivery = read('visual/references/visualizer.md');
for (const rule of ['Visualizer.app', 'CFBundleName=Visualizer', 'open -n -a', '--args', '256 KiB', '## Local PNG screenshots and galleries', '## Diagram colors by default', 'without color', 'subgraph legend ["Legend"]']) assert.ok(delivery.includes(rule), rule);
const manifest = JSON.parse(read('package.json'));
assert.ok(manifest.pi.skills.includes('./visual'));
for (const name of ['visual-plan', 'visual-recap', 'implementation-plan']) {
  assert.ok(!existsSync(new URL(`../${name}/SKILL.md`, import.meta.url)), `retired skill: ${name}`);
  assert.ok(!manifest.pi.skills.includes(`./${name}`));
}
console.log('Unified visual/teach routing, renderer boundaries and retired entrypoints: PASS');
