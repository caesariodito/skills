export const MAX_BYTES = 262144;
const object = v => v && typeof v === 'object' && !Array.isArray(v);
function text(v, name, max = 16000) {
  if (typeof v !== 'string' || !v.trim() || v.length > max) throw Error(`Invalid ${name}`);
  return v;
}
function list(v, name, max) {
  if (!Array.isArray(v) || !v.length || v.length > max) throw Error(`Invalid ${name}`);
  return v;
}
function identified(items, name, max) {
  const seen = new Set();
  return list(items, name, max).map(v => {
    if (!object(v) || typeof v.id !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(v.id) || seen.has(v.id)) throw Error(`Invalid/duplicate ${name} ID`);
    seen.add(v.id);
    text(v.title, `${name} title`, 200);
    return v;
  });
}
function markdown(v, name) {
  text(v, name);
  if (v.includes('![') || /<\/?[a-zA-Z!]/.test(v)) throw Error(`${name}: images and raw HTML are not supported`);
}
export function parse(raw) {
  if (typeof raw !== 'string' || raw.length > MAX_BYTES) throw Error('Explanation exceeds 256 KiB');
  let bytes = 0;
  for (const char of raw) {
    const code = char.codePointAt(0);
    bytes += code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4;
    if (bytes > MAX_BYTES) throw Error('Explanation exceeds 256 KiB');
  }
  const d = JSON.parse(raw);
  if (!object(d) || d.version !== 1) throw Error('Unsupported explanation version');
  text(d.title, 'title', 200); text(d.spec, 'spec path', 4096); text(d.source_version, 'source version', 200);
  d.sections = identified(d.sections, 'section', 40).map(s => {
    markdown(s.body, 'section body');
    if (s.details !== undefined) markdown(s.details, 'details');
    return {...s, scenarios: identified(s.scenarios, 'scenario', 20).map(v => {
      markdown(v.body, 'scenario body');
      if (v.diagram !== undefined) validateDiagram(v.diagram);
      return v;
    })};
  });
  return d;
}
function validateDiagram(d) {
  if (!object(d)) throw Error('Invalid diagram');
  text(d.alt, 'diagram text equivalent');
  for (const k of ['width', 'height']) if (!Number.isInteger(d[k]) || d[k] < 100 || d[k] > 2400) throw Error(`Invalid diagram ${k}`);
  const nodes = identified(d.nodes, 'node', 30);
  for (const n of nodes) {
    if (n.title.length > 48) throw Error('Node title exceeds 48 characters');
    for (const k of ['x', 'y']) if (!Number.isInteger(n[k]) || n[k] < 0 || n[k] > d[k === 'x' ? 'width' : 'height'] - (k === 'x' ? 180 : 56)) throw Error('Node outside diagram');
  }
  if (!Array.isArray(d.edges) || d.edges.length > 60) throw Error('Invalid edges');
  const ids = new Set(nodes.map(n => n.id));
  for (const e of d.edges) {
    if (!object(e) || !ids.has(e.from) || !ids.has(e.to)) throw Error('Invalid edge endpoint');
    if (e.label !== undefined) text(e.label, 'edge label', 80);
  }
}
const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export function svg(d) {
  validateDiagram(d);
  const nodes = new Map(d.nodes.map(n => [n.id, n]));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${d.width}" height="${d.height}" viewBox="0 0 ${d.width} ${d.height}"><rect width="100%" height="100%" fill="#17202b"/><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#afc3d9"/></marker></defs>${d.edges.map(e => {
    const a = nodes.get(e.from), b = nodes.get(e.to);
    const x1 = a.x + 90, y1 = a.y + 56, x2 = b.x + 90, y2 = b.y;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#afc3d9" stroke-width="2" marker-end="url(#arrow)"/>${e.label ? `<text x="${(x1+x2)/2+8}" y="${(y1+y2)/2}" fill="#e5edf6" font-size="13">${escape(e.label)}</text>` : ''}`;
  }).join('')}${d.nodes.map(n => `<rect x="${n.x}" y="${n.y}" width="180" height="56" rx="8" fill="#293e55" stroke="#9db7d3"/><text x="${n.x+90}" y="${n.y+33}" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="13">${escape(n.title)}</text>`).join('')}</svg>`;
}
export function selection(d, section, scenario) {
  const s = d.sections.find(v => v.id === section) ?? d.sections[0];
  const v = s.scenarios.find(v => v.id === scenario) ?? s.scenarios[0];
  return {section: s.id, scenario: v.id};
}
