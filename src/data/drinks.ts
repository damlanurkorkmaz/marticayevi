import type { Drink, DrinkId, Recipe } from '../types';

export const DRINKS: Record<DrinkId, Drink> = {
  tavsan: { id: 'tavsan', name: 'Tavşan kanı çay', color: '#9E2F1E', price: 20, zone: [0.62, 0.8], speed: 0.55, verb: 'Demle' },
  adacayi: { id: 'adacayi', name: 'Ballı adaçayı', color: '#8FA37A', price: 25, zone: [0.35, 0.55], speed: 0.6, verb: 'Haşla' },
  limonata: { id: 'limonata', name: 'Limonata', color: '#EBCB5E', price: 30, zone: [0.45, 0.62], speed: 0.7, verb: 'Karıştır' },
  kahve: { id: 'kahve', name: 'Türk kahvesi', color: '#4A3326', price: 35, zone: [0.72, 0.84], speed: 0.8, verb: 'Pişir' },
};

export const DRINK_ORDER: DrinkId[] = ['tavsan', 'adacayi', 'limonata', 'kahve'];

export const RECIPES: Record<DrinkId, Recipe> = {
  tavsan: {
    id: 'tavsan',
    title: 'Tavşan kanı çay',
    steps: ['Rize çayı, iki tepeleme kaşık', 'Demliği önce sıcak suyla ısıt', '25 dakika demle, acele etme', 'İnce belli bardak, şekersiz'],
    memory: 'Y. hep böyle içerdi, fenerin merdivenlerinde. “Şeker acıyı saklar Nesrin, ben saklamam” derdi. Ben sakladım.',
  },
  adacayi: {
    id: 'adacayi',
    title: 'Ballı adaçayı',
    steps: ['Tepeden toplanmış adaçayı, bir avuç', 'Kaynamış suyu bir dakika dinlendir', 'Beş dakika, fazlası acılaştırır', 'Bir kaşık çam balı, en son'],
    memory: 'Şükran bunu sancılı gecelerde içer, sonra kimseye anlatmaz. O gece ikimiz de içtik.',
  },
  limonata: {
    id: 'limonata',
    title: 'Limonata',
    steps: ['Dört limon, kabuğuyla rendele', 'Şekerle ovup bir gece beklet', 'Sabah suyunu sık, soğuk su ekle', 'Nane yaprağı, iki tane'],
    memory: 'Çocuklar için. Bir gün bu tezgâhın önünde bir çocuk olacak, biliyorum. Ona da yaparım.',
  },
  kahve: {
    id: 'kahve',
    title: 'Türk kahvesi',
    steps: ['Bir fincan soğuk su, bir tepeleme kaşık kahve', 'Cezveyi en kısık ateşe koy', 'Köpük kabardığı an çek', 'Bir bardak suyla, sade'],
    memory: 'Rıza Kaptan sade içerdi. Oğlu da öyle içiyor. Fincanı her seferinde ters çeviriyor ama falına hiç bakmıyor.',
  },
};
