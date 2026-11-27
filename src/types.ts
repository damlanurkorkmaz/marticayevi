// Shared game types. Story content lives in src/data and is pure data,
// so writers can add days and scenes without touching the engine.

export type CharId = 'deniz' | 'yusuf' | 'sukran' | 'cevdet' | 'elif' | 'hilmi' | 'kemal' | 'anne' | 'pamuk';
export type Speaker = CharId | 'anlatici';
export type DrinkId = 'tavsan' | 'adacayi' | 'kahve' | 'limonata' | 'ihlamur' | 'harman';
/** Short staged moments drawn over the backdrop. */
export type AnimName = 'kepenk_ac' | 'kepenk_kapa' | 'otobus_gelir' | 'otobus_gider' | 'fener_yanar' | 'simsek' | 'elektrik_kesik' | 'telefon';

export type Backdrop = 'liman' | 'cayevi' | 'gece' | 'fener' | 'depo' | 'telefon' | 'tekne' | 'firtina';

/** A single step in a scripted scene. Scenes are arrays of nodes run in order. */
export type Node =
  | { t: 'say'; who: Speaker; text: string }
  | { t: 'choice'; prompt?: string; options: ChoiceOption[] }
  | { t: 'bond'; who: CharId; n: number }
  | { t: 'flag'; name: string }
  | { t: 'money'; n: number }
  | { t: 'recipe'; id: DrinkId }
  | { t: 'item'; id: string; name: string }
  | { t: 'if'; flag: string; then: Node[]; else?: Node[] }
  /** Runs `then` when every listed character's bond is at least `min`. */
  | { t: 'ifBond'; who: CharId[]; min: number; then: Node[]; else?: Node[] }
  | { t: 'backdrop'; bg: Backdrop }
  | { t: 'card'; title: string; subtitle?: string }
  /** Brings a character on screen. A visit containing one starts with an empty counter. */
  | { t: 'enter'; who: CharId }
  | { t: 'anim'; name: AnimName };

export interface ChoiceOption {
  text: string;
  then: Node[];
}

/** One customer visit during the morning service. */
export interface Visit {
  who: CharId;
  /** Shown before the player picks a drink. Should hint at what they want. */
  arrive: Node[];
  wants: DrinkId;
  right: Node[];
  wrong: Node[];
  /** Optional scene after either outcome. */
  after?: Node[];
}

export interface Day {
  n: number;
  chapter: number;
  /** Short label shown on the day card, e.g. "Kepenk". */
  title: string;
  weekday: string;
  morning: Node[];
  visits: Visit[];
  evening?: Node[];
  night?: Node[];
  /** When set, finishing this day ends the chapter and shows this card. */
  chapterEnd?: { title: string; text: string };
}

export interface Drink {
  id: DrinkId;
  name: string;
  color: string;
  price: number;
  /** Brewing mini-game: the needle must stop inside [zoneStart, zoneEnd] (0..1). */
  zone: [number, number];
  /** Needle speed in full sweeps per second. Higher is harder. */
  speed: number;
  verb: string;
}

export interface Recipe {
  id: DrinkId;
  title: string;
  steps: string[];
  memory: string;
}

export interface Character {
  id: CharId;
  name: string;
  role: string;
  note: string;
  drink: string;
  portrait?: string;
  cut?: string;
  /** Same as `cut` with the mouth open; alternated with it while the character talks. */
  talk?: string;
  /** Characters hidden from the town book until they are met. */
  hiddenUntilMet?: boolean;
}

export interface GameState {
  version: 1;
  day: number;
  money: number;
  bonds: Partial<Record<CharId, number>>;
  met: CharId[];
  flags: string[];
  recipes: DrinkId[];
  items: { id: string; name: string }[];
  served: number;
  perfect: number;
  chapterDone: number[];
}
