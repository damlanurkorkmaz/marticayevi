import type { Backdrop } from '../types';

// Hand-built SVG backdrops. All share a 390×520 viewBox and are drawn with
// `preserveAspectRatio="xMidYMid slice"` so they fill any phone height.

const svg = (body: string, vb = '0 0 390 520') =>
  `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

const houses = (lit = false) => {
  const win = lit ? '#F7C95C' : '#1F4E6B';
  return `
  <rect x="34" y="262" width="38" height="32" fill="${lit ? '#C9C2B4' : '#FFFDF8'}"/><path d="M30 264 L53 246 L76 264 Z" fill="${lit ? '#7A3020' : '#B5432A'}"/><rect x="46" y="274" width="10" height="20" fill="${win}"/>
  <rect x="86" y="272" width="44" height="30" fill="${lit ? '#C9C2B4' : '#FFFDF8'}"/><rect x="96" y="280" width="9" height="9" fill="${win}"/><rect x="112" y="280" width="9" height="9" fill="${win}"/>
  <rect x="144" y="278" width="32" height="28" fill="${lit ? '#BDB6A8' : '#FFFDF8'}"/><path d="M140 280 L160 265 L180 280 Z" fill="${lit ? '#7A3020' : '#B5432A'}"/><rect x="155" y="288" width="9" height="18" fill="${win}"/>
  <rect x="192" y="268" width="48" height="36" fill="${lit ? '#C9C2B4' : '#FFFDF8'}"/><rect x="202" y="278" width="9" height="9" fill="${win}"/><rect x="220" y="278" width="9" height="9" fill="${win}"/>
  <path d="M238 300 c6 -18 14 -26 22 -26 c8 0 12 10 14 26 Z" fill="${lit ? '#2E3F33' : '#6E8A5E'}"/>`;
};

const lighthouse = (on: boolean) => `
  <rect x="312" y="150" width="22" height="112" fill="${on ? '#D9D4C8' : '#FFFDF8'}"/>
  <rect x="312" y="176" width="22" height="12" fill="#B5432A"/><rect x="312" y="212" width="22" height="12" fill="#B5432A"/>
  <rect x="306" y="258" width="34" height="8" fill="#8A7E6C"/>
  <rect x="308" y="132" width="30" height="20" fill="#2B2622"/><rect x="314" y="136" width="18" height="12" fill="${on ? '#FFE28A' : '#6F8E9C'}"/>
  <path d="M317 124 L323 112 L329 124 Z" fill="#2B2622"/>
  ${on ? '<path d="M323 142 L0 90 L0 190 Z" fill="#FFE9A8" opacity="0.22"/><path d="M323 142 L390 110 L390 170 Z" fill="#FFE9A8" opacity="0.28"/><circle cx="323" cy="142" r="22" fill="#FFE28A" opacity="0.35"/>' : ''}`;

const liman = svg(`
  <rect width="390" height="520" fill="#F3E3C7"/>
  <circle cx="96" cy="150" r="46" fill="#E9B97F"/>
  <path d="M60 110 q8 -8 16 0 q8 -8 16 0" stroke="#2B2622" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M200 70 q6 -6 12 0 q6 -6 12 0" stroke="#2B2622" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M0 300 C60 250 120 260 170 280 C230 300 270 240 330 250 L390 255 L390 360 L0 360 Z" fill="#C9B48E"/>
  ${houses(false)}
  ${lighthouse(false)}
  <rect x="0" y="330" width="390" height="190" fill="#2F6F8F"/>
  <rect x="0" y="330" width="390" height="10" fill="#3D82A3"/>
  <path d="M30 380 h40 M120 400 h60 M250 372 h50 M300 420 h40 M60 440 h70 M180 470 h50" stroke="#8CC0D6" stroke-width="3" stroke-linecap="round"/>
  <path d="M150 352 L230 352 L218 368 L162 368 Z" fill="#B5432A"/><rect x="186" y="326" width="3" height="27" fill="#2B2622"/><path d="M189 328 L210 348 L189 348 Z" fill="#FFFDF8"/>
  <rect x="0" y="420" width="150" height="16" fill="#9B6B43"/>
  ${[10, 40, 70, 100, 130].map((x) => `<rect x="${x}" y="436" width="8" height="84" fill="#7A5232"/>`).join('')}
