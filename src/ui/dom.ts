type Attrs = Record<string, string | number | boolean | EventListener | undefined>;
type Child = Node | string | null | undefined | false;

/** Tiny element builder. `on*` keys become listeners, `html` sets innerHTML for trusted static art. */
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') node.innerHTML = String(v);
    else if (k === 'class') node.className = String(v);
    else if (v === true) node.setAttribute(k, '');
    else node.setAttribute(k, String(v));
  }
  for (const c of children) if (c !== null && c !== undefined && c !== false) node.append(c);
  return node;
}

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Resolves on the next click/tap or Enter/Space on `target`. */
export function nextTap(target: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      target.removeEventListener('click', done);
      document.removeEventListener('keydown', key);
      resolve();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        done();
      }
    };
    target.addEventListener('click', done);
    document.addEventListener('keydown', key);
  });
}

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
