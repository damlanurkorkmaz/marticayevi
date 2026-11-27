import type { Day } from '../types';
import { D, N, bg, bond, flag, say } from './helpers';

// ---------------------------------------------------------------------------
// BÖLÜM 5 — "Fırtına Gecesi"
// Fifty years later, the same storm. Cevdet's engine fails on the same night
// his father's did, and this time the lighthouse is lit. Rıza's logbook,
// kept unread in the lantern room, shows the light would not have saved him.
// The player then decides who gets to know the truth: three endings.
// ---------------------------------------------------------------------------

const day25: Day = {
  n: 25, chapter: 5, title: 'Kepenkler', weekday: '31 Ağustos',
  morning: [
    bg('liman'),
    N('Rüzgâr dönmüş. Deniz bulanık, martılar karaya inmiş. Kasabada herkes pencerelerini çiviliyor.'),
    bg('cayevi'),
    N('Kemal Usta çay evinin camlarına tahta çakıyor. Her çekiç sesinde Pamuk tezgâhın altına biraz daha sokuluyor.'),
  ],
  visits: [
    {
      who: 'kemal',
      arrive: [say('kemal', 'Ihlamur. Çivilerin yarısı bitti, yarısı kaldı. Fırtına bizi beklemez.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Olsun evladım, eller titriyor bugün, seninki de benimki de.')],
      after: [
        say('kemal', 'Fenerin elektriği eski. Fırtınada kesilirse lamba yanmaz. Eskiden elle çevrilen bir kol vardı.'),
        say('kemal', 'Dişlileri elli yıldır pas tutmuş. Yarın Yusuf’la bakacağız. Yağ götürürüm.'),
        flag('kol'),
      ],
    },
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Kahve. Öbür gün akşamüstü karanfilleri bırakacağım. Fırtına gece yarısı gelir. Yetişirim.')],
      wants: 'kahve',
      right: [bond('cevdet')],
      wrong: [say('cevdet', 'Neyse.')],
      after: [
        {
          t: 'choice', prompt: 'Cevdet’e ne diyeceksin?',
          options: [
            {
              text: '“Bu sene gitmeyin, Cevdet Abi.”',
              then: [say('cevdet', 'Elli yıl her 2 Eylül gittim. Babamı yalnız bırakmadım. Bu sene de bırakmam.')],
            },
            {
              text: '“O zaman ben de geleyim.”',
              then: [say('cevdet', 'Olmaz. Bu benim işim. Sen telsizin başında dur. Babamın telsizi çalışıyor artık, değil mi?'), bond('cevdet'), flag('telsiz_nobet')],
            },
          ],
        },
        flag('cevdet_denize'),
      ],
    },
    {
      who: 'yusuf',
      arrive: [N('Yusuf Amca pencere kenarında. Gözü camlara çakılan tahtalarda, aralarından görünen fenerde.')],
      wants: 'tavsan',
      right: [
        bond('yusuf'),
        say('yusuf', 'Bu sene fener bütün gece yanacak. Elli yıl gizli gizli yaktım. Bu sene bekçi gibi yakacağım.'),
      ],
      wrong: [say('yusuf', 'Bugün değil. Bugün hiçbir şeyin tadı yok.')],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata. Annem fırtınada evden çıkmamı yasakladı. Ben de ona “tabii anne” dedim.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Fırtına öncesi yanlış limonata, kötü işaret. Şaka şaka.')],
      after: [say('elif', '2 Eylül gecesi neredeysen oradayım. Annem de bunu biliyor zaten, “tabii anne” lafına kimse inanmaz.')],
    },
  ],
};

