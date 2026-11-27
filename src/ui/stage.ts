import type { AnimName, Backdrop, CharId, DrinkId, GameState, PropName, Speaker } from '../types';
import type { Reveal, SceneUI } from '../engine/scene';
import { CHARACTERS } from '../data/characters';
import { DRINKS, DRINK_ORDER } from '../data/drinks';
import { BACKDROPS, COUNTER, PAMUK } from './art';
import { BUS, DUST, LAYER_PROPS, PHONE, ROAD, SHUTTER, glassArt, itemArt, propArt } from './props';
import { el, nextTap, prefersReducedMotion, wait } from './dom';
import { openNotebook, openTown } from './overlays';

const NAME_COLORS: Partial<Record<Speaker, string>> = {
  deniz: '#1F4E6B', yusuf: '#5E6B5C', sukran: '#7B4F6A', cevdet: '#1F4E6B',
  elif: '#B5432A', hilmi: '#4A4038', kemal: '#3F5A6E', tuncer: '#22324A', anne: '#6B4A5E', pamuk: '#8A7E74',
};

/** Mouth open/close rhythm while a line is typed: slow enough to read as speech. */
const FLAP_MS = 190;

export type BrewResult = 'mukemmel' | 'iyi' | 'olmadi';

/** One character on stage: an image that can flap its mouth while talking. */
class Actor {
  readonly el: HTMLElement;
  private img: HTMLImageElement | null = null;
  private closed = '';
  private open = '';

  constructor(cls: string) {
    this.el = el('div', { class: `actor ${cls}` });
  }

  show(who: CharId) {
    this.el.replaceChildren();
    this.el.classList.remove('in', 'talking', 'quiet');
    this.img = null;
    if (who === 'pamuk') {
      this.el.append(el('div', { class: 'actor-art pamuk', html: PAMUK }));
    } else {
      const c = CHARACTERS[who];
      if (!c.cut) return;
      this.closed = c.cut;
      this.open = c.talk ?? c.cut;
      new Image().src = this.open; // preload so the first flap does not flicker
      this.img = el('img', { class: 'actor-art', src: c.cut, alt: c.name });
      this.el.append(this.img);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => this.el.classList.add('in')));
  }

  hide() {
    this.el.classList.remove('in', 'talking', 'quiet');
    this.el.replaceChildren();
    this.img = null;
  }

  mouth(open: boolean) {
    if (this.img) this.img.src = open ? this.open : this.closed;
  }

  state(s: 'talking' | 'quiet' | 'idle') {
    this.el.classList.toggle('talking', s === 'talking');
    this.el.classList.toggle('quiet', s === 'quiet');
    if (s !== 'talking') this.mouth(false);
  }
}