`);

const cayevi = svg(`
  <rect width="390" height="520" fill="#EADBC0"/>
  <rect width="390" height="22" fill="#D9C6A4"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 52}" y="22" width="2" height="498" fill="#E0CFAE"/>`).join('')}
  <rect x="26" y="56" width="200" height="150" rx="10" fill="#FFFDF8"/>
  <rect x="38" y="68" width="176" height="74" fill="#F3E3C7"/>
  <circle cx="80" cy="100" r="16" fill="#E9B97F"/>
  <rect x="38" y="142" width="176" height="54" fill="#2F6F8F"/>
  <path d="M50 160 h24 M110 175 h30 M160 162 h26" stroke="#8CC0D6" stroke-width="2.4" stroke-linecap="round"/>
  <rect x="166" y="92" width="10" height="50" fill="#FFFDF8"/><rect x="166" y="104" width="10" height="6" fill="#B5432A"/><rect x="164" y="84" width="14" height="9" fill="#2B2622"/>
  <rect x="124" y="68" width="5" height="128" fill="#FFFDF8"/><rect x="38" y="138" width="176" height="5" fill="#FFFDF8"/>
  <path d="M20 52 h212 v8 h-212 z" fill="#B08D5E"/>
  <path d="M30 60 q20 30 0 60 M222 60 q-20 30 0 60" stroke="#B5432A" stroke-width="10" fill="none" opacity="0.85"/>
  <rect x="256" y="58" width="104" height="7" fill="#B08D5E"/>
  <rect x="264" y="34" width="18" height="24" rx="3" fill="#B5432A"/><rect x="288" y="38" width="16" height="20" rx="3" fill="#1F4E6B"/><rect x="310" y="32" width="20" height="26" rx="3" fill="#E9B97F"/><rect x="334" y="40" width="16" height="18" rx="3" fill="#8FA37A"/>
  <rect x="256" y="116" width="104" height="7" fill="#B08D5E"/>
  <path d="M266 116 h24 v-20 a12 12 0 0 0 -24 0 z" fill="#C0C7CC"/><path d="M272 88 h12 v-9 h-12 z" fill="#8A949B"/>
  <path d="M300 116 h20 l-3 -24 h-14 z" fill="#B5432A" opacity="0.85"/>
  <circle cx="340" cy="104" r="11" fill="#FFFDF8" stroke="#1F4E6B" stroke-width="3"/>
  <rect x="270" y="150" width="80" height="60" rx="4" fill="#FFFDF8" stroke="#B08D5E" stroke-width="4"/>
  <text x="310" y="172" text-anchor="middle" font-family="Caveat, cursive" font-size="15" fill="#2B2622">Çay 20</text>
  <text x="310" y="188" text-anchor="middle" font-family="Caveat, cursive" font-size="15" fill="#2B2622">Kahve 35</text>
  <text x="310" y="204" text-anchor="middle" font-family="Caveat, cursive" font-size="15" fill="#2B2622">Limonata 30</text>
`);

/** Counter drawn in front of customers in the café. */
export const COUNTER = svg(`
  <rect x="0" y="0" width="390" height="14" fill="#B9875C"/>
  <rect x="0" y="14" width="390" height="140" fill="#9B6B43"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 70 + 10}" y="30" width="56" height="100" rx="4" fill="none" stroke="#8A5D38" stroke-width="3"/>`).join('')}
  <path d="M60 0 c0 -20 4 -30 16 -30 h6 c12 0 16 10 16 30 z" fill="#B5432A"/>
  <path d="M66 -26 c5 -7 22 -7 26 0" stroke="#FFFDF8" stroke-width="2" fill="none"/>
  <ellipse cx="330" cy="0" rx="26" ry="6" fill="#FFFDF8"/>
  <path d="M316 -2 q6 -14 12 -16 q6 2 12 16 z" fill="#E9E1D1"/>
