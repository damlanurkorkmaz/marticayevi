import type { Day, GameState, Visit } from './types';
import { CHAPTERS, DAYS, LAST_DAY, getDay } from './data/story';
import { DRINKS } from './data/drinks';
import { CHARACTERS } from './data/characters';
import { runScene } from './engine/scene';
import { hasFlag, save, setFlag } from './engine/state';
import { Stage, type BrewResult } from './ui/stage';
import { el } from './ui/dom';
import { hearts } from './ui/overlays';

const TIP: Record<BrewResult, number> = { mukemmel: 15, iyi: 5, olmadi: 0 };

/** Money earned for one served drink. Wrong drinks still pay half; a spoiled brew halves again. */
export function payFor(price: number, correct: boolean, q: BrewResult): number {
  let pay = correct ? price + TIP[q] : Math.round(price / 2);
  if (q === 'olmadi') pay = Math.round(pay / 2);
  return pay;
}

export async function play(state: GameState, mount: HTMLElement, onMenu: () => void): Promise<void> {
  const stage = new Stage(state, onMenu);
  mount.replaceChildren(stage.root);

  while (state.day <= LAST_DAY) {
    const day = getDay(state.day);
    if (!day) break;
    save(state);
    await playDay(day, state, stage);
    state.day += 1;
    save(state);
  }
  await showEnd(state, stage);
  onMenu();
}

async function playDay(day: Day, s: GameState, stage: Stage): Promise<void> {
  const start = { money: s.money, bonds: { ...s.bonds } };
  stage.refreshHud(`Gün ${day.n} · ${day.weekday}`);
  stage.backdrop('cayevi');

  const firstOfChapter = DAYS.find((d) => d.chapter === day.chapter) === day;
  if (firstOfChapter) {
    const ch = CHAPTERS[day.chapter];
    await stage.card(ch.label, ch.title);
  }
  await stage.card(`Gün ${day.n}`, `${day.weekday} · ${day.title}`);

  await runScene(day.morning, s, stage);
  for (const visit of day.visits) await serve(visit, s, stage);
  if (day.evening) await runScene(day.evening, s, stage);
  if (day.night) await runScene(day.night, s, stage);

  await stage.sheet(daySummary(day, s, start), day.n === LAST_DAY ? 'Devam' : 'Günü bitir');

  if (day.chapterEnd) {
    if (!s.chapterDone.includes(day.chapter)) s.chapterDone.push(day.chapter);
    const body = el('div', { class: 'chapter-end' },
      el('span', { class: 'kicker' }, CHAPTERS[day.chapter].label.toUpperCase()),
      el('h2', {}, day.chapterEnd.title),
      el('p', {}, day.chapterEnd.text),
    );
    await stage.sheet(body, 'Devam et');
  }
}

async function serve(v: Visit, s: GameState, stage: Stage): Promise<void> {
  stage.backdrop('cayevi');
  stage.setActor(v.who);
  await runScene(v.arrive, s, stage);

  const drink = await stage.pickDrink();
  const q = await stage.brew(drink);
  const correct = drink === v.wants;
  const pay = payFor(DRINKS[drink].price, correct, q);
  s.money += pay;
  s.served += 1;
  stage.toast(`+₺${pay}${q === 'mukemmel' && correct ? ' · bahşiş' : ''}`);

  if (correct && q === 'mukemmel') {
    s.perfect += 1;
    const key = `ani_${drink}`;
    if (!hasFlag(s, key)) {
      setFlag(s, key);
      stage.toast('Defterde bir anı okunur hâle geldi');
    }
  }

  await runScene(correct ? v.right : v.wrong, s, stage);
  if (v.after) await runScene(v.after, s, stage);
  stage.setActor(null);
}

function daySummary(day: Day, s: GameState, start: { money: number; bonds: GameState['bonds'] }): HTMLElement {
  const earned = s.money - start.money;
  const changed = Object.entries(s.bonds)
    .filter(([id, v]) => (v ?? 0) !== (start.bonds[id as keyof typeof start.bonds] ?? 0))
    .map(([id, v]) => el('li', {}, el('span', {}, CHARACTERS[id as keyof typeof CHARACTERS].name), el('span', { class: 'hearts' }, hearts(v ?? 0))));
  return el('div', { class: 'summary' },
    el('span', { class: 'kicker' }, `GÜN ${day.n} BİTTİ`),
    el('h2', {}, day.title),
    el('div', { class: 'summary-row' }, el('span', {}, 'Bugünkü kazanç'), el('strong', {}, `₺${earned}`)),
    el('div', { class: 'summary-row' }, el('span', {}, 'Kasa'), el('strong', {}, `₺${s.money}`)),
    changed.length ? el('div', {}, el('span', { class: 'kicker' }, 'BAĞLAR'), el('ul', { class: 'bond-list' }, ...changed)) : null,
  );
}

async function showEnd(s: GameState, stage: Stage): Promise<void> {
  stage.backdrop('gece');
  stage.refreshHud('Devamı yakında');
  const body = el('div', { class: 'chapter-end' },
    el('span', { class: 'kicker' }, 'İLK FAZIN SONU'),
    el('h2', {}, 'Fener seni bekliyor'),
    el('p', {}, 'Prolog ve 1. bölümü bitirdin. 2. bölüm, “Muhtarın Planı”, yakında.'),
    el('div', { class: 'summary-row' }, el('span', {}, 'İkram edilen'), el('strong', {}, String(s.served))),
    el('div', { class: 'summary-row' }, el('span', {}, 'Kusursuz demleme'), el('strong', {}, String(s.perfect))),
    el('div', { class: 'summary-row' }, el('span', {}, 'Kasa'), el('strong', {}, `₺${s.money}`)),
  );
  await stage.sheet(body, 'Ana menüye dön');
}