/** The in-game screen: HUD, backdrop with actors, and a bottom panel for dialogue and choices. */
export class Stage implements SceneUI {
  readonly root: HTMLElement;
  private hudDay = el('span', { class: 'hud-day' });
  private hudMoney = el('span', { class: 'hud-money' });
  private stageEl: HTMLElement;
  private backdropEl = el('div', { class: 'backdrop' });
  private other = new Actor('other');
  private self = new Actor('self');
  private counterEl = el('div', { class: 'counter', html: COUNTER });
  private fxEl = el('div', { class: 'fx', 'aria-hidden': 'true' });
  private layerEl = el('div', { class: 'layer', 'aria-hidden': 'true' });
  private insetEl = el('div', { class: 'inset', 'aria-hidden': 'true' });
  private panel = el('div', { class: 'panel' });
  private toasts = el('div', { class: 'toasts', role: 'status' });
  private overlay = el('div', { class: 'overlay-host' });
  private actor: CharId | null = null;
  private selfOn = false;

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
    this.stageEl = el('div', { class: 'stage' }, this.backdropEl, this.layerEl, this.other.el, this.self.el, this.counterEl, this.fxEl, this.insetEl);
    // Tapping the picture advances dialogue too, not just the text box.
    this.stageEl.addEventListener('click', () => (this.panel.querySelector('.dialogue') as HTMLElement | null)?.click());
    this.root = el('div', { class: 'screen game' }, hud, this.stageEl, this.panel, this.toasts, this.overlay);
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
    this.fxEl.replaceChildren();
    this.layerEl.replaceChildren();
    this.hide();
    this.setActor(null);
    this.setSelf(false);
  }

  enter(who: CharId) {
    this.setActor(who);
  }

  setActor(who: CharId | null) {
    if (who === this.actor) return;
    this.actor = who;
    if (who) this.other.show(who);
    else this.other.hide();
    this.layout();
  }

  private setSelf(on: boolean) {
    if (on === this.selfOn) return;
    this.selfOn = on;
    if (on) this.self.show('deniz');
    else this.self.hide();
    this.layout();
  }

  private layout() {
    this.stageEl.classList.toggle('paired', this.selfOn && this.actor !== null);
  }

  async say(who: Speaker, text: string): Promise<void> {
    const onPhone = who === 'anne' && this.backdropEl.dataset.bg === 'telefon';
    if (who === 'deniz') this.setSelf(true);
    else if (who !== 'anlatici' && !onPhone) this.setActor(who);

    const speaker = who === 'deniz' ? this.self : who === 'anlatici' || onPhone ? null : this.other;
    for (const a of [this.self, this.other]) a.state(speaker === null ? 'idle' : a === speaker ? 'talking' : 'quiet');

    const isNarr = who === 'anlatici';
    // Deniz is on stage when she talks, so her line needs no name card.
    const name = isNarr || who === 'deniz' ? null : CHARACTERS[who].name;
    const textEl = el('p', { class: 'line-text' });
    const box = el('div', { class: `dialogue${isNarr ? ' narr' : ''}${who === 'deniz' ? ' self' : ''}`, tabindex: '0' },
      name ? el('div', { class: 'nametag', style: `background:${NAME_COLORS[who] ?? '#2B2622'}` }, name) : null,
      textEl,
      el('span', { class: 'more', 'aria-hidden': 'true' }, '▾'),
    );
    this.panel.replaceChildren(box);
    box.focus({ preventScroll: true });

    // Typewriter; a tap finishes the line, the next tap advances. The mouth opens on vowels.
    let skip = false;
    const skipper = () => { skip = true; };
    box.addEventListener('click', skipper, { once: true });
    if (prefersReducedMotion()) skip = true;
    let open = false;
    const flap = speaker ? setInterval(() => { open = !open; speaker.mouth(open); }, FLAP_MS) : undefined;
    for (let i = 1; i <= text.length && !skip; i++) {
      const ch = text[i - 1];
      textEl.textContent = text.slice(0, i);
      await wait(ch === '.' || ch === '?' || ch === '!' ? 120 : 24);
    }
    clearInterval(flap);
    box.removeEventListener('click', skipper);
    textEl.textContent = text;
    speaker?.mouth(false);
    speaker?.state('idle');
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

  /** Staged moments over the backdrop. A tap on the picture skips the wait. */
  async anim(name: AnimName): Promise<void> {
    const reduced = prefersReducedMotion();
    this.panel.replaceChildren(); // no stale line under a staged moment
    const added: HTMLElement[] = [];
    const add = (cls: string, html = '') => {
      const node = el('div', { class: `fx-${cls}`, html });
      this.fxEl.append(node);
      added.push(node);
    };
    let ms = 1800;
    let keep = false;
    switch (name) {
      case 'kepenk_ac': add('shutter up', SHUTTER); ms = 1900; break;
      case 'kepenk_kapa': add('shutter down', SHUTTER); ms = 1700; keep = true; break;
      case 'otobus_gelir': add('road', ROAD); add('bus arrive', BUS + `<div class="fx-dust">${DUST}</div>`); ms = 2200; keep = true; break;
      case 'otobus_gider': add('road', ROAD); add('bus leave', BUS + `<div class="fx-dust">${DUST}</div>`); ms = 2600; break;
      case 'fener_yanar': add('beam'); add('glow'); ms = 2700; break;
      case 'simsek': add('flash'); ms = 1000; break;
      case 'elektrik_kesik': add('dark'); ms = 1100; keep = true; break;
      case 'telefon': add('phone', PHONE); ms = 1900; break;
    }
    this.fxEl.classList.toggle('reduced', reduced);
    await Promise.race([wait(reduced ? 350 : ms), nextTap(this.stageEl)]);
    if (!keep) added.forEach((n) => n.remove());
  }

  show(prop: PropName) {
    if (LAYER_PROPS.includes(prop)) {
      this.layerEl.replaceChildren(el('div', { class: `layer-${prop}`, html: propArt(prop) }));
      return;
    }
    this.insetEl.classList.toggle('tall', prop.startsWith('video'));
    this.insetEl.replaceChildren(el('div', { class: 'inset-card', html: propArt(prop) }));
    this.insetEl.classList.remove('in');
    requestAnimationFrame(() => requestAnimationFrame(() => this.insetEl.classList.add('in')));
  }

  hide() {
    this.insetEl.classList.remove('in');
    this.insetEl.replaceChildren();
  }

  /** Puts the served drink on the counter in front of the customer until they leave. */
  serveDrink(id: DrinkId) {
    this.fxEl.querySelector('.fx-served')?.remove();
    this.fxEl.append(el('div', { class: 'fx-served', html: glassArt(id) }));
  }

  /** Big card for a found item or a new recipe, so it cannot be missed. */
  async reveal(r: Reveal): Promise<void> {
    const art = r.kind === 'recipe' ? glassArt(r.id) : itemArt(r.id);
    const c = el('div', { class: 'reveal', tabindex: '0', role: 'dialog', 'aria-label': r.name },
      el('div', { class: 'reveal-card' },
        el('div', { class: 'reveal-art', html: art }),
        el('span', { class: 'kicker' }, r.kind === 'recipe' ? 'DEFTERE YENİ TARİF' : 'YENİ EŞYA'),
        el('h2', {}, r.name),
        el('span', { class: 'tap-hint' }, r.kind === 'recipe' ? 'Defterde, tarifler arasında' : 'Defterin “Ceplerinde” sayfasında'),
      ),
    );
    this.overlay.append(c);
    c.focus();
    await wait(prefersReducedMotion() ? 100 : 650);
    await nextTap(c);
    c.classList.add('out');
    await wait(220);
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
          el('span', { class: 'drink-art', html: glassArt(id) }),
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
        el('div', { class: 'brew-title' }, el('span', { class: 'drink-art', html: glassArt(id) }), el('h3', {}, d.name)),
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
