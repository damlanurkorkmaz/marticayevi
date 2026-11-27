import { describe, expect, it } from 'vitest';
import type { DrinkId, GameState, Node } from '../src/types';
import { DAYS, LAST_DAY, CHAPTERS, ENDINGS, getDay } from '../src/data/story';
import { CHARACTERS } from '../src/data/characters';
import { DRINKS, RECIPES } from '../src/data/drinks';
import { runScene, type SceneUI } from '../src/engine/scene';
import { newGame, save, load, addBond, MAX_BOND } from '../src/engine/state';
import { payFor } from '../src/game';
import { ITEM_IDS, PROP_IDS } from '../src/ui/props';

function* walk(nodes: Node[]): Generator<Node> {
  for (const n of nodes) {
    yield n;
    if (n.t === 'choice') for (const o of n.options) yield* walk(o.then);
    if (n.t === 'if' || n.t === 'ifBond') { yield* walk(n.then); yield* walk(n.else ?? []); }
  }
}

function allNodes(): Node[] {
  const out: Node[] = [];
  for (const d of DAYS) {
    out.push(...walk(d.morning), ...walk(d.evening ?? []), ...walk(d.night ?? []));
    for (const v of d.visits) out.push(...walk(v.arrive), ...walk(v.right), ...walk(v.wrong), ...walk(v.after ?? []));
  }
  return out;
}

/** Fake UI: always picks choice `pick` (or the last option if out of range). */
function fakeUI(pick = 0): SceneUI & { lines: string[] } {
  const lines: string[] = [];
  return {
    lines,
    say: async (_w, t) => { lines.push(t); },
    choose: async (_p, o) => Math.min(pick, o.length - 1),
    toast: () => {},
    backdrop: () => {},
    card: async () => {},
    enter: () => {},
    anim: async () => {},
    reveal: async () => {},
    show: () => {},
    hide: () => {},
  };
}

describe('story data', () => {
  it('has consecutive days and known chapters', () => {
    DAYS.forEach((d, i) => expect(d.n).toBe(i + 1));
    expect(LAST_DAY).toBe(DAYS.length);
    for (const d of DAYS) expect(CHAPTERS[d.chapter]).toBeDefined();
  });

  it('only references known characters and drinks', () => {
    for (const n of allNodes()) {
      if (n.t === 'say' && n.who !== 'anlatici') expect(CHARACTERS[n.who], n.who).toBeDefined();
      if (n.t === 'bond') expect(CHARACTERS[n.who]).toBeDefined();
      if (n.t === 'recipe') expect(DRINKS[n.id]).toBeDefined();
    }
    for (const d of DAYS) for (const v of d.visits) expect(DRINKS[v.wants]).toBeDefined();
  });

  it('every flag that is checked can be set somewhere', () => {
    const set = new Set(allNodes().filter((n) => n.t === 'flag').map((n) => (n as { name: string }).name));
    for (const n of allNodes()) if (n.t === 'if') expect(set.has(n.flag), n.flag).toBe(true);
  });

  it('never asks for a drink before its recipe can be unlocked', () => {
    const known = new Set<DrinkId>();
    for (const d of DAYS) {
      for (const n of walk(d.morning)) if (n.t === 'recipe') known.add(n.id);
      for (const v of d.visits) {
        expect(known.has(v.wants), `day ${d.n}: ${v.who} wants ${v.wants}`).toBe(true);
        for (const n of [...walk(v.arrive), ...walk(v.right), ...walk(v.wrong), ...walk(v.after ?? [])]) if (n.t === 'recipe') known.add(n.id);
      }
    }
  });

  it('has a picture for every item the story hands out', () => {
    for (const n of allNodes()) if (n.t === 'item') expect(ITEM_IDS, n.id).toContain(n.id);
  });

  it('has a picture for every object the text shows', () => {
    for (const n of allNodes()) if (n.t === 'show') expect(PROP_IDS, n.prop).toContain(n.prop);
  });

  it('has a recipe page for every drink', () => {
    for (const id of Object.keys(DRINKS) as DrinkId[]) expect(RECIPES[id].steps.length).toBeGreaterThan(0);
  });

  it('keeps every choice non-empty and every line short enough for a phone', () => {
    for (const n of allNodes()) {
      if (n.t === 'choice') for (const o of n.options) expect(o.then.length, o.text).toBeGreaterThan(0);
      if (n.t === 'say') expect(n.text.length, n.text).toBeLessThanOrEqual(190);
    }
  });
});

