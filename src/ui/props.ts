import type { AnimName, DrinkId } from '../types';
import { DRINKS } from '../data/drinks';

// Art for staged moments (shutter, bus, phone…) and for found items. Everything
// is inline SVG in the same flat style as the backdrops.

const sv = (vb: string, body: string, cls = '') =>
  `<svg class="${cls}" viewBox="${vb}"${cls === 'prop-fill' || cls === 'road' ? ' preserveAspectRatio="none"' : ''} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;

/** Corrugated steel shutter covering the whole stage. */
export const SHUTTER = sv('0 0 390 520', `
  <rect width="390" height="520" fill="#9AA3A8"/>
  ${Array.from({ length: 26 }, (_, i) => `<rect y="${i * 20}" width="390" height="10" fill="#B4BCC0"/><rect y="${i * 20 + 10}" width="390" height="2" fill="#7E878C"/>`).join('')}
  <rect y="500" width="390" height="20" fill="#5E666B"/>
  <rect x="175" y="484" width="40" height="12" rx="4" fill="#3F464A"/>
  <path d="M30 120 l60 40 M300 300 l40 -20 M80 400 l30 10" stroke="#B5432A" stroke-width="3" opacity="0.35"/>
  <text x="195" y="260" text-anchor="middle" font-family="Caveat, cursive" font-size="34" fill="#5E666B" opacity="0.7">M RTI ÇAY EV</text>
`, 'prop-fill');

/** Intercity bus, side view, facing right. */
export const BUS = sv('0 0 260 120', `
  <ellipse cx="130" cy="112" rx="120" ry="6" fill="#000" opacity="0.18"/>
  <rect x="6" y="14" width="244" height="84" rx="16" fill="#F6F1E8"/>
  <path d="M220 14 h14 a16 16 0 0 1 16 16 v40 h-30 z" fill="#E9E1D1"/>
  <rect x="6" y="66" width="244" height="12" fill="#B5432A"/>
  <rect x="6" y="80" width="244" height="5" fill="#1F4E6B"/>
  ${[18, 58, 98, 138, 178].map((x) => `<rect x="${x}" y="26" width="34" height="28" rx="4" fill="#3D6E8A"/><path d="M${x + 4} 30 l10 -0 l-8 20" stroke="#8CC0D6" stroke-width="2" opacity="0.6"/>`).join('')}
  <rect x="222" y="26" width="24" height="30" rx="4" fill="#3D6E8A"/>
  <rect x="200" y="30" width="16" height="48" rx="2" fill="#D9D1C2"/>
  <circle cx="58" cy="98" r="16" fill="#2B2622"/><circle cx="58" cy="98" r="7" fill="#9AA3A8"/>
  <circle cx="200" cy="98" r="16" fill="#2B2622"/><circle cx="200" cy="98" r="7" fill="#9AA3A8"/>
  <rect x="244" y="60" width="8" height="8" rx="2" fill="#F7C95C"/>
  <text x="110" y="64" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="11" fill="#B5432A">YALIÇAM</text>
`, 'bus');

export const ROAD = sv('0 0 390 60', `<rect width="390" height="60" fill="#D8C9A6"/><path d="M0 30 h390" stroke="#F6EFE2" stroke-width="4" stroke-dasharray="26 18"/>`, 'road');

export const DUST = sv('0 0 80 50', `<circle cx="20" cy="30" r="14" fill="#E6D8B8"/><circle cx="42" cy="24" r="18" fill="#EFE3C8"/><circle cx="62" cy="32" r="12" fill="#E6D8B8"/>`, 'dust');

export const PHONE = sv('0 0 120 220', `
  <rect x="4" y="4" width="112" height="212" rx="20" fill="#2B2622"/>
  <rect x="12" y="20" width="96" height="176" rx="10" fill="#F6EFE2"/>
  <circle cx="60" cy="74" r="26" fill="#E4D3DC"/>
  <text x="60" y="84" text-anchor="middle" font-family="Fraunces, serif" font-weight="700" font-size="26" fill="#6B4A5E">A</text>
  <text x="60" y="122" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="14" fill="#2B2622">Annem</text>
  <text x="60" y="140" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="700" font-size="10" fill="#6B5F55">arıyor…</text>
  <circle cx="36" cy="172" r="12" fill="#B5432A"/><circle cx="84" cy="172" r="12" fill="#4C8A5A"/>
  <path d="M30 172 h12 M78 168 q6 4 12 0" stroke="#FFF" stroke-width="2.4" stroke-linecap="round" fill="none"/>
