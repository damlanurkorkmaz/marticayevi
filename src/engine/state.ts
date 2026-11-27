import type { CharId, DrinkId, GameState } from '../types';

const KEY = 'marticayevi.save.v1';
export const MAX_BOND = 5;

export function newGame(): GameState {
  return {
    version: 1,
    day: 1,
    money: 150,
    bonds: {},
    met: ['deniz'],
    flags: [],
    recipes: [],
    items: [],
    served: 0,
    perfect: 0,
    chapterDone: [],
  };
}

export function hasFlag(s: GameState, name: string): boolean {
  return s.flags.includes(name);
}

export function setFlag(s: GameState, name: string): void {
  if (!s.flags.includes(name)) s.flags.push(name);
}

export function addBond(s: GameState, who: CharId, n: number): number {
  const v = Math.max(0, Math.min(MAX_BOND, (s.bonds[who] ?? 0) + n));
  s.bonds[who] = v;
  meet(s, who);
  return v;
}

export function meet(s: GameState, who: CharId): void {
  if (!s.met.includes(who)) s.met.push(who);
}

export function unlockRecipe(s: GameState, id: DrinkId): boolean {
  if (s.recipes.includes(id)) return false;
  s.recipes.push(id);
  return true;
}

export function addItem(s: GameState, id: string, name: string): boolean {
  if (s.items.some((i) => i.id === id)) return false;
  s.items.push({ id, name });
  return true;
}

function storage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export function save(s: GameState): void {
  try {
    storage()?.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage full or blocked: the game keeps running in memory */
  }
}

export function load(): GameState | null {
  try {
    const raw = storage()?.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as GameState;
    if (s.version !== 1 || typeof s.day !== 'number') return null;
    return { ...newGame(), ...s };
  } catch {
    return null;
  }
}

export function clearSave(): void {
  try {
    storage()?.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
