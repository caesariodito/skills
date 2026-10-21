/* decision-sheet runtime — no dependencies, works from file://
   Contract with the generated markup:
     [data-item]                 one decision card, attribute is the stable ID
     [data-item] .title          card title, used in the export
     label.opt input[type=radio] one option; name === the card ID
     label.opt .opt-title        option label, used in the export
     label.opt .mine             marks the recommended option
     select[data-rule]           one-line rule row; attribute is the stable ID
     .rule .txt                  rule text, first text node is the rule itself
     textarea[data-other]        free text for the "something else" answer of that ID
     #notes                      free text that belongs to no single item
   Answers live in localStorage under KEY and never leave the browser. */

const OTHER = '__other';
const state = load();

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

function otherBox(id) {
  return document.querySelector(`textarea[data-other="${CSS.escape(id)}"]`);
}

function syncOther(id, focus) {
  const box = otherBox(id);
  if (!box) return;
  const on = state[id] === OTHER;
  box.hidden = !on;
  if (on && focus) box.focus();
}

for (const input of document.querySelectorAll('input[type=radio]')) {
  if (state[input.name] === input.value) input.checked = true;
  input.addEventListener('change', () => {
    state[input.name] = input.value;
    save(state);
    syncOther(input.name, true);
    render();
  });
}

for (const sel of document.querySelectorAll('select[data-rule]')) {
  const id = sel.getAttribute('data-rule');
  if (state[id]) sel.value = state[id];
  sel.addEventListener('change', () => {
    state[id] = sel.value;
    save(state);
    syncOther(id, true);
    render();
  });
}

for (const box of document.querySelectorAll('textarea[data-other]')) {
  const id = box.getAttribute('data-other');
  if (state[id + ':other']) box.value = state[id + ':other'];
  syncOther(id, false);
  box.addEventListener('input', () => { state[id + ':other'] = box.value; save(state); render(); });
}

const notes = document.getElementById('notes');
if (notes) {
  if (state.__notes) notes.value = state.__notes;
  notes.addEventListener('input', () => { state.__notes = notes.value; save(state); render(); });
}

function recOf(el) {
  for (const o of el.querySelectorAll('input[type=radio]'))
    if (o.closest('label').querySelector('.mine')) return o;
  return null;
}

function acceptAll() {
  for (const card of document.querySelectorAll('[data-item]')) {
    const rec = recOf(card);
    if (rec) { rec.checked = true; state[rec.name] = rec.value; syncOther(rec.name, false); }
  }
  for (const sel of document.querySelectorAll('select[data-rule]')) {
    const id = sel.getAttribute('data-rule');
    for (const o of sel.options)
      if (o.textContent.includes('my answer')) { sel.value = o.value; state[id] = o.value; syncOther(id, false); }
  }
  save(state);
  render();
}

function labelOf(input) {
  return input.closest('label').querySelector('.opt-title').textContent.replace('my answer', '').trim();
}

/* One line per answer. An OTHER pick reports the typed text, or asks to talk. */
function answerOf(id, value, label) {
  if (!value) return '(no answer)';
  if (value !== OTHER) return label;
  const typed = (state[id + ':other'] || '').trim();
  return typed ? 'OTHER — ' + typed.replace(/\n+/g, ' / ') : 'OTHER — will explain in chat';
}

function answerText() {
  const lines = [TITLE + ' — answers — ' + new Date().toISOString().slice(0, 10), ''];
  let unanswered = 0;
  let discuss = 0;

  for (const card of document.querySelectorAll('[data-item]')) {
    if (!card.querySelector('input[type=radio]')) continue;
    const id = card.getAttribute('data-item');
    const titleEl = card.querySelector('.title');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const picked = card.querySelector('input[type=radio]:checked');
    if (!picked) unanswered++;
    else if (picked.value === OTHER && !(state[id + ':other'] || '').trim()) discuss++;
    lines.push(`${id} — ${title}\n    ${answerOf(id, picked && picked.value, picked ? labelOf(picked) : '')}`);
  }

  const rules = document.querySelectorAll('select[data-rule]');
  if (rules.length) {
    lines.push('', 'One-line rows:');
    for (const sel of rules) {
      const id = sel.getAttribute('data-rule');
      const row = sel.closest('.rule');
      const txt = row ? row.querySelector('.txt').childNodes[0].textContent.trim() : '';
      const chosen = sel.selectedOptions[0];
      const value = chosen ? chosen.value : '';
      if (!value) unanswered++;
      else if (value === OTHER && !(state[id + ':other'] || '').trim()) discuss++;
      const label = chosen ? chosen.textContent.replace('— my answer', '').trim() : '';
      lines.push(`    ${id}: ${answerOf(id, value, label)}  — ${txt.slice(0, 60)}${txt.length > 60 ? '…' : ''}`);
    }
  }

  const free = (state.__notes || '').trim();
  if (free) lines.push('', 'Not asked about:', free);
  if (unanswered) lines.push('', `${unanswered} item(s) still unanswered.`);
  if (discuss) lines.push(`${discuss} item(s) marked OTHER with no text — discuss in chat.`);
  return lines.join('\n');
}

function render() {
  const out = document.getElementById('out');
  if (out) out.value = answerText();
}

function collect() {
  render();
  const out = document.getElementById('out');
  out.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch {}
  if (!ok && navigator.clipboard) navigator.clipboard.writeText(out.value).catch(() => {});
  flash('Copied. Paste it back into the session.');
}

function download() {
  render();
  const blob = new Blob([answerText()], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  flash('Saved ' + FILENAME + ' — tell me where you put it and I will read it.');
}

function flash(msg) {
  const el = document.getElementById('flash');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(flash.t);
  flash.t = setTimeout(() => { el.hidden = true; }, 4000);
}

function clearAll() {
  for (const k of Object.keys(state)) delete state[k];
  save(state);
  for (const i of document.querySelectorAll('input[type=radio]')) i.checked = false;
  for (const s of document.querySelectorAll('select[data-rule]')) s.value = '';
  for (const b of document.querySelectorAll('textarea[data-other]')) { b.value = ''; b.hidden = true; }
  if (notes) notes.value = '';
  render();
}

function toggleTheme() {
  const r = document.documentElement;
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  const cur = r.getAttribute('data-theme') || (dark ? 'dark' : 'light');
  r.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
}

render();