`, 'phone');

/** Glass of tea in the drink's colour, used when a recipe is unlocked. */
export function glassArt(id: DrinkId): string {
  const c = DRINKS[id].color;
  return sv('0 0 120 140', `
    <path d="M44 22 q-4 -12 4 -18 M60 22 q-4 -12 4 -18 M76 22 q-4 -12 4 -18" stroke="#B9AC94" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="60" cy="126" rx="44" ry="8" fill="#E9E1D1"/>
    <path d="M36 30 h48 c0 16 -10 22 -10 40 c0 18 10 24 10 46 h-48 c0 -22 10 -28 10 -46 c0 -18 -10 -24 -10 -40 z" fill="#FFFFFF" opacity="0.55" stroke="#C9BFAE" stroke-width="2"/>
    <path d="M39 44 h42 c-2 8 -7 14 -7 26 c0 18 10 24 10 44 h-48 c0 -20 10 -26 10 -44 c0 -12 -5 -18 -7 -26 z" fill="${c}"/>
    <path d="M44 50 c2 10 2 16 0 26" stroke="#FFF" stroke-width="3" opacity="0.4" stroke-linecap="round" fill="none"/>
  `);
}

const PAWN = (letter: string) => sv('0 0 120 120', `
  <ellipse cx="60" cy="96" rx="44" ry="10" fill="#000" opacity="0.12"/>
  <circle cx="60" cy="60" r="42" fill="#F1E6D0" stroke="#B9AC94" stroke-width="3"/>
  <circle cx="60" cy="60" r="32" fill="none" stroke="#D8C9A6" stroke-width="2"/>
  <text x="60" y="78" text-anchor="middle" font-family="Fraunces, serif" font-weight="700" font-size="46" fill="#7A5232">${letter}</text>
  <path d="M40 40 l8 6 M74 82 l6 4" stroke="#9B8A74" stroke-width="2" stroke-linecap="round"/>
