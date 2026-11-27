import type { CharId, Character } from '../types';

const P = (n: string) => `./assets/portraits/${n}.svg`;

export const CHARACTERS: Record<CharId, Character> = {
  deniz: {
    id: 'deniz', name: 'Deniz', role: 'Sen · çay evinin yeni sahibi',
    note: "İstanbul'dan bir yazlığına geldi. Belki.", drink: 'Henüz karar vermedi',
    portrait: P('deniz'), cut: P('deniz_cut'),
  },
  yusuf: {
    id: 'yusuf', name: 'Sessiz Amca', role: 'Her sabah pencere kenarında',
    note: 'Hiç konuşmuyor. Tavlada sana bir şeyler bırakıyor.', drink: 'Tavşan kanı çay, şekersiz',
    portrait: P('yusuf'), cut: P('yusuf_cut'),
  },
  sukran: {
    id: 'sukran', name: 'Şükran Hala', role: 'Emekli ebe',
    note: 'Kasabada olan biten her şeyi bilir. Neredeyse her şeyi.', drink: 'Ballı adaçayı',
    portrait: P('sukran'), cut: P('sukran_cut'),
  },
  cevdet: {
    id: 'cevdet', name: 'Cevdet', role: "Balıkçı, kaptan Rıza'nın oğlu",
    note: 'Fenerin adı geçince yüzü değişiyor.', drink: 'Sade Türk kahvesi',
    portrait: P('cevdet'), cut: P('cevdet_cut'), hiddenUntilMet: true,
  },
  elif: {
    id: 'elif', name: 'Elif', role: 'Hayalet avcısı, 15',
    note: 'Fenerde gece çekimleri yapıyor. 212 abonesi var.', drink: 'Limonata',
    portrait: P('elif'), cut: P('elif_cut'), hiddenUntilMet: true,
  },
  hilmi: {
    id: 'hilmi', name: 'Muhtar Hilmi', role: 'Kasabanın muhtarı',
    note: 'Limana otel yapılmasını çok istiyor.', drink: 'Neskafe (ah!)',
    portrait: P('hilmi'), cut: P('hilmi_cut'), hiddenUntilMet: true,
  },
  kemal: {
    id: 'kemal', name: 'Hırdavatçı Kemal', role: 'Çarşıdaki hırdavatçı, 62',
    note: 'Kasabanın bütün kilitlerini o takar. Anahtarlarını da o yapar.', drink: 'Ihlamur, limonlu',
    portrait: P('kemal'), cut: P('kemal_cut'), hiddenUntilMet: true,
  },
  anne: {
    id: 'anne', name: 'Annem', role: 'Telefonda, İstanbul',
    note: 'Bu kasabaya hiç gelmiyor. Nedenini söylemiyor.', drink: '—',
    hiddenUntilMet: true,
  },
  pamuk: {
    id: 'pamuk', name: 'Pamuk', role: 'Çay evinin kedisi',
    note: 'Babaannemden kalan tek canlı. Bir şeyler biliyor gibi.', drink: 'Süt',
    hiddenUntilMet: true,
  },
};

/** Order of cards in the town book. */
export const TOWN_ORDER: CharId[] = ['yusuf', 'sukran', 'elif', 'cevdet', 'hilmi', 'kemal', 'pamuk', 'anne', 'deniz'];
