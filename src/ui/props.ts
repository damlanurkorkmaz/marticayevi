import type { AnimName, DrinkId, PropName } from '../types';
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
  <text x="195" y="260" text-anchor="middle" font-family="Caveat, cursive" font-size="34" fill="#5E666B" opacity="0.7">MARTI ÇAY EVİ</text>
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

/** The drink as it is served: coffee in a plain white cup, lemonade in a tall glass, the rest in a tea glass. */
export function glassArt(id: DrinkId): string {
  const c = DRINKS[id].color;
  if (id === 'kahve') {
    return sv('0 0 120 140', `
      <path d="M50 46 q-4 -12 4 -18 M66 46 q-4 -12 4 -18" stroke="#B9AC94" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="112" rx="48" ry="11" fill="#E9E5DE"/>
      <ellipse cx="60" cy="109" rx="48" ry="10" fill="#FFFFFF" stroke="#DCD6CC" stroke-width="2"/>
      <ellipse cx="60" cy="108" rx="26" ry="5" fill="#EFEBE4"/>
      <path d="M86 70 c16 -2 18 18 2 22" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M86 70 c16 -2 18 18 2 22" stroke="#DCD6CC" stroke-width="2" fill="none"/>
      <path d="M32 58 h56 l-6 44 c-1 5 -5 7 -10 7 h-24 c-5 0 -9 -2 -10 -7 z" fill="#FFFFFF" stroke="#DCD6CC" stroke-width="2"/>
      <ellipse cx="60" cy="58" rx="28" ry="6" fill="${c}"/>
      <ellipse cx="60" cy="57" rx="22" ry="3.6" fill="#B08A68"/>
      <path d="M40 66 c2 12 3 22 6 32" stroke="#EFEBE4" stroke-width="4" fill="none" stroke-linecap="round"/>
    `);
  }
  if (id === 'limonata') {
    return sv('0 0 120 140', `
      <ellipse cx="60" cy="128" rx="34" ry="6" fill="#E9E1D1"/>
      <path d="M36 20 h48 l-6 104 h-36 z" fill="#FFFFFF" opacity="0.55" stroke="#C9BFAE" stroke-width="2"/>
      <path d="M38 40 h44 l-5 82 h-34 z" fill="${c}"/>
      <rect x="46" y="50" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.6"/><rect x="62" y="64" width="11" height="11" rx="2" fill="#FFFFFF" opacity="0.6"/>
      <circle cx="84" cy="30" r="14" fill="#F3DD6E" stroke="#E0B93A" stroke-width="3"/><path d="M84 18 v24 M72 30 h24 M76 22 l16 16 M92 22 l-16 16" stroke="#E0B93A" stroke-width="1.5"/>
      <path d="M50 22 q-6 -12 6 -16 q4 8 -6 16 M56 20 q8 -10 16 -4 q-6 8 -16 4" fill="#4C8A5A"/>
      <path d="M70 14 l-10 100" stroke="#B5432A" stroke-width="4" stroke-linecap="round"/>
    `);
  }
  return sv('0 0 120 140', `
    <path d="M44 22 q-4 -12 4 -18 M60 22 q-4 -12 4 -18 M76 22 q-4 -12 4 -18" stroke="#B9AC94" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="60" cy="126" rx="44" ry="8" fill="#E9E1D1"/>
    <path d="M36 30 h48 c0 16 -10 22 -10 40 c0 18 10 24 10 46 h-48 c0 -22 10 -28 10 -46 c0 -18 -10 -24 -10 -40 z" fill="#FFFFFF" opacity="0.55" stroke="#C9BFAE" stroke-width="2"/>
    <path d="M39 44 h42 c-2 8 -7 14 -7 26 c0 18 10 24 10 44 h-48 c0 -20 10 -26 10 -44 c0 -12 -5 -18 -7 -26 z" fill="${c}"/>
    <path d="M44 50 c2 10 2 16 0 26" stroke="#FFF" stroke-width="3" opacity="0.4" stroke-linecap="round" fill="none"/>
    ${id === 'ihlamur' ? '<circle cx="82" cy="34" r="11" fill="#F3DD6E" stroke="#E0B93A" stroke-width="3"/><path d="M82 25 v18 M73 34 h18" stroke="#E0B93A" stroke-width="1.5"/>' : ''}
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

// ---------------------------------------------------------------------------
// Things the text describes, shown while it describes them.
// ---------------------------------------------------------------------------

const phoneFrame = (screen: string, stamp: string) => sv('0 0 160 220', `
  <path d="M30 220 C26 190 34 176 52 170 L70 168 L70 220 Z" fill="#E6B48E"/>
  <rect x="34" y="8" width="96" height="186" rx="14" fill="#2B2622"/>
  <rect x="40" y="20" width="84" height="160" rx="6" fill="#0F2233"/>
  <svg x="40" y="20" width="84" height="160" viewBox="0 0 84 160">${screen}</svg>
  <circle cx="52" cy="32" r="3" fill="#E04A3A"/><text x="58" y="35" font-family="Nunito" font-weight="800" font-size="8" fill="#FFF">REC</text>
  <text x="118" y="172" text-anchor="end" font-family="Nunito" font-weight="800" font-size="9" fill="#FFF">${stamp}</text>
  <path d="M110 194 C126 190 138 200 140 220 L100 220 C100 206 102 198 110 194 Z" fill="#E6B48E"/>
`);

const NIGHT_SKY = '<rect width="84" height="160" fill="#14263A"/><circle cx="14" cy="18" r="1" fill="#FFF"/><circle cx="60" cy="10" r="1" fill="#FFF"/><circle cx="72" cy="40" r="1" fill="#FFF"/>';

const PROP_ART: Record<string, string> = {
  video_fener: phoneFrame(`${NIGHT_SKY}
    <rect x="0" y="110" width="84" height="50" fill="#0F2233"/><path d="M0 112 q20 -6 40 0 t44 0" stroke="#2D4C66" stroke-width="2" fill="none"/>
    <rect x="52" y="60" width="8" height="50" fill="#D9D4C8"/><rect x="50" y="52" width="12" height="9" fill="#2B2622"/>
    <rect x="53" y="54" width="6" height="5" fill="#FFE28A"/><path d="M56 56 L0 30 L0 80 Z" fill="#FFE9A8" opacity="0.35"/>
    <circle cx="56" cy="56" r="10" fill="#FFE28A" opacity="0.4"/>`, '00.00'),
  video_siluet: phoneFrame(`<rect width="84" height="160" fill="#1A2530"/>
    <rect x="10" y="20" width="64" height="140" fill="#3A3F44"/><path d="M24 160 V70 a18 18 0 0 1 36 0 V160 Z" fill="#22272B"/>
    <rect x="52" y="104" width="8" height="8" rx="2" fill="#C9A24A"/>
    <g fill="#0B1015"><circle cx="40" cy="86" r="8"/><path d="M30 82 q10 -10 20 0 l2 2 h-24 z"/><path d="M28 160 q0 -50 12 -60 q12 10 12 60 z"/></g>
    <rect x="0" y="0" width="84" height="160" fill="#4A6A5A" opacity="0.18"/>`, '03.12'),
  tavla: sv('0 0 200 140', `
    <rect x="6" y="14" width="188" height="118" rx="8" fill="#7A5232"/><rect x="14" y="22" width="84" height="102" fill="#E9D7B4"/><rect x="102" y="22" width="84" height="102" fill="#E9D7B4"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${16 + i * 14} 22 l7 40 l7 -40 z" fill="${i % 2 ? '#B5432A' : '#2B2622'}"/><path d="M${16 + i * 14} 124 l7 -40 l7 40 z" fill="${i % 2 ? '#2B2622' : '#B5432A'}"/><path d="M${104 + i * 14} 22 l7 40 l7 -40 z" fill="${i % 2 ? '#B5432A' : '#2B2622'}"/><path d="M${104 + i * 14} 124 l7 -40 l7 40 z" fill="${i % 2 ? '#2B2622' : '#B5432A'}"/>`).join('')}
    ${[[30, 112], [30, 100], [44, 112], [150, 34], [150, 46], [164, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#F6F1E8" stroke="#B9AC94" stroke-width="1.5"/>`).join('')}
    ${[[72, 34], [72, 46], [128, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#3A2A22"/>`).join('')}
    <rect x="114" y="66" width="14" height="14" rx="3" fill="#FFF"/><circle cx="118" cy="70" r="1.6"/><circle cx="124" cy="76" r="1.6"/>
    <rect x="134" y="62" width="14" height="14" rx="3" fill="#FFF" transform="rotate(14 141 69)"/><circle cx="141" cy="69" r="1.6"/>`),
  zarf: sv('0 0 200 140', `
    <path d="M30 116 C26 96 40 86 60 84 L78 84 L78 140 L30 140 Z" fill="#E0AE88"/>
    <rect x="40" y="24" width="130" height="84" rx="4" fill="#F6F1E8" stroke="#C9BFAE" stroke-width="2" transform="rotate(-6 105 66)"/>
    <rect x="60" y="8" width="96" height="64" fill="#FFFFFF" stroke="#DCD6CC" stroke-width="2" transform="rotate(-6 108 40)"/>
    <text x="106" y="34" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="9" fill="#1F4E6B" transform="rotate(-6 106 34)">LİMAN OTELCİLİK A.Ş.</text>
    <text x="108" y="58" text-anchor="middle" font-family="Fraunces, serif" font-weight="700" font-size="20" fill="#2B2622" transform="rotate(-6 108 58)">₺ 2.000.000</text>`),
  kanit_duvari: sv('0 0 220 150', `
    <rect x="4" y="6" width="212" height="140" rx="4" fill="#B98A5A"/><rect x="10" y="12" width="200" height="128" fill="#C99C6A"/>
    <rect x="86" y="44" width="48" height="56" fill="#FFF"/><circle cx="110" cy="66" r="12" fill="#D49C74"/><path d="M96 98 c0 -14 6 -20 14 -20 c8 0 14 6 14 20 z" fill="#4A4038"/>
    <text x="110" y="40" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="14" fill="#B5432A">MUHTAR?</text>
    <rect x="20" y="20" width="44" height="34" fill="#F6F1E8" transform="rotate(-4 42 37)"/><path d="M28 46 l10 -14 l6 8 l6 -6 l8 12 z" fill="#14263A" transform="rotate(-4 42 37)"/>
    <rect x="154" y="22" width="46" height="30" fill="#FBF8F2" transform="rotate(5 177 37)"/><text x="177" y="40" text-anchor="middle" font-family="Caveat" font-size="12" fill="#2B2622" transform="rotate(5 177 37)">Pzt·Prş·Cmt</text>
    <rect x="22" y="94" width="40" height="34" fill="#E9DFC8" transform="rotate(6 42 111)"/><text x="42" y="116" text-anchor="middle" font-family="Fraunces" font-weight="700" font-size="18" fill="#7A5232" transform="rotate(6 42 111)">?</text>
    <rect x="156" y="92" width="44" height="38" fill="#FBF8F2" transform="rotate(-5 178 111)"/><circle cx="178" cy="108" r="9" fill="#4A4038" transform="rotate(-5 178 111)"/><path d="M168 104 h20" stroke="#2B2622" stroke-width="4" transform="rotate(-5 178 111)"/>
    <path d="M42 37 L110 72 L177 37 M42 111 L110 72 L178 111" stroke="#C0392B" stroke-width="2" fill="none"/>
    ${[[42, 37], [110, 72], [177, 37], [42, 111], [178, 111]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#C0392B"/>`).join('')}`),
  sabun: sv('0 0 200 140', `
    <ellipse cx="100" cy="118" rx="80" ry="10" fill="#000" opacity="0.12"/>
    <path d="M28 54 q0 -18 18 -18 h108 q18 0 18 18 v40 q0 18 -18 18 h-108 q-18 0 -18 -18 z" fill="#F3E6C4" stroke="#D9C9A0" stroke-width="2"/>
    <path d="M70 76 a12 12 0 1 1 0.1 0 M82 74 h50 v6 h-6 v6 h-6 v-6 h-6 v8 h-6 v-8 h-26" fill="none" stroke="#B9A577" stroke-width="5" stroke-linejoin="round"/>
    <path d="M44 48 q30 -6 60 0" stroke="#FFF" stroke-width="4" opacity="0.6" fill="none" stroke-linecap="round"/>`),
  telsiz: sv('0 0 200 150', `
    <ellipse cx="100" cy="138" rx="86" ry="8" fill="#000" opacity="0.14"/>
    <rect x="18" y="30" width="164" height="104" rx="10" fill="#8A9298"/><rect x="18" y="30" width="164" height="16" rx="8" fill="#6E767C"/>
    <rect x="30" y="56" width="70" height="40" rx="4" fill="#2B3035"/><text x="65" y="80" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="12" fill="#9BE08A">CH 16</text>
    <circle cx="128" cy="76" r="14" fill="#3F464C"/><circle cx="160" cy="76" r="10" fill="#3F464C"/>
    <rect x="30" y="104" width="80" height="22" rx="3" fill="#3F464C"/><rect x="36" y="108" width="68" height="14" rx="2" fill="#F1E6D0"/><circle cx="56" cy="115" r="4" fill="#3F464C"/><circle cx="84" cy="115" r="4" fill="#3F464C"/>
    <path d="M150 30 l20 -26" stroke="#3F464C" stroke-width="4" stroke-linecap="round"/>
    <path d="M120 104 h50 M120 112 h50 M120 120 h50" stroke="#6E767C" stroke-width="3"/>`),
  mektup: sv('0 0 200 150', `
    <rect x="22" y="8" width="156" height="136" fill="#FBF6EA" stroke="#E3D6BF" stroke-width="2" transform="rotate(-2 100 76)"/>
    <text x="40" y="34" font-family="Caveat, cursive" font-weight="700" font-size="18" fill="#2B2622" transform="rotate(-2 100 76)">Y.,</text>
    ${[52, 68, 84, 100, 116].map((y, i) => `<path d="M40 ${y} q20 -4 40 0 t40 0 t${30 - i * 4} 0" stroke="#4A5A7A" stroke-width="2" fill="none" transform="rotate(-2 100 76)"/>`).join('')}
    <text x="160" y="134" text-anchor="end" font-family="Caveat, cursive" font-weight="700" font-size="16" fill="#2B2622" transform="rotate(-2 100 76)">— N.</text>`),
  kirik_bardak: sv('0 0 200 140', `
    <ellipse cx="100" cy="104" rx="76" ry="16" fill="#9E2F1E" opacity="0.55"/>
    <path d="M60 100 l16 -30 l10 26 z M96 104 l8 -40 l16 34 z M130 98 l20 -18 l-2 24 z M80 110 l14 -6 l6 10 z" fill="#FFFFFF" opacity="0.75" stroke="#C9BFAE" stroke-width="1.5"/>
    <path d="M40 112 l10 -4 M150 114 l12 -6" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`),
  otlar: sv('0 0 200 140', `
    <rect x="0" y="100" width="200" height="40" fill="#B9875C"/>
    <path d="M30 100 C40 70 50 50 70 36" stroke="#6E7A4E" stroke-width="3" fill="none"/>
    ${[[40, 78], [50, 62], [60, 48], [70, 36]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="#9DAA86" transform="rotate(-30 ${x} ${y})"/>`).join('')}
    <path d="M100 100 C96 80 92 66 86 50 M100 100 C104 80 112 66 122 56" stroke="#6E7A4E" stroke-width="2.5" fill="none"/>
    ${[[86, 50], [90, 62], [122, 56], [114, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#9B7AB8"/>`).join('')}
    <path d="M160 100 V60 M160 70 L140 50 M160 70 L180 50" stroke="#6E7A4E" stroke-width="2.5"/>
    ${Array.from({ length: 18 }, (_, i) => `<circle cx="${[140, 160, 180][i % 3] + ((i * 7) % 14) - 7}" cy="${[50, 42, 50][i % 3] + ((i * 5) % 10) - 5}" r="3.4" fill="#FBF8EC" stroke="#E6DCC0"/>`).join('')}`),
  radyo: sv('0 0 200 140', `
    <ellipse cx="100" cy="130" rx="80" ry="7" fill="#000" opacity="0.14"/>
    <rect x="24" y="40" width="152" height="86" rx="12" fill="#B5432A"/><rect x="36" y="52" width="76" height="62" rx="6" fill="#E9D7B4"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M42 ${60 + i * 9} h64" stroke="#C9B48E" stroke-width="3"/>`).join('')}
    <rect x="122" y="56" width="42" height="14" rx="2" fill="#F6F1E8"/><path d="M140 56 v14" stroke="#B5432A" stroke-width="2"/>
    <circle cx="132" cy="94" r="10" fill="#7A2E1E"/><circle cx="156" cy="94" r="10" fill="#7A2E1E"/>
    <path d="M60 40 L84 10" stroke="#3F464C" stroke-width="3"/>
    <path d="M178 50 q10 10 0 20 M186 42 q16 18 0 36" stroke="#B5432A" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  kalabalik: sv('0 0 390 520', `
    ${Array.from({ length: 11 }, (_, i) => {
      const x = 10 + i * 36 + (i % 2) * 6;
      const h = 40 + ((i * 13) % 22);
      const y = 300 - ((i % 3) * 8);
      return `<g fill="${['#7A6E64', '#6B6058', '#857A70'][i % 3]}" opacity="0.85"><circle cx="${x + 16}" cy="${y - h}" r="15"/><path d="M${x} ${y + 60} v-${h - 14} q0 -18 16 -18 q16 0 16 18 v${h - 14} z"/></g>`;
    }).join('')}`, 'prop-fill'),
};

/** Props that fill the whole stage behind the characters, rather than appearing as a small picture. */
export const LAYER_PROPS: PropName[] = ['kalabalik', 'yagmur'];

export function propArt(p: PropName): string {
  return PROP_ART[p] ?? '';
}

export const PROP_IDS = [...Object.keys(PROP_ART), 'yagmur'];