`);

const ITEMS: Record<string, string> = {
  defter: sv('0 0 120 120', `
    <rect x="22" y="12" width="78" height="98" rx="6" fill="#6E4A33"/><rect x="22" y="12" width="12" height="98" rx="4" fill="#5A3A28"/>
    <rect x="40" y="30" width="50" height="26" rx="3" fill="#FBF4E4"/>
    <text x="65" y="48" text-anchor="middle" font-family="Caveat, cursive" font-size="15" fill="#3A322C">Nesrin</text>
    <path d="M88 110 v-14" stroke="#B5432A" stroke-width="5"/>`),
  pul_n: PAWN('N'),
  pul_y: PAWN('Y'),
  foto: sv('0 0 120 120', `
    <g transform="rotate(-6 60 60)"><path d="M18 18 h70 l-6 14 l8 10 l-6 12 l7 12 l-7 12 l6 12 l-4 12 h-68 z" fill="#FBF8F2" stroke="#D8C9A6" stroke-width="2"/>
    <rect x="26" y="26" width="52" height="64" fill="#C9B48E"/><rect x="58" y="34" width="12" height="40" fill="#E9E1D1"/>
    <circle cx="42" cy="50" r="8" fill="#8A6A4C"/><path d="M32 90 c0 -18 6 -26 10 -26 c4 0 10 8 10 26 z" fill="#7B4F6A"/>
    <path d="M70 66 h8 v14 h-8 z" fill="#B5432A" opacity="0.8"/></g>`),
  teklif: sv('0 0 120 120', `
    <rect x="12" y="30" width="96" height="64" rx="4" fill="#F6F1E8" stroke="#C9BFAE" stroke-width="2"/>
    <path d="M12 32 l48 34 l48 -34" stroke="#C9BFAE" stroke-width="2" fill="none"/>
    <rect x="24" y="74" width="40" height="10" fill="#1F4E6B"/><text x="44" y="82" text-anchor="middle" font-family="Nunito" font-size="7" font-weight="800" fill="#FFF">LİMAN A.Ş.</text>`),
  tapu: sv('0 0 120 120', `
    <rect x="30" y="6" width="60" height="108" rx="10" fill="#2B2622"/><rect x="35" y="16" width="50" height="88" rx="4" fill="#FFFDF8"/>
    <rect x="40" y="22" width="40" height="8" fill="#B5432A"/><path d="M40 40 h40 M40 48 h34 M40 56 h38 M40 64 h28" stroke="#C9BFAE" stroke-width="3"/>
    <rect x="40" y="74" width="40" height="12" rx="2" fill="none" stroke="#B5432A" stroke-width="2"/><text x="60" y="83" text-anchor="middle" font-family="Nunito" font-size="7" font-weight="800" fill="#B5432A">SATILDI</text>`),
  not: sv('0 0 120 120', `
    <path d="M18 30 l84 -8 l4 70 l-84 8 z" fill="#FBF8F2" stroke="#D8C9A6" stroke-width="2"/>
    <path d="M60 26 l4 70" stroke="#E6DCC6" stroke-width="2"/>
    <text x="62" y="66" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="20" fill="#2B2622" transform="rotate(-5 62 62)">Satmasınlar.</text>`),
  gazete: sv('0 0 120 120', `
    <rect x="10" y="18" width="100" height="84" fill="#EDE6D6" stroke="#C9BFAE" stroke-width="2"/>
    <text x="60" y="34" text-anchor="middle" font-family="Fraunces, serif" font-weight="700" font-size="11" fill="#2B2622">EGE POSTASI</text>
    <path d="M16 40 h88" stroke="#2B2622" stroke-width="1.5"/>
    <text x="16" y="54" font-family="Nunito" font-weight="800" font-size="8" fill="#2B2622">FIRTINADA TEKNE BATTI</text>
    <rect x="16" y="60" width="38" height="30" fill="#9AA3A8"/><path d="M60 62 h44 M60 70 h44 M60 78 h40 M60 86 h44" stroke="#9B8A74" stroke-width="2"/>`),
  kaset: sv('0 0 120 120', `
    <rect x="10" y="28" width="100" height="64" rx="6" fill="#3A3F44"/><rect x="20" y="36" width="80" height="30" rx="4" fill="#F1E6D0"/>
    <circle cx="42" cy="51" r="10" fill="#3A3F44"/><circle cx="78" cy="51" r="10" fill="#3A3F44"/>
    <circle cx="42" cy="51" r="4" fill="#F1E6D0"/><circle cx="78" cy="51" r="4" fill="#F1E6D0"/>
    <text x="60" y="84" text-anchor="middle" font-family="Caveat, cursive" font-size="13" fill="#F1E6D0">Yıldız · 2.9.76</text>`),
  mektuplar: sv('0 0 120 120', `
    ${[0, 1, 2, 3].map((i) => `<rect x="${18 + i * 2}" y="${70 - i * 12}" width="80" height="44" rx="3" fill="${i % 2 ? '#F6F1E8' : '#EFE3CC'}" stroke="#C9BFAE" stroke-width="1.5"/>`).join('')}
    <text x="60" y="50" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="18" fill="#2B2622">Y.’ye</text>
    <path d="M60 28 v86 M20 60 h82" stroke="#C0392B" stroke-width="4"/><circle cx="60" cy="60" r="6" fill="#C0392B"/>`),
  kekik: sv('0 0 120 120', `
    <path d="M60 110 C58 80 50 50 40 20 M60 90 C66 70 74 50 86 30 M58 70 C50 60 36 54 24 50" stroke="#6E7A4E" stroke-width="3" fill="none"/>
    ${[[40, 20], [44, 34], [48, 48], [86, 30], [80, 44], [74, 58], [24, 50], [36, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#9B7AB8"/><circle cx="${x + 5}" cy="${y + 4}" r="4" fill="#8A9A5E"/>`).join('')}`),
  murver: sv('0 0 120 120', `
    <path d="M60 112 V60 M60 70 L34 46 M60 70 L86 46 M60 64 L60 36" stroke="#6E7A4E" stroke-width="3"/>
    ${Array.from({ length: 34 }, (_, i) => {
      const cx = [34, 60, 86][i % 3] + ((i * 7) % 22) - 11;
      const cy = [46, 34, 46][i % 3] + ((i * 5) % 16) - 10;
      return `<circle cx="${cx}" cy="${cy}" r="4" fill="#FBF8EC" stroke="#E6DCC0" stroke-width="1"/>`;
    }).join('')}`),
  seyir: sv('0 0 120 120', `
    <path d="M10 40 L60 18 L110 40 L110 96 L60 112 L10 96 Z" fill="#6B6A4A"/>
    <rect x="28" y="34" width="64" height="70" rx="4" fill="#4A3A2E"/><rect x="34" y="40" width="52" height="58" rx="2" fill="#E9E1D1"/>
    <text x="60" y="64" text-anchor="middle" font-family="Fraunces, serif" font-weight="700" font-size="11" fill="#3A322C">YILDIZ</text>
    <text x="60" y="80" text-anchor="middle" font-family="Caveat, cursive" font-size="12" fill="#3A322C">seyir defteri</text>`),
};

export function itemArt(id: string): string {
  return ITEMS[id] ?? ITEMS.defter;
}

export const ITEM_IDS = Object.keys(ITEMS);

/** Every animation name the engine understands. Kept here so tests can check scripts against it. */
export const ANIMS: AnimName[] = ['kepenk_ac', 'kepenk_kapa', 'otobus_gelir', 'otobus_gider', 'fener_yanar', 'simsek', 'elektrik_kesik', 'telefon'];