const day26: Day = {
  n: 26, chapter: 5, title: 'Yıldız', weekday: '1 Eylül',
  morning: [
    bg('cayevi'),
    N('Sabah gökyüzü kurşun rengi. İskeledeki kırmızı bayrak rüzgârda yırtılacak gibi.'),
    {
      t: 'if', flag: 'anne_geliyor',
      then: [N('Yusuf Amca kapıda. Tıraş olmuş. Yeleği ütülü. Kasketini elinde tutuyor, başına takmıyor.'), D('Bu akşam geliyor, biliyorsun değil mi?'), say('yusuf', 'Biliyorum. Bütün gece uyumadım.')],
    },
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Yusuf Amca her zamanki yerinde. Ama bugün tavlayı açmıyor. Elleri dizlerinde.')],
      wants: 'tavsan',
      right: [bond('yusuf'), say('yusuf', 'Kemal’le kolu yağladık. Dönüyor. Ağır ama dönüyor.')],
      wrong: [say('yusuf', 'Kemal’le kolu yağladık. Dönüyor. Ağır ama dönüyor.')],
    },
    {
      who: 'sukran',
      arrive: [say('sukran', 'Harman yavrum. Yarın gece… elli yıl önce bu saatlerde Nesrin’in sancısı başlamıştı.')],
      wants: 'harman',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Olsun yavrum. Bugün dilimde hiçbir tat yok zaten.')],
    },
    {
      who: 'hilmi',
      arrive: [say('hilmi', 'Ballı adaçayı. Köyde nöbet listesi yaptım. Gece boyunca iskelede iki kişi bekleyecek.')],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Olsun, olsun.')],
      after: [say('hilmi', 'Cevdet’e denize çıkma dedim. Dinlemedi. Babası da dinlemezdi.')],
    },
  ],
  evening: [
    {
      t: 'if', flag: 'anne_geliyor',
      then: [
        bg('liman'),
        N('Akşam otobüsü iskelenin önünde duruyor. İnen tek yolcu: elinde küçük bir bavul, saçında bir tutam beyaz.'),
        say('anne', 'Burası… hiç değişmemiş. Hiç gelmedim ama bütün fotoğraflardan biliyorum.'),
        bg('cayevi'),
        N('Çay evinin kapısında biri bekliyor. Kasketi elinde.'),
        say('anne', 'Siz… Benim babamın adı Ahmet’ti.'),
        say('yusuf', 'Biliyorum. Ahmet iyi adamdı. Seni iyi büyüttü. Ben ona minnettarım.'),
        say('anne', 'Annem ateşliyken sizin adınızı sayıkladı. On yaşındaydım.'),
        N('Uzun bir sessizlik. Sonra Yusuf Amca kenara çekilip kapıyı tutuyor.'),
        say('yusuf', 'Gel, otur. Çay koyayım. Bu sefer ben koyayım.'),
        bond('anne', 3),
        bond('yusuf'),
        flag('anne_tanisti'),
      ],
      else: [
        bg('telefon'),
        say('anne', 'Haberleri izliyorum, fırtına yarın gece sizin oraya vuracakmış. Dikkat et, olur mu?'),
        {
          t: 'if', flag: 'anne_biliyor',
          then: [say('anne', 'Ona… Yusuf Bey’e söyle. Fırtına geçince geleceğim. Bir çay içeriz.')],
          else: [D('Anne, fırtına geçince buraya gel. Sana yüz yüze anlatmam gereken bir şey var.'), say('anne', 'Geleceğim. Söz.')],
        },
      ],
    },
  ],
};