`, '0 -40 390 194');

const gece = svg(`
  <rect width="390" height="520" fill="#14263A"/>
  ${[[30, 40], [80, 90], [140, 30], [200, 70], [250, 24], [120, 120], [40, 170], [350, 60], [290, 90], [180, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#F6EFE2" opacity="0.8"/>`).join('')}
  <circle cx="70" cy="80" r="22" fill="#F3E3C7"/><circle cx="80" cy="74" r="20" fill="#14263A"/>
  <path d="M0 300 C60 250 120 260 170 280 C230 300 270 240 330 250 L390 255 L390 360 L0 360 Z" fill="#22344A"/>
  ${houses(true)}
  ${lighthouse(true)}
  <rect x="0" y="330" width="390" height="190" fill="#0F2233"/>
  <path d="M20 370 h50 M130 390 h60 M250 366 h40 M300 410 h50 M60 440 h70" stroke="#2D4C66" stroke-width="3" stroke-linecap="round"/>
  <path d="M290 340 l66 0 l-20 180 l-26 0 z" fill="#FFE9A8" opacity="0.07"/>
`);

const fener = svg(`
  <rect width="390" height="520" fill="#14263A"/>
  ${[[40, 40], [110, 70], [300, 30], [350, 90], [210, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#F6EFE2" opacity="0.8"/>`).join('')}
  <rect x="80" y="40" width="230" height="420" fill="#C9C2B4"/>
  <rect x="80" y="40" width="40" height="420" fill="#B3AB9C"/>
  <rect x="80" y="120" width="230" height="34" fill="#9E3A26"/><rect x="80" y="120" width="40" height="34" fill="#86301F"/>
  ${[0, 1, 2, 3, 4].map((i) => `<path d="M80 ${200 + i * 50} h230" stroke="#B8B0A1" stroke-width="2"/>`).join('')}
  <path d="M150 460 V300 a45 45 0 0 1 90 0 V460 Z" fill="#3A3F44"/>
  <path d="M158 460 V302 a37 37 0 0 1 74 0 V460 Z" fill="#2B3035"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${164 + i * 17}" y="300" width="4" height="160" fill="#3F464C"/>`).join('')}
  <rect x="228" y="370" width="22" height="8" fill="#5A6268"/>
  <path d="M244 382 a9 9 0 0 1 18 0 v4" stroke="#E6E9EC" stroke-width="3.5" fill="none"/>
  <rect x="240" y="384" width="26" height="22" rx="4" fill="#F2D27A"/><rect x="240" y="384" width="26" height="6" rx="3" fill="#FFF1C2"/>
  <circle cx="253" cy="396" r="3" fill="#8A6A1E"/>
  <rect x="0" y="456" width="390" height="64" fill="#D8C9A6"/>
  ${[[60, 486], [92, 470], [120, 492], [150, 474]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="13" fill="#B7A67F" transform="rotate(-20 ${x} ${y})"/>`).join('')}
  <path d="M0 520 L390 300 L390 520 Z" fill="#FFE9A8" opacity="0.06"/>
`);

const depo = svg(`
  <rect width="390" height="520" fill="#2E241C"/>
  <path d="M195 0 v60" stroke="#1A1410" stroke-width="2"/>
  <circle cx="195" cy="72" r="12" fill="#FFE28A"/>
  <circle cx="195" cy="72" r="120" fill="#FFE28A" opacity="0.10"/>
  <circle cx="195" cy="72" r="60" fill="#FFE28A" opacity="0.10"/>
  <rect x="20" y="110" width="110" height="8" fill="#5A4230"/><rect x="20" y="190" width="110" height="8" fill="#5A4230"/>
  <rect x="30" y="80" width="26" height="30" fill="#6E5440"/><rect x="62" y="86" width="20" height="24" fill="#7A3020"/><rect x="88" y="92" width="30" height="18" fill="#4A5A4E"/>
  <rect x="34" y="160" width="40" height="30" fill="#6E5440"/><rect x="80" y="166" width="34" height="24" fill="#5A4A3C"/>
  <rect x="250" y="130" width="120" height="8" fill="#5A4230"/>
  <path d="M262 130 v-34 h18 v34 M290 130 v-26 h14 v26 M314 130 v-40 h22 v40" fill="#4A3A2E"/>
  <rect x="120" y="330" width="160" height="110" rx="6" fill="#7A5232"/>
  <rect x="120" y="330" width="160" height="26" rx="6" fill="#8E6440"/>
  <rect x="190" y="350" width="20" height="14" rx="3" fill="#C9A24A"/>
  <path d="M120 380 h160 M120 410 h160" stroke="#6A4628" stroke-width="3"/>
  <rect x="0" y="440" width="390" height="80" fill="#241C16"/>
`);

const telefon = svg(`
  <rect width="390" height="520" fill="#3B3340"/>
  <rect x="40" y="60" width="160" height="190" rx="8" fill="#5D4E5C"/>
  <rect x="50" y="70" width="140" height="170" fill="#E9906A"/>
  <rect x="50" y="170" width="140" height="70" fill="#3B5D78"/>
  <circle cx="120" cy="168" r="22" fill="#F7C95C"/>
  <rect x="50" y="166" width="140" height="6" fill="#3B5D78"/>
  <rect x="118" y="70" width="4" height="170" fill="#5D4E5C"/><rect x="50" y="152" width="140" height="4" fill="#5D4E5C"/>
  <rect x="260" y="250" width="70" height="8" fill="#6B5A4E"/>
  <path d="M276 250 l8 -60 h14 l8 60 z" fill="#E9C99A"/>
  <path d="M270 190 h50 l-10 -34 h-30 z" fill="#C24E3A"/>
  <circle cx="295" cy="200" r="70" fill="#FFE2A8" opacity="0.12"/>
  <rect x="0" y="330" width="390" height="190" fill="#2C2530"/>
  <rect x="30" y="300" width="330" height="40" rx="10" fill="#6B4A5E"/>
`);

const tekne = svg(`
  <rect width="390" height="520" fill="#F2C9A8"/>
  <rect y="0" width="390" height="120" fill="#E7B7A0"/>
  <rect y="120" width="390" height="90" fill="#F2C9A8"/>
  <circle cx="250" cy="236" r="40" fill="#F9DDA0"/>
  <path d="M40 90 q40 -14 80 0 q30 -10 60 0" stroke="#F6E2D2" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M230 60 q30 -10 60 0" stroke="#F6E2D2" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M0 236 C60 226 90 230 130 232 L130 240 L0 240 Z" fill="#A98F86"/>
  <rect x="44" y="214" width="7" height="22" fill="#FFFDF8"/><rect x="44" y="220" width="7" height="4" fill="#B5432A"/><rect x="42" y="208" width="11" height="7" fill="#2B2622"/>
  <path d="M300 238 C330 228 360 228 390 234 L390 240 L300 240 Z" fill="#B49A8E"/>
  <rect x="338" y="226" width="12" height="9" fill="#FFFDF8"/><path d="M336 227 L344 220 L352 227 Z" fill="#B5432A"/>
  <rect y="238" width="390" height="282" fill="#4F86A0"/>
  <path d="M250 246 l-30 0 M250 262 l40 0 M250 280 l-50 0 M250 300 l60 0" stroke="#F9DDA0" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  <path d="M20 300 h40 M110 330 h50 M300 340 h40 M60 370 h60" stroke="#8CC0D6" stroke-width="3" stroke-linecap="round"/>
  ${[[150, 330], [168, 342], [140, 350], [180, 326], [160, 360]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#C0392B"/><path d="M${x} ${y + 4} l-4 10" stroke="#4C8A5A" stroke-width="2"/>`).join('')}
  <path d="M-10 520 L40 410 L350 410 L400 520 Z" fill="#8A5D38"/>
  <path d="M40 410 L350 410 L344 424 L46 424 Z" fill="#A9774A"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${30 + i * 4} ${440 + i * 14} L${360 - i * 4} ${440 + i * 14}" stroke="#7A5232" stroke-width="2"/>`).join('')}
  <rect x="30" y="378" width="8" height="40" fill="#5A3E28"/><rect x="352" y="378" width="8" height="40" fill="#5A3E28"/>
  <path d="M34 380 L356 380" stroke="#F6EFE2" stroke-width="5" stroke-linecap="round"/>
  <path d="M190 412 c0 -30 10 -50 30 -56" stroke="#D9C9A8" stroke-width="5" fill="none" stroke-linecap="round"/>
`);

/** Inside the lantern room at the top of the lighthouse, during the storm. */
const firtina = svg(`
  <rect width="390" height="520" fill="#0B1824"/>
  <path d="M260 0 L230 90 L250 92 L215 190" stroke="#DCE8F2" stroke-width="3" fill="none" opacity="0.7"/>
  ${Array.from({ length: 34 }, (_, i) => {
    const x = (i * 53) % 400;
    const y = (i * 97) % 300;
    return `<path d="M${x} ${y} l-10 34" stroke="#6E8CA6" stroke-width="2" opacity="0.55"/>`;
  }).join('')}
  <path d="M0 330 q40 -30 80 0 t80 0 t80 0 t80 0 t80 0 V520 H0 Z" fill="#12293A"/>
  <path d="M0 360 q40 -24 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#3E6683" stroke-width="3" fill="none"/>
  <path d="M195 210 L-40 120 L-40 330 Z" fill="#FFE9A8" opacity="0.22"/>
  <rect x="20" y="60" width="350" height="300" fill="none" stroke="#2B3A46" stroke-width="10"/>
  <path d="M137 60 V360 M253 60 V360" stroke="#2B3A46" stroke-width="10"/>
  <path d="M20 160 H370" stroke="#2B3A46" stroke-width="6"/>
  <ellipse cx="195" cy="250" rx="70" ry="96" fill="#F7E6A8" opacity="0.9"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="195" cy="250" rx="${70 - i * 10}" ry="${96 - i * 13}" fill="none" stroke="#D9B85C" stroke-width="3"/>`).join('')}
  <circle cx="195" cy="250" r="16" fill="#FFF7D6"/>
  <circle cx="195" cy="250" r="110" fill="#FFE9A8" opacity="0.12"/>
  <rect x="150" y="346" width="90" height="20" fill="#3A3F44"/>
  <rect x="0" y="366" width="390" height="154" fill="#2B3035"/>
  <path d="M0 380 H390" stroke="#3F464C" stroke-width="4"/>
  <circle cx="300" cy="420" r="26" fill="none" stroke="#8A6A1E" stroke-width="6"/>
  <path d="M300 420 L326 400" stroke="#8A6A1E" stroke-width="6" stroke-linecap="round"/>
  <circle cx="326" cy="400" r="6" fill="#C9A24A"/>
  <rect x="50" y="400" width="70" height="80" rx="4" fill="#4A3A2E"/>
  <rect x="58" y="410" width="54" height="8" fill="#6E5440"/><rect x="58" y="430" width="54" height="8" fill="#6E5440"/>
`);

/** Hilmi's olive grove in the afternoon, the elder tree at the end of the rows. */
const zeytinlik = svg(`
  <rect width="390" height="520" fill="#F2E2BE"/>
  <circle cx="300" cy="90" r="34" fill="#F6CF86"/>
  <path d="M0 210 C80 180 160 200 230 186 C300 172 350 190 390 184 L390 520 L0 520 Z" fill="#C7B58A"/>
  <path d="M0 260 C90 236 200 250 390 236 L390 520 L0 520 Z" fill="#B9A577"/>
  ${[[40, 230, 0.7], [130, 222, 0.75], [230, 214, 0.7], [330, 222, 0.72], [80, 300, 1], [210, 296, 1.05], [340, 304, 1]].map(([x, y, k]) => `
    <g transform="translate(${x} ${y}) scale(${k})">
      <path d="M-6 0 C-10 -30 -2 -50 -8 -70 M6 0 C10 -26 4 -46 12 -64" stroke="#6E5A44" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="-84" rx="52" ry="30" fill="#8A9A6A"/><ellipse cx="-24" cy="-96" rx="30" ry="18" fill="#9DAA7E"/><ellipse cx="26" cy="-92" rx="28" ry="18" fill="#7E8E60"/>
    </g>`).join('')}
  <g transform="translate(300 420)">
    <path d="M0 0 V-90" stroke="#6E5A44" stroke-width="12"/>
    <ellipse cx="0" cy="-110" rx="62" ry="40" fill="#7E8E60"/>
    ${Array.from({ length: 22 }, (_, i) => `<circle cx="${((i * 37) % 100) - 50}" cy="${-110 + ((i * 23) % 50) - 25}" r="7" fill="#FBF8EC" stroke="#E6DCC0"/>`).join('')}
  </g>
  <path d="M0 470 C120 450 260 470 390 456 L390 520 L0 520 Z" fill="#A89464"/>
`);

export const BACKDROPS: Record<Backdrop, string> = { liman, cayevi, gece, fener, depo, telefon, tekne, firtina, zeytinlik };

/** Pamuk the cat, drawn in the same flat style as the portraits. */
export const PAMUK = svg(`
  <ellipse cx="120" cy="250" rx="78" ry="54" fill="#F4F1EA"/>
  <path d="M182 250 c40 -8 50 -50 30 -70" stroke="#F4F1EA" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M182 250 c40 -8 50 -50 30 -70" stroke="#E0DACE" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="2 10"/>
  <circle cx="110" cy="160" r="58" fill="#FBF8F2"/>
  <path d="M62 132 L58 76 L100 110 Z" fill="#FBF8F2"/><path d="M158 132 L162 76 L120 110 Z" fill="#FBF8F2"/>
  <path d="M68 124 L66 90 L92 112 Z" fill="#F1B7AA"/><path d="M152 124 L154 90 L128 112 Z" fill="#F1B7AA"/>
  <ellipse cx="88" cy="158" rx="11" ry="13" fill="#7FA35E"/><ellipse cx="132" cy="158" rx="11" ry="13" fill="#7FA35E"/>
  <ellipse cx="88" cy="160" rx="3.5" ry="10" fill="#1E1714"/><ellipse cx="132" cy="160" rx="3.5" ry="10" fill="#1E1714"/>
  <circle cx="91" cy="153" r="3" fill="#FFF"/><circle cx="135" cy="153" r="3" fill="#FFF"/>
  <path d="M104 182 h12 l-6 7 z" fill="#E58A86"/>
  <path d="M110 189 q-6 8 -14 4 M110 189 q6 8 14 4" stroke="#8A7E74" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M60 180 l-34 -6 M60 188 l-34 4 M160 180 l34 -6 M160 188 l34 4" stroke="#C9C2B8" stroke-width="1.6"/>
  <rect x="86" y="208" width="48" height="10" rx="5" fill="#1F4E6B"/><circle cx="110" cy="224" r="7" fill="#C9A24A"/>
`, '0 40 240 260');

export const TITLE_ART = liman;
