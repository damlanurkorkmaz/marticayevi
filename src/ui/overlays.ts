import type { GameState } from '../types';
import { CHARACTERS, TOWN_ORDER } from '../data/characters';
import { DRINKS, DRINK_ORDER, RECIPES } from '../data/drinks';
import { MAX_BOND } from '../engine/state';
import { PAMUK } from './art';
import { el } from './dom';

function modal(host: HTMLElement, title: string, body: HTMLElement, cls = ''): void {
  const close = () => {
    document.removeEventListener('keydown', onKey);
    wrap.remove();
  };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
  const closeBtn = el('button', { class: 'modal-close', 'aria-label': 'Kapat', onclick: close, html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' });
  const wrap = el('div', { class: `modal ${cls}`, role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
    el('div', { class: 'modal-head' }, el('h2', {}, title), closeBtn),
    body,
  );
  wrap.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', onKey);
  host.append(wrap);
  closeBtn.focus();
}

export function hearts(n: number): string {
  return '♥'.repeat(n) + '♡'.repeat(MAX_BOND - n);
}

export function openNotebook(host: HTMLElement, s: GameState): void {
  const unlocked = DRINK_ORDER.filter((id) => s.recipes.includes(id));
  const page = el('div', { class: 'nb-page' });
  const tabs = el('div', { class: 'nb-tabs', role: 'tablist' });

  const show = (i: number) => {
    const id = unlocked[i];
    const r = RECIPES[id];
    const memoryOpen = s.flags.includes(`ani_${id}`);
    tabs.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
    page.replaceChildren(
      el('span', { class: 'nb-kicker' }, `TARİF ${DRINK_ORDER.indexOf(id) + 1}`),
      el('h3', { class: 'hand' }, r.title),
      el('ul', { class: 'hand' }, ...r.steps.map((st) => el('li', {}, st))),
      el('div', { class: `nb-memory${memoryOpen ? '' : ' locked'}` },
        el('span', { class: 'nb-kicker' }, memoryOpen ? 'AÇILAN ANI' : 'KİLİTLİ ANI'),
        el('p', { class: 'hand' }, memoryOpen ? r.memory : 'Bu tarifi bir kez kusursuz demlediğinde babaannenin notu okunur hâle gelecek.'),
      ),
    );
  };

  unlocked.forEach((id, i) => tabs.append(el('button', { role: 'tab', onclick: () => show(i) }, DRINKS[id].name)));

  const items = el('div', { class: 'nb-items' },
    el('span', { class: 'nb-kicker' }, 'CEPLERİNDE'),
    s.items.length ? el('ul', {}, ...s.items.map((i) => el('li', {}, i.name))) : el('p', {}, 'Henüz bir şey yok.'),
  );

  const body = unlocked.length
    ? el('div', { class: 'nb' }, tabs, page, items)
    : el('div', { class: 'nb' }, el('p', { class: 'hand' }, 'Defter henüz boş görünüyor…'), items);
  modal(host, 'Nesrin’in defteri', body, 'notebook');
  if (unlocked.length) show(unlocked.length - 1);
}

export function openTown(host: HTMLElement, s: GameState): void {
  const grid = el('div', { class: 'town-grid' });
  for (const id of TOWN_ORDER) {
    const c = CHARACTERS[id];
    const known = s.met.includes(id);
    const pic = !known
      ? el('div', { class: 'town-pic unknown' }, '?')
      : id === 'pamuk'
        ? el('div', { class: 'town-pic', html: PAMUK })
        : c.portrait
          ? el('img', { class: 'town-pic', src: c.portrait, alt: '' })
          : el('div', { class: 'town-pic unknown' }, c.name[0]);
    const bond = s.bonds[id] ?? 0;
    grid.append(el('article', { class: `town-card${known ? '' : ' locked'}` },
      pic,
      el('div', { class: 'town-body' },
        el('h3', {}, known ? c.name : '???'),
        el('span', { class: 'town-role' }, known ? c.role : 'Henüz tanışmadın'),
        known ? el('p', {}, c.note) : null,
        known && id !== 'deniz' ? el('span', { class: 'town-drink' }, c.drink) : null,
        known && id !== 'deniz' ? el('span', { class: 'town-bond', 'aria-label': `Bağ ${bond} / ${MAX_BOND}` }, hearts(bond)) : null,
      ),
    ));
  }
  modal(host, 'Kasaba defteri', el('div', { class: 'town' }, grid), 'townbook');
}
