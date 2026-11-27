import type { Backdrop, GameState, Node, Speaker } from '../types';
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
}

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
        if (unlockRecipe(s, node.id)) ui.toast(`Deftere yeni tarif: ${DRINKS[node.id].name}`);
        break;
      case 'item':
        if (addItem(s, node.id, node.name)) ui.toast(`Yeni eşya: ${node.name}`);
        break;
      case 'if':
        await runScene(hasFlag(s, node.flag) ? node.then : node.else ?? [], s, ui);
        break;
      case 'backdrop':
        ui.backdrop(node.bg);
        break;
      case 'card':
        await ui.card(node.title, node.subtitle);
        break;
    }
  }
}
