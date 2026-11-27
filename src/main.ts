import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/700.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/700.css';
import './styles.css';
import { clearSave, load, newGame, seenEndings } from './engine/state';
import { CHAPTERS, ENDINGS, LAST_DAY, getDay } from './data/story';
import { play } from './game';
import { TITLE_ART } from './ui/art';
import { el } from './ui/dom';

const app = document.getElementById('app')!;

function showTitle(): void {
  const saved = load();
  const start = (fresh: boolean) => {
    if (fresh) clearSave();
    void play(fresh ? newGame() : saved ?? newGame(), app, showTitle);
  };

  const confirmNew = () => {
    if (!saved) return start(true);
    const box = el('div', { class: 'confirm', role: 'alertdialog', 'aria-label': 'Yeni oyun' },
      el('p', {}, 'Kayıtlı oyunun silinecek. Emin misin?'),
      el('div', { class: 'confirm-row' },
        el('button', { class: 'btn', onclick: () => box.remove() }, 'Vazgeç'),
        el('button', { class: 'btn danger', onclick: () => start(true) }, 'Sil ve başla'),
      ),
    );
    card.append(box);
  };

  const progress = saved
    ? saved.day > LAST_DAY ? 'Hikâye tamamlandı' : `${CHAPTERS[getDay(saved.day)!.chapter].label} · Gün ${saved.day}`
    : null;

  const card = el('div', { class: 'title-card' },
    el('h1', {}, 'Martı', el('br'), 'Çay Evi'),
    el('p', { class: 'hand quote' }, '“Fener yanarsa, Yusuf’a çay götür.”'),
    el('div', { class: 'title-actions' },
      saved
        ? el('button', { class: 'btn primary big continue', onclick: () => start(false) },
          el('span', {}, el('strong', {}, 'Devam et'), el('small', {}, progress!)))
        : null,
      el('button', { class: `btn big${saved ? '' : ' primary'}`, onclick: confirmNew }, saved ? 'Yeni oyun' : 'Başla'),
    ),
    el('p', { class: 'credit' }, endingsLine()),
  );

  app.replaceChildren(
    el('div', { class: 'screen title' },
      el('div', { class: 'title-art', html: TITLE_ART }),
      el('span', { class: 'title-kicker' }, 'YALIÇAM · 1976’DAN BERİ'),
      card,
    ),
  );
}

function endingsLine(): string {
  const n = ENDINGS.filter((e) => seenEndings().includes(e.flag)).length;
  return n ? `Bulduğun sonlar: ${n} / ${ENDINGS.length}` : 'Prolog ve 5 bölüm · 3 son';
}

showTitle();
