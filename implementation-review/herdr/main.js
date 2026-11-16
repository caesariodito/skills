import { View, div, image } from 'gpui-kit';
import { v_flex, h_flex, TextView } from 'gpui-base';
import { props, theme, readTextFile, appHome, nextCommand } from 'herdr';
import { mkdir, writeFile } from 'fs/promises';
import { parse, svg, selection } from './model.mjs';

export default class Explainer extends View {
  init(_props, cx) {
    this.handle = cx.focus_handle();
    this.file = props()?.file;
    this.error = ''; this.document = null; this.raw = null; this.details = false;
    this.selected = {}; this.images = {}; this.width = 700; this.busy = false;
    this.cache = `data/spec-explainer/${Date.now()}-${Math.random().toString(36).slice(2)}`;
    // ponytail: local documents only; add remote reads when a real remote review needs them.
    this.reload(cx);
    cx.timer.every(3000, cx => this.reload(cx));
    cx.spawn(async cx => {
      for (;;) {
        const command = await nextCommand();
        if (command === 'focus') this.handle.focus();
        if (command === 'refresh') { this.raw = null; this.reload(cx); }
      }
    });
  }

  reload(cx) {
    if (this.busy) return;
    this.busy = true;
    cx.spawn(async cx => {
      try {
        if (typeof this.file !== 'string' || !this.file.startsWith('/') || this.file.includes('\0')) throw Error('Pass an absolute local explanation JSON path in props.file');
        const raw = await readTextFile(this.file);
        if (raw === null) throw Error('Explanation file missing');
        if (raw !== this.raw) {
          const document = parse(raw);
          const images = {};
          const folder = this.cache;
          let cacheError = null;
          if (document.sections.some(s => s.scenarios.some(v => v.diagram))) {
            try { await mkdir(`${appHome()}/${folder}`, {recursive: true}); }
            catch (error) { cacheError = error; }
          }
          // Fixed generated SVG vocabulary: artifact cannot supply paths or executable markup.
          // ponytail: per-copy cache; prune manually after closing its pane, add lifecycle cleanup if disk use warrants it.
          for (const [sectionIndex, section] of document.sections.entries()) for (const [scenarioIndex, scenario] of section.scenarios.entries()) {
            if (!scenario.diagram) continue;
            const path = `${folder}/${sectionIndex}-${scenarioIndex}.svg`;
            try {
              if (cacheError) throw cacheError;
              await writeFile(`${appHome()}/${path}`, svg(scenario.diagram));
              images[`${section.id}/${scenario.id}`] = path;
            } catch (error) {
              images[`${section.id}/${scenario.id}`] = {error: String(error)};
            }
          }
          this.selected = selection(document, this.selected.section, this.selected.scenario);
          this.document = document; this.images = images; this.raw = raw;
        }
        this.error = '';
      } catch (error) { this.error = String(error); }
      finally { this.busy = false; cx.notify(); }
    });
  }

  choose(section, scenario, cx) {
    this.selected = selection(this.document, section, scenario);
    this.details = false; cx.notify();
  }

  key(e, cx) {
    if (!this.document || e.modifiers.control || e.modifiers.platform || e.modifiers.alt) return;
    const sections = this.document.sections;
    const index = sections.findIndex(s => s.id === this.selected.section);
    const scenarios = sections[index].scenarios;
    const scenario = scenarios.findIndex(s => s.id === this.selected.scenario);
    if (e.key === 'up' || e.key === 'down') this.choose(sections[(index + (e.key === 'down' ? 1 : -1) + sections.length) % sections.length].id, null, cx);
    else if (e.key === 'left' || e.key === 'right') this.choose(sections[index].id, scenarios[(scenario + (e.key === 'right' ? 1 : -1) + scenarios.length) % scenarios.length].id, cx);
    else if (e.key === 'd') { this.details = !this.details; cx.notify(); }
    else if (e.key === 'r') { this.raw = null; this.reload(cx); }
    else return;
    cx.stop_propagation();
  }

