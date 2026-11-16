// Run: node bin/visual-skills-check.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

for (const name of ['visual-plan', 'visual-recap']) {
  const root = new URL(`../${name}/`, import.meta.url);
  const entry = readFileSync(new URL('SKILL.md', root), 'utf8');
  assert(entry.startsWith(`---\nname: ${name}\n`));
  for (const rule of ['disable-model-invocation: true', 'spec.md']) assert(entry.includes(rule), `${name}: missing ${rule}`);
  const rules = name === 'visual-plan'
    ? ['shared Visualizer delivery rules', 'Work directly', 'No MDX', 'package install or delegation', 'App launch success is not rendering proof']
    : ['explicit bounded Herdr authorization', 'No automatic package installation', 'No hosted plan writes', 'local-files mode as selected', 'hosted JavaScript', '.scratch/<task>'];
  for (const rule of rules) assert(entry.includes(rule), `${name}: missing ${rule}`);
  for (const file of ['LICENSE', 'UPSTREAM.md', 'UPSTREAM-SKILL.md', 'references/local-files.md', 'references/connection.md', 'references/wireframe.md']) {
    assert(existsSync(new URL(file, root)), `${name}: missing ${file}`);
  }
  assert(readFileSync(new URL('UPSTREAM.md', root), 'utf8').includes('f4f10b8d513476c24bd995ceac5294bcdd6ee15c'));
}
console.log('Visual skill entry points, guardrails, references, and provenance: OK');
