import type { Backdrop, CharId, DrinkId, GameState, Speaker } from '../types';
import type { SceneUI } from '../engine/scene';
import { CHARACTERS } from '../data/characters';
import { DRINKS, DRINK_ORDER } from '../data/drinks';
import { BACKDROPS, COUNTER, PAMUK } from './art';
import { el, nextTap, prefersReducedMotion, wait } from './dom';
import { openNotebook, openTown } from './overlays';

const NAME_COLORS: Partial<Record<Speaker, string>> = {
  deniz: '#1F4E6B', yusuf: '#5E6B5C', sukran: '#7B4F6A', cevdet: '#1F4E6B',
  elif: '#B5432A', hilmi: '#4A4038', anne: '#6B4A5E', pamuk: '#8A7E74',
};

export type BrewResult = 'mukemmel' | 'iyi' | 'olmadi';

/** The in-game screen: HUD, backdrop with an actor, and a bottom panel for dialogue and choices. */
export class Stage implements SceneUI {
  readonly root: HTMLElement;
  private hudDay = el('span', { class: 'hud-day' });
  private hudMoney = el('span', { class: 'hud-money' });
  private backdropEl = el('div', { class: 'backdrop' });
  private actorEl = el('div', { class: 'actor' });
  private counterEl = el('div', { class: 'counter', html: COUNTER });
  private panel = el('div', { class: 'panel' });
  private toasts = el('div', { class: 'toasts', role: 'status' });
  private overlay = el('div', { class: 'overlay-host' });
  private actor: CharId | null = null;

  constructor(private state: GameState, onMenu: () => void) {
    const btn = (label: string, icon: string, fn: () => void) =>
      el('button', { class: 'hud-btn', 'aria-label': label, title: label, html: icon, onclick: (e: Event) => { e.stopPropagation(); fn(); } });
    const hud = el('header', { class: 'hud' },
      el('div', { class: 'hud-left' }, this.hudDay),
      el('div', { class: 'hud-right' },
        this.hudMoney,
        btn('Tarif defteri', ICON_BOOK, () => openNotebook(this.overlay, this.state)),
        btn('Kasaba defteri', ICON_PEOPLE, () => openTown(this.overlay, this.state)),
        btn('Ana menü', ICON_MENU, onMenu),
      ),
    );
    const stage = el('div', { class: 'stage' }, this.backdropEl, this.actorEl, this.counterEl);
    // Tapping the picture advances dialogue too, not just the text box.
    stage.addEventListener('click', () => (this.panel.querySelector('.dialogue') as HTMLElement | null)?.click());
    this.root = el('div', { class: 'screen game' }, hud, stage, this.panel, this.toasts, this.overlay);
    this.counterEl.hidden = true;
    this.refreshHud();
  }

  refreshHud(label?: string) {
    if (label) this.hudDay.textContent = label;
    this.hudMoney.textContent = `₺${this.state.money.toLocaleString('tr-TR')}`;
  }

  backdrop(bg: Backdrop) {
    this.backdropEl.innerHTML = BACKDROPS[bg];
    this.backdropEl.dataset.bg = bg;
    this.counterEl.hidden = bg !== 'cayevi';
    this.setActor(null);
  }

  setActor(who: CharId | null) {
    if (who === this.actor) return;
    this.actor = who;
    this.actorEl.replaceChildren();
    this.actorEl.classList.remove('in');
    if (!who) return;
    if (who === 'pamuk') {
      this.actorEl.append(el('div', { class: 'actor-art pamuk', html: PAMUK }));
    } else {
      const src = CHARACTERS[who].cut;
      if (!src) return;
      this.actorEl.append(el('img', { class: 'actor-art', src, alt: CHARACTERS[who].name }));
    }
    requestAnimationFrame(() => this.actorEl.classList.add('in'));
  }

  async say(who: Speaker, text: string): Promise<void> {
    if (who !== 'anlatici' && who !== 'deniz' && who !== 'anne') this.setActor(who);
    const isNarr = who === 'anlatici';
    const name = isNarr ? null : CHARACTERS[who].name;
    const textEl = el('p', { class: 'line-text' });
    const box = el('div', { class: `dialogue${isNarr ? ' narr' : ''}${who === 'deniz' ? ' self' : ''}`, tabindex: '0' },
      name ? el('div', { class: 'nametag', style: `background:${NAME_COLORS[who] ?? '#2B2622'}` },
        who === 'deniz' ? el('img', { src: CHARACTERS.deniz.portrait!, alt: '' }) : null, name) : null,
      textEl,
      el('span', { class: 'more', 'aria-hidden': 'true' }, '▾'),
    );
    this.panel.replaceChildren(box);
    box.focus({ preventScroll: true });

    // Typewriter; a tap finishes the line, the next tap advances.
    let skip = false;
    const skipper = () => { skip = true; };
    box.addEventListener('click', skipper, { once: true });
    if (prefersReducedMotion()) skip = true;
    for (let i = 1; i <= text.length && !skip; i++) {
      textEl.textContent = text.slice(0, i);
      await wait(text[i - 1] === '.' || text[i - 1] === '?' ? 120 : 22);
    }
    box.removeEventListener('click', skipper);
    textEl.textContent = text;
    box.classList.add('done');
    await nextTap(box);
  }