  render(cx) {
    const t = theme();
    const focused = this.handle.is_focused();
    const button = (id, label, active, action) => div().id(id).role('button').accessibility_label(`${label}${active ? ' (selected)' : ''}`).px(10).py(8).rounded(6)
      .border_1().border_color(active ? t.accent : t.border).bg(active ? t.selected : t.raised)
      .text_color(t.foreground).cursor_pointer().hover(s => s.bg(t.hover)).on_click((_e, cx) => { this.handle.focus(); action(cx); }).child(label);
    const root = v_flex().id('spec-explainer').size_full().min_h(0).gap(12).p(16)
      .bg(t.surface).text_color(t.foreground).text_size(13).border_1().border_color(focused ? t.accent : t.border)
      .track_focus(this.handle).on_mouse_down('left', () => this.handle.focus()).on_key_down((e, cx) => this.key(e, cx))
      .on_size_change((size, cx) => { if (this.width !== size.width) { this.width = size.width; cx.notify(); } });
    root.child(h_flex().gap(8).items_center().child(div().flex_1().text_size(19).font_semibold().child(this.document?.title ?? 'Spec explainer'))
      .child(button('refresh', 'Refresh', false, cx => { this.raw = null; this.reload(cx); })));
    root.child(div().text_color(t.muted).child('Explanation only · approvals stay in browser'));
    if (this.error) root.child(div().text_color(t.blocked).child(`${this.document ? 'Last valid explanation retained. ' : ''}${this.error}`));
    if (!this.document) return root.child(div().child('Waiting for valid explanation data.'));
    const d = this.document;
    const section = d.sections.find(s => s.id === this.selected.section);
    const scenario = section.scenarios.find(s => s.id === this.selected.scenario);
    root.child(div().text_color(t.muted).child(`Source: ${d.spec}\nVersion: ${d.source_version} · regenerate after spec changes`));
    root.child(div().text_color(t.muted).text_size(11).child('Click panel to focus · ↑/↓ phases · ←/→ scenarios · D details · R refresh'));
    const navigation = v_flex().gap(6).children(d.sections.map(s => button(`section-${s.id}`, s.title, s.id === section.id, cx => this.choose(s.id, null, cx))));
    const content = v_flex().min_w(0).gap(12).flex_1()
      .child(div().text_size(17).font_semibold().child(section.title))
      .child(TextView.markdown('section-body', section.body).selectable(true).on_link_click(() => {}))
      .child(v_flex().gap(6).children(section.scenarios.map(s => button(`scenario-${s.id}`, s.title, s.id === scenario.id, cx => this.choose(section.id, s.id, cx)))))
      .child(TextView.markdown('scenario-body', scenario.body).selectable(true).on_link_click(() => {}));
    if (scenario.diagram) {
      const path = this.images[`${section.id}/${scenario.id}`];
      if (typeof path === 'string') {
        const width = Math.max(100, Math.min(scenario.diagram.width, this.width - (this.width >= 700 ? 260 : 40)));
        content.child(image(path).w(width).h(width * scenario.diagram.height / scenario.diagram.width));
      } else content.child(div().text_color(t.blocked).child(`Diagram unavailable. ${path?.error ?? ''}`));
      content.child(div().text_color(t.muted).child(scenario.diagram.alt));
    }
    if (section.details) {
      content.child(button('details', this.details ? 'Hide details' : 'Show details', this.details, cx => { this.details = !this.details; cx.notify(); }));
      if (this.details) content.child(TextView.markdown('section-details', section.details).selectable(true).on_link_click(() => {}));
    }
    const body = this.width >= 700 ? h_flex().items_start().gap(18).child(navigation.w(200)).child(content) : v_flex().gap(16).child(navigation).child(content);
    return root.child(div().id('explanation-scroll').flex_1().min_h(0).overflow_y_scrollbar().child(body));
  }
}
