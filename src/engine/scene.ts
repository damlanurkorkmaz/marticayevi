import type { AnimName, Backdrop, CharId, DrinkId, GameState, Node, Speaker } from '../types';
import { CHARACTERS } from '../data/characters';
import { DRINKS } from '../data/drinks';
import { addBond, addItem, hasFlag, meet, setFlag, unlockRecipe } from './state';

/** What the scene runner needs from the screen. Kept small so tests can fake it. */
export interface SceneUI {
  say(who: Speaker, text: string): Promise<void>;
  choose(prompt: string | undefined, options: string[]): Promise<number>;
  toast(text: string): void;
  backdrop(bg: Backdrop): void;
  card(title: string, subtitle?: string): Promise<void>;
  enter(who: CharId): void;
  /** A short staged moment over the backdrop (shutter, bus, lighthouse…). */
  anim(name: AnimName): Promise<void>;
  /** Shows a found item or a new recipe big, so the player notices it. */
  reveal(r: Reveal): Promise<void>;
}

export type Reveal = { kind: 'item'; id: string; name: string } | { kind: 'recipe'; id: DrinkId; name: string };

export async function runScene(nodes: Node[], s: GameState, ui: SceneUI): Promise<void> {
  for (const node of nodes) {
    switch (node.t) {
      case 'say':
        if (node.who !== 'anlatici') meet(s, node.who);
        await ui.say(node.who, node.text);
        break;
      case 'choice': {
        const i = await ui.choose(node.prompt, node.options.map((o) => o.text));
        await runScene(node.options[i].then, s, ui);
        break;
      }
      case 'bond': {
        const before = s.bonds[node.who] ?? 0;
        const after = addBond(s, node.who, node.n);
        const name = CHARACTERS[node.who].name;
        if (after > before) ui.toast(`${name} ile bağın güçlendi`);
        else if (after < before) ui.toast(`${name} biraz kırıldı`);
        break;
      }
      case 'flag':
        setFlag(s, node.name);
        break;
      case 'money':
        s.money += node.n;
        ui.toast(node.n >= 0 ? `+₺${node.n}` : `−₺${-node.n}`);
        break;
      case 'recipe':
        if (unlockRecipe(s, node.id)) await ui.reveal({ kind: 'recipe', id: node.id, name: DRINKS[node.id].name });
        break;
      case 'item':
        if (addItem(s, node.id, node.name)) await ui.reveal({ kind: 'item', id: node.id, name: node.name });
        break;
      case 'if':
        await runScene(hasFlag(s, node.flag) ? node.then : node.else ?? [], s, ui);
        break;
      case 'ifBond': {
        const ok = node.who.every((w) => (s.bonds[w] ?? 0) >= node.min);
        await runScene(ok ? node.then : node.else ?? [], s, ui);
        break;
      }
      case 'backdrop':
        ui.backdrop(node.bg);
        // Every phone call starts with the phone ringing.
        if (node.bg === 'telefon') await ui.anim('telefon');
        break;
      case 'anim':
        await ui.anim(node.name);
        break;
      case 'card':
        await ui.card(node.title, node.subtitle);
        break;
      case 'enter':
        meet(s, node.who);
        ui.enter(node.who);
        break;
    }
  }
}