const day27: Day = {
  n: 27, chapter: 5, title: 'Fırtına Gecesi', weekday: '2 Eylül',
  morning: [
    bg('cayevi'),
    N('2 Eylül. Elli yıl sonra. Deniz sabahtan beri kükrüyor. Dalgalar iskelenin üstünden aşıyor.'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Yusuf Amca çok erken geliyor. Kasketini takmış. Yüzü bir bekçi yüzü.')],
      wants: 'tavsan',
      right: [bond('yusuf'), say('yusuf', 'Akşamüstü fenere çıkıyorum. Bu gece kepengi kapatma. Işığın yansın.')],
      wrong: [say('yusuf', 'Akşamüstü fenere çıkıyorum. Bu gece kepengi kapatma. Işığın yansın.')],
    },
    {
      who: 'sukran',
      arrive: [say('sukran', 'Harman yavrum. Bu gece burada kalacağım. Evimde duramam.')],
      wants: 'harman',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Olsun.')],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata. Telsizin pilini değiştirdim. Kemal Usta’dan el telsizi de aldım. Hazırız.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Neyse, bugün limonata kimsenin aklında değil.')],
    },
  ],
  evening: [
    bg('cayevi'),
    N('Saat yedi. Cevdet beşte iskeleden çıktı. Karanfilleri bırakıp dönecekti. Dönmedi.'),
    N('Tezgâhın üstünde Rıza Kaptan’ın telsizi cızırdıyor. Sonra bir ses. Elli yıl önceki sesin aynısı.'),
    say('anlatici', 'Cevdet’in sesi: “Yıldız II’den kıyıya… Motor durdu. Sürükleniyorum. Kayalık nerede göremiyorum. Hiçbir şey göremiyorum.”'),
    N('O anda bütün kasabanın ışıkları sönüyor. Elektrik kesildi. Pencereden bakıyorsun: fener de karanlık.'),
    say('sukran', 'Aynı gece. Aynı gece, Allah’ım.'),
    {
      t: 'choice', prompt: 'Ne yapacaksın?',
      options: [
        {
          text: 'Fenere koş, telsizi Elif’e bırak',
          then: [say('elif', 'Git! Ben buradayım. Cevdet Abi’yle konuşmaya devam edeceğim. Kemal Usta’nın el telsizi sende kalsın.'), flag('elif_telsizde')],
        },
        {
          text: 'Cevdet’le konuş, sonra fenere koş',
          then: [
            D('Cevdet Abi, beni duyuyor musun? Fener birazdan yanacak. Kayalığın gölgesine bakma, ışığa bak.'),
            say('anlatici', 'Telsizden Cevdet: “…Duyuyorum. Bekliyorum. Çabuk ol.”'),
            bond('cevdet'),
            say('elif', 'Git! Telsiz bende.'),
            flag('elif_telsizde'),
          ],
        },
      ],
    },
  ],
  night: [
    bg('firtina'),
    N('Fenerin merdivenleri yüz on iki basamak. Rüzgâr kapıyı yüzüne çarpıyor. Yukarıda, lamba odasında Yusuf Amca.'),
    N('Elektrik yok. Lamba sönük. Yusuf Amca duvardaki demir kolu çeviriyor. Kol ağır. Dizi titriyor. Kol ancak yarım tur dönüyor.'),
    say('yusuf', 'Gaz lambası yandı. Ama mercek dönmeden ışık kayalığa ulaşmaz. Kolu çevirmemiz lazım. Yalnız çeviremiyorum.'),
    {
      t: 'ifBond', who: ['kemal'], min: 3,
      then: [
        N('Merdivenlerden ayak sesleri. Kemal Usta, elinde yağdanlık ve büyük bir İngiliz anahtarı.'),
        say('kemal', 'Elli yıllık pas, bir gecede söker mi? Söker. Çek, Yusuf! Çek!'),
        N('Üç el aynı kolda. Dişliler gıcırdıyor, sonra birden boşalıyor. Mercek dönmeye başlıyor.'),
      ],
      else: [
        N('Kolun öbür ucuna geçiyorsun. Birlikte çekiyorsunuz. Avuçların yanıyor. Bir tur. İki tur.'),
        N('Dişliler gıcırdıyor, sonra birden boşalıyor. Mercek dönmeye başlıyor.'),
      ],
    },
    N('Işık lamba odasından taşıyor. Fırtınanın içinden, koyun üzerinden geçiyor. Bir. İki. Üç.'),
    say('anlatici', 'El telsizinden Elif’in sesi: “Görüyor! Cevdet Abi ışığı görüyor! Kayalığın yerini görüyor!”'),
    say('yusuf', 'Gölgeye girmesin. Işık döndükçe kayalığın gölgesi görünür. Söyle ona: gölgeden uzak dursun.'),
    {
      t: 'choice', prompt: 'El telsizine ne diyeceksin?',
      options: [
        {
          text: '“Gölgeden uzak dur, ışığın içinde kal!”',
          then: [N('Telsizden Cevdet’in sesi geliyor, rüzgârın içinden: “Tamam… Tamam… Görüyorum…”')],
        },
        {
          text: 'Telsizi Yusuf’a uzat',
          then: [
            N('Yusuf telsizi titreyen eliyle alıyor. Bir an susuyor. Sonra bekçi sesiyle konuşuyor.'),
            say('yusuf', 'Cevdet. Ben fenerin bekçisi. Işığı takip et. Bu gece yerimdeyim. Seni eve getireceğim.'),
            N('Telsizden uzun bir hışırtı. Sonra: “…Tamam, amca.”'),
            bond('yusuf'),
            flag('yusuf_telsiz'),
          ],
        },
      ],
    },
    N('Saatler sonra, sabaha karşı, rüzgâr dinmeye başlıyor. Telsizden Elif’in sesi: “Limana girdi! Cevdet Abi limanda! Hilmi amcalar ipi attı!”'),
    N('Yusuf Amca demir kolun dibine oturuyor. Yüzünü ellerine gömüyor. Omuzları sarsılıyor.'),
    say('yusuf', 'Elli yıl sonra. Elli yıl sonra yerimdeydim.'),
    N('Kolun yanındaki eski dolabın kapağı fırtınada açılmış. İçinde yağlı bir beze sarılı bir paket. Üstünde: “Yıldız — Jandarma teslim, 1976”.'),
    say('yusuf', 'Rıza’nın seyir defteri. Kıyıya vurmuştu. Jandarma bekçi odasında dursun diye bana bıraktı. Elli yıl açamadım.'),
    { t: 'item', id: 'seyir', name: 'Yıldız’ın seyir defteri' },
    {
      t: 'choice', prompt: 'Defteri açacak mısın?',
      options: [
        { text: 'Önce Cevdet okusun', then: [say('yusuf', 'Doğru. Onun babası. Onun hakkı.'), bond('yusuf'), flag('defter_cevdete')] },
        { text: 'Son sayfaya bak', then: [N('Son sayfayı açıyorsun. Rıza Kaptan’ın el yazısı. İlk satırı okuyunca defteri kapatıyorsun. Bunu Cevdet okumalı.')] },
      ],
    },
    flag('seyir_defteri'),
    { t: 'card', title: 'Fener yandı', subtitle: 'Bu kez bütün gece' },
  ],
};