  async choose(prompt: string | undefined, options: string[]): Promise<number> {
    return new Promise((resolve) => {
      const wrap = el('div', { class: 'choices' }, prompt ? el('p', { class: 'choice-prompt' }, prompt) : null);
      options.forEach((o, i) => wrap.append(el('button', { class: 'choice', onclick: () => resolve(i) }, o)));
      this.panel.replaceChildren(wrap);
      (wrap.querySelector('button') as HTMLButtonElement | null)?.focus({ preventScroll: true });
    });
  }

  toast(text: string) {
    const t = el('div', { class: 'toast' }, text);
    this.toasts.append(t);
    this.refreshHud();
    setTimeout(() => t.classList.add('out'), 2400);
    setTimeout(() => t.remove(), 2900);
  }

  async card(title: string, subtitle?: string): Promise<void> {
    const c = el('div', { class: 'card-overlay', tabindex: '0' },
      el('div', { class: 'card-inner' },
        el('h2', {}, title),
        subtitle ? el('p', {}, subtitle) : null,
        el('span', { class: 'tap-hint' }, 'Devam etmek için dokun'),
      ),
    );
    this.overlay.append(c);
    c.focus();
    await wait(400);
    await nextTap(c);
    c.classList.add('out');
    await wait(250);
    c.remove();
  }

  /** Lets the player pick one of the unlocked drinks. */
  pickDrink(): Promise<DrinkId> {
    return new Promise((resolve) => {
      const grid = el('div', { class: 'tray-grid' });
      for (const id of DRINK_ORDER) {
        if (!this.state.recipes.includes(id)) continue;
        const d = DRINKS[id];
        grid.append(el('button', { class: 'drink', onclick: () => resolve(id) },
          el('span', { class: 'swatch', style: `background:${d.color}` }),
          el('span', { class: 'drink-name' }, d.name),
          el('span', { class: 'drink-price' }, `₺${d.price}`),
        ));
      }
      const tray = el('div', { class: 'tray' },
        el('div', { class: 'tray-head' },
          el('h3', {}, 'Ne ikram edeceksin?'),
          el('button', { class: 'linkish', onclick: () => openNotebook(this.overlay, this.state) }, 'Deftere bak'),
        ),
        grid,
      );
      this.panel.replaceChildren(tray);
    });
  }

  /** Timing mini-game: stop the needle inside the zone. */
  brew(id: DrinkId): Promise<BrewResult> {
    const d = DRINKS[id];
    const [a, b] = d.zone;
    return new Promise((resolve) => {
      const needle = el('div', { class: 'needle' });
      const zone = el('div', { class: 'zone', style: `left:${a * 100}%;width:${(b - a) * 100}%` });
      const sweet = el('div', { class: 'sweet', style: `left:${(a + (b - a) * 0.3) * 100}%;width:${(b - a) * 0.4 * 100}%` });
      const bar = el('div', { class: 'brew-bar' }, zone, sweet, needle);
      const label = el('p', { class: 'brew-hint' }, 'İbre yeşil alana geldiğinde dokun.');
      const go = el('button', { class: 'btn primary big' }, d.verb);
      const sheet = el('div', { class: 'brew' },
        el('div', { class: 'brew-title' }, el('span', { class: 'swatch', style: `background:${d.color}` }), el('h3', {}, d.name)),
        bar, label, go);
      this.panel.replaceChildren(sheet);
      go.focus({ preventScroll: true });

      let pos = 0;
      let dir = 1;
      let last = performance.now();
      let running = true;
      const tick = (now: number) => {
        if (!running) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        pos += dir * d.speed * 2 * dt;
        if (pos >= 1) { pos = 1; dir = -1; }
        if (pos <= 0) { pos = 0; dir = 1; }
        needle.style.left = `${pos * 100}%`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      go.addEventListener('click', async () => {
        running = false;
        go.disabled = true;
        const mid0 = a + (b - a) * 0.3;
        const mid1 = a + (b - a) * 0.7;
        const r: BrewResult = pos >= mid0 && pos <= mid1 ? 'mukemmel' : pos >= a && pos <= b ? 'iyi' : 'olmadi';
        label.textContent = r === 'mukemmel' ? 'Mükemmel!' : r === 'iyi' ? 'Güzel oldu.' : 'Biraz kaçtı…';
        label.className = `brew-hint ${r}`;
        await wait(800);
        resolve(r);
      }, { once: true });
    });
  }

  /** A bottom-sheet with arbitrary content and one button. */
  sheet(content: HTMLElement, button: string): Promise<void> {
    return new Promise((resolve) => {
      const s = el('div', { class: 'sheet' }, content, el('button', { class: 'btn primary big', onclick: () => resolve() }, button));
      this.panel.replaceChildren(s);
      (s.querySelector('button.primary') as HTMLButtonElement).focus({ preventScroll: true });
    });
  }

  clearPanel() {
    this.panel.replaceChildren();
  }
}

const ICON_BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z"/><path d="M9 8h6M9 12h6"/></svg>';
const ICON_PEOPLE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5 5"/></svg>';
const ICON_MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14"/></svg>';
