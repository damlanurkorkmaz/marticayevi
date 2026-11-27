import type { Backdrop, CharId, Day, Node, Speaker } from '../types';

// Small helpers so the script reads like a script.
export const say = (who: Speaker, text: string): Node => ({ t: 'say', who, text });
export const N = (text: string): Node => say('anlatici', text);
export const D = (text: string): Node => say('deniz', text);
export const bond = (who: CharId, n = 1): Node => ({ t: 'bond', who, n });
export const flag = (name: string): Node => ({ t: 'flag', name });
export const bg = (b: Backdrop): Node => ({ t: 'backdrop', bg: b });

/** Sessiz Amca's everyday visit: he only ever wants one thing. */
export const yusufDaily = (extra: Node[] = []): Day['visits'][number] => ({
  who: 'yusuf',
  arrive: [N('Sessiz Amca her sabahki gibi pencere kenarında. Tavlanın pullarını diziyor ve boş bardağına hafifçe vuruyor.')],
  wants: 'tavsan',
  right: [N('Bir yudum. Başını sallıyor. Pencere, fener, tavla. Her sabah aynı.'), bond('yusuf'), ...extra],
  wrong: [N('Bardağı yine kenara itiyor. Bu adam ne istediğini biliyor ve başka hiçbir şey istemiyor.')],
});