const day28: Day = {
  n: 28, chapter: 5, title: 'Seyir Defteri', weekday: '3 Eylül',
  morning: [
    bg('liman'),
    N('Sabah. Deniz cam gibi. İskelede kırık sandıklar, kopmuş halatlar. Yıldız II iskeleye bağlı. Direği kırık ama yüzüyor.'),
    {
      t: 'if', flag: 'anne_tanisti',
      then: [],
      else: [
        N('İlk sabah otobüsünden annen iniyor. Seni görünce bavulunu bırakıp koşuyor.'),
        say('anne', 'Haberleri izledim, bütün gece uyumadım. İyi misin? Çok şükür.'),
        N('Arkandan biri yaklaşıyor. Kasketi elinde. Annen onu görünce duraksıyor.'),
        say('yusuf', 'Yıldız.'),
        say('anne', '…Siz.'),
        say('yusuf', 'Gel, otur. Çay koyayım. Bu sefer ben koyayım.'),
        bond('anne', 3),
        flag('anne_tanisti'),
      ],
    },
    bg('cayevi'),
  ],
  visits: [
    {
      who: 'cevdet',
      arrive: [N('Cevdet bir battaniyeye sarılı. Yüzünde tuz, ellerinde ip yanıkları. Kapıda duruyor.'), say('cevdet', 'Kahve. Sade. Nesrin’in yaptığı gibi.')],
      wants: 'kahve',
      right: [bond('cevdet'), say('cevdet', 'Nesrin’in yaptığı gibi.')],
      wrong: [say('cevdet', 'Bugün ne getirsen içerim.')],
      after: [
        N('Yağlı bezi açıp seyir defterini önüne koyuyorsun. Cevdet babasının el yazısını görünce gözlerini kapatıyor.'),
        N('Son sayfayı açıyor. Yüksek sesle okuyor. Sesi titriyor.'),
        say('cevdet', '“02.09.76, 23.40. Motor durdu. Dümen kırık. Koyun dört mil açığında sürükleniyoruz. Kürek tutmuyor.”'),
        say('cevdet', '“Fener yanmıyor. Ama görsem de dönemezdim, dümen yok. Bunu yazıyorum ki kimse kendini suçlamasın.”'),
        say('cevdet', '“Kayık karşı kıyıya varmış. Ebenin evinin ışığını gördüm. İyi. Çok iyi. — R.”'),
        N('Kimse konuşmuyor. Pencere kenarındaki sandalye gıcırdıyor. Yusuf Amca ayağa kalkmış.'),
        say('cevdet', 'Babam biliyormuş. Kurtardığını biliyormuş.'),
        {
          t: 'ifBond', who: ['cevdet'], min: 3,
          then: [
            N('Cevdet kalkıyor. Yusuf’un karşısına geçiyor. Elini uzatıyor.'),
            say('cevdet', 'Elli yıl, amca. Elli yıl ikimiz de yanlış şeyi taşımışız.'),
            N('Yusuf eli tutuyor. Bırakmıyor.'),
            flag('baris'),
          ],
          else: [
            N('Cevdet Yusuf’a bakıyor. Uzun uzun. Sonra başını bir kez sallıyor.'),
            say('cevdet', 'Ne diyeceğimi bilmiyorum. Zaman lazım. Ama artık kızmıyorum. Bunu bil.'),
          ],
        },
      ],
    },
    {
      who: 'yusuf',
      arrive: [N('Yusuf Amca yerine dönüyor. Bu sabah karşısındaki sandalyede annen oturuyor.')],
      wants: 'tavsan',
      right: [bond('yusuf'), say('yusuf', 'Rengi açık. Bugün gülüyor.')],
      wrong: [say('yusuf', 'Fark etmez. Bugün hiçbir şey fark etmez.')],
    },
  ],
  evening: [
    bg('cayevi'),
    N('Akşam. Fırtınanın ellinci yıl anması. İlk kez çay evinde. Bütün kasaba burada. Herkes sana bakıyor.'),
    N('Annen bir yanında, Yusuf Amca öbür yanında. Cebinde mektuplar, kaset, seyir defteri. Elli yıllık bir hikâyenin bütün parçaları.'),
    {
      t: 'choice', prompt: 'Son kararın: gerçeği kim bilecek?',
      options: [
        {
          text: 'Ayağa kalk ve herkese anlat',
          then: [
            {
              t: 'ifBond', who: ['cevdet', 'sukran', 'elif'], min: 3,
              then: [
                D('Elli yıl önce bu gece, fenerin bekçisi görevini bıraktı. Bir doğum için. O bebek annemdi.'),
                N('Şükran Hala ayağa kalkıyor. “Doğru. Ben doğurttum.” Elif kaseti çalıyor. Cevdet seyir defterinin son satırını okuyor.'),
                N('Çay evi uzun süre susuyor. Sonra Hilmi kalkıyor, cebinden paslı bir anahtar çıkarıyor.'),
                say('hilmi', 'Bekçi evinin anahtarı. Köy adına. Yusuf Usta, fenerin bekçisi sensin. Hep sendin.'),
                N('O gece bütün kasaba fenere yürüyor. Kolu sırayla çeviriyorlar. Yusuf, Cevdet, Kemal, Hilmi, Elif, annen, sen.'),
                N('Işık koyun üstünden geçiyor ve kıyıdaki eski yazlık sinemanın soluk tabelasını aydınlatıyor. Elif fısıldıyor: “Orası da ne?”'),
                flag('son_fener'),
                { t: 'card', title: 'Son: Fener Yanıyor', subtitle: 'Martı Çay Evi açık kalıyor' },
              ],
              else: [
                D('Elli yıl önce bu gece, fenerin bekçisi görevini bıraktı. Bir doğum için…'),
                N('Uğultu. Biri “Şimdi mi söylüyorsunuz?” diyor. Arka masalardan biri kalkıp çıkıyor. Kasaba henüz hazır değil.'),
                N('Yusuf Amca elini koluna koyuyor. Çok hafifçe.'),
                say('yusuf', 'Yeter. Ailem bildi. Bu bana yeter.'),
                N('Ertesi sabah pencere kenarında iki sandalye dolu. Annen ve Yusuf. Konuşuyorlar. Elli yılın sözlerini bir sabaha sığdırmaya çalışıyorlar.'),
                flag('son_aile'),
                { t: 'card', title: 'Son: Aile Sırrı', subtitle: 'Kasaba hazır değildi. Aile hazırdı.' },
              ],
            },
          ],
        },
        {
          text: 'Sadece ailenle paylaş',
          then: [
            N('Anma bitiyor. Kasaba dağılıyor. Kepengi indiriyorsun. İçeride sadece üç kişi kalıyor.'),
            N('Mektupları masaya koyuyorsun. Annen birini açıyor. Okurken ağlıyor. Yusuf Amca onun bardağını dolduruyor.'),
            N('Kasaba hiçbir şey öğrenmiyor. Yusuf herkes için yine “Sessiz Amca”. Ama her sabah pencere kenarında artık iki sandalye dolu.'),
            say('yusuf', 'Elli yıl bir sır taşıdım. Şimdi üç kişi taşıyoruz. Çok daha hafif.'),
            flag('son_aile'),
            { t: 'card', title: 'Son: Aile Sırrı', subtitle: 'Pencere kenarında iki sandalye' },
          ],
        },
        {
          text: 'Hiçbir şey söyleme, çay evini sat',
          then: [
            N('Anmada hiçbir şey söylemiyorsun. Ertesi hafta İstanbul’dan bir emlakçı geliyor. İmzalar atılıyor.'),
            N('Son gün kepengi kendi elinle indiriyorsun. Pamuk’u bir kutuya koyuyorsun. Tarif defterini Yusuf Amca’nın masasına bırakıyorsun.'),
            N('Otobüs kasabadan çıkarken arka camdan bakıyorsun. Fener bir kez yanıyor. Sonra sönüyor.'),
            flag('son_kepenk'),
            { t: 'card', title: 'Son: Kepenk', subtitle: 'Bazı kapılar kapanınca da açık kalır' },
          ],
        },
      ],
    },
  ],
  chapterEnd: {
    title: 'Yalıçam’daki ilk yaz bitti',
    text: 'Fener elli yıl sonra yerine kavuştu. Ulaştığın son yukarıdaydı. Diğer sonlar başka seçimlerin, başka bağların arkasında saklı.',
  },
};

export const CHAPTER_5: Day[] = [day25, day26, day27, day28];

/** Ending flags and their titles, in order of how hard they are to reach. */
export const ENDINGS: { flag: string; title: string }[] = [
  { flag: 'son_fener', title: 'Fener Yanıyor' },
  { flag: 'son_aile', title: 'Aile Sırrı' },
  { flag: 'son_kepenk', title: 'Kepenk' },
];