describe('scene runner', () => {
  it('plays every day through on both choice branches without errors', async () => {
    for (const pick of [0, 1]) {
      const s: GameState = newGame();
      const ui = fakeUI(pick);
      for (const d of DAYS) {
        await runScene(d.morning, s, ui);
        for (const v of d.visits) {
          await runScene(v.arrive, s, ui);
          await runScene(pick === 0 ? v.right : v.wrong, s, ui);
          await runScene(v.after ?? [], s, ui);
        }
        await runScene(d.evening ?? [], s, ui);
        await runScene(d.night ?? [], s, ui);
      }
      expect(ui.lines.length).toBeGreaterThan(100);
      expect(s.recipes).toEqual(expect.arrayContaining(['tavsan', 'adacayi', 'limonata', 'kahve', 'ihlamur', 'harman']));
      expect(s.flags).toEqual(expect.arrayContaining(['hilmi_degil', 'kopya_anahtar', 'satis_iptal', 'kaset', 'mektuplar', 'y_kim', 'yusuf_isim', 'kekik', 'murver', 'dede', 'cevdet_biliyor', 'seyir_defteri', 'anne_tanisti']));
      expect(s.flags.filter((f) => f.startsWith('son_'))).toHaveLength(1);
      if (pick === 0) {
        expect(s.flags).toContain('pul_ikisi');
        expect(s.flags).toContain('pul_gosterildi');
        expect(s.items.map((i) => i.id)).toEqual(expect.arrayContaining(['defter', 'pul_n', 'pul_y', 'foto']));
      }
    }
  });

  it('runs if/else branches by flag', async () => {
    const s = newGame();
    const ui = fakeUI();
    const scene: Node[] = [{ t: 'if', flag: 'x', then: [{ t: 'say', who: 'anlatici', text: 'A' }], else: [{ t: 'say', who: 'anlatici', text: 'B' }] }];
    await runScene(scene, s, ui);
    s.flags.push('x');
    await runScene(scene, s, ui);
    expect(ui.lines).toEqual(['B', 'A']);
  });
});

describe('endings', () => {
  const final = getDay(LAST_DAY)!;
  const withBonds = (n: number): GameState => {
    const s = newGame();
    for (const id of ['cevdet', 'sukran', 'elif', 'kemal', 'yusuf'] as const) s.bonds[id] = n;
    return s;
  };

  it('reaches each of the three endings from the final choice', async () => {
    const reached: string[] = [];
    for (const pick of [0, 1, 2]) {
      const s = withBonds(5);
      await runScene(final.evening ?? [], s, fakeUI(pick));
      reached.push(...s.flags.filter((f) => f.startsWith('son_')));
    }
    expect(reached).toEqual(['son_fener', 'son_aile', 'son_kepenk']);
    expect(ENDINGS.map((e) => e.flag).sort()).toEqual([...reached].sort());
  });

  it('falls back to the family ending when the town is not close enough', async () => {
    const s = withBonds(1);
    await runScene(final.evening ?? [], s, fakeUI(0));
    expect(s.flags).toContain('son_aile');
    expect(s.flags).not.toContain('son_fener');
  });
});

describe('state and economy', () => {
  it('clamps bonds between 0 and the maximum', () => {
    const s = newGame();
    addBond(s, 'elif', 99);
    expect(s.bonds.elif).toBe(MAX_BOND);
    addBond(s, 'elif', -99);
    expect(s.bonds.elif).toBe(0);
  });

  it('saves and loads', () => {
    const s = newGame();
    s.day = 4;
    s.flags.push('kamera');
    save(s);
    expect(load()).toMatchObject({ day: 4, flags: ['kamera'] });
  });

  it('pays full price plus tip for a perfect right drink and less otherwise', () => {
    expect(payFor(20, true, 'mukemmel')).toBe(35);
    expect(payFor(20, true, 'iyi')).toBe(25);
    expect(payFor(20, false, 'iyi')).toBe(10);
    expect(payFor(20, true, 'olmadi')).toBe(10);
  });
});
