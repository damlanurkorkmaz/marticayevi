import type { Day } from '../types';
import { A, bg, bond, D, flag, hide, N, say, show, yusufDaily } from './helpers';

// ---------------------------------------------------------------------------
// BÖLÜM 3 — "Yıldız'ın Hikâyesi"
// Cevdet opens up about the storm night. His father's cassette reveals that
// Rıza went out to help a small boat heading for Şükran's house. Pamuk finds
// Nesrin's unsent letters. The chapter ends with the silent man's name.
// Not revealed yet (chapter 4): who was in the boat, and why.
// ---------------------------------------------------------------------------

const day13: Day = {
  n: 13, chapter: 3, title: 'Boş Sandalye', weekday: 'Cumartesi',
  morning: [
    bg('cayevi'),
    N('Toplantının ertesi sabahı. Saat sekiz, dokuz, on. Pencere kenarındaki sandalye boş.'),
    show('tavla'),
    N('Tavla dün geceden beri masada duruyor. Kapalı. Kimse dokunmuyor. Kasabalılar ona bakıp fısıldaşıyor.'),
    hide,
    say('elif', 'Kasketli. Topal. Elli yıldır anahtarı cebinde. Ve dün gece bütün kasabada bir tek o yoktu.'),
    {
      t: 'choice', prompt: 'Elif’e ne diyeceksin?',
      options: [
        {
          text: '“Ben de aynı şeyi düşünüyorum.”',
          then: [say('elif', 'Biliyordum! Ama dikkatli olalım. Kanıt duvarına sadece kurşun kalemle yazıyorum.'), bond('elif'), flag('elif_ortak')],
        },
        {
          text: '“Kimseyi suçlamadan önce emin olalım.”',
          then: [say('elif', 'Hıh. Haklısın galiba. İyi gazeteci acele etmez. Annem öyle der. Annem muhasebeci.'), flag('elif_sabir')],
        },
      ],
    },
  ],
  visits: [
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Kahve.'), N('Gözü pencere kenarındaki boş sandalyede.')],
      wants: 'kahve',
      right: [bond('cevdet')],
      wrong: [say('cevdet', 'Bugün kahvenin tadına bakacak hâlde değilim zaten.')],
      after: [
        say('cevdet', 'Dün gece fener yanarken o adam neredeydi? Bütün kasaba buradaydı. Bir tek o yoktu.'),
        {
          t: 'choice', prompt: 'Cevdet’e ne soracaksın?',
          options: [
            { text: '“Onun adı ne, Cevdet Abi?”', then: [say('cevdet', 'O adamın adını bu kasabada kimse söylemez. Ben de söylemem.'), flag('isim_yasak')] },
            { text: '“Neden ona bu kadar kızgınsınız?”', then: [say('cevdet', 'Kızgın değilim. Kızgınlık geçer. Benimki elli yıldır geçmedi.'), flag('isim_yasak')] },
          ],
        },
      ],
    },
    {
      who: 'hilmi',
      arrive: [
        {
          t: 'if', flag: 'hilmi_istifa',
          then: [N('Hilmi içeri giriyor. Takım elbise yok, kravat yok. Sırtında eski bir hırka. Artık muhtar değil.')],
          else: [N('Hilmi içeri giriyor. Yüzü yorgun ama bir şekilde hafiflemiş gibi.')],
        },
        say('hilmi', 'Ballı adaçayı. Ve… teşekkür. Ya da özür. Hangisi uygunsa.'),
      ],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Bunu da hak ettim herhalde.')],
      after: [
        say('hilmi', 'Zeytinliğe alıcı çıktı. Parayı otelciye geri veriyorum. Bekçi evi köyde kalıyor.'),
        say('hilmi', 'Bir de şunu bil: o kilidin anahtarını kimseye vermedim. Ben de bilmiyorum fenere kim giriyor.'),
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata. Bugün düşünme günü.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Düşünürken fark etmiyorum zaten.')],
    },
  ],
  night: [
    bg('gece'),
    A('fener_yanar'),
    N('Gece yarısı. Fener yine yanıyor. Bu sefer pencereden izlemekle yetinmek istemiyorsun.'),
    {
      t: 'choice',
      options: [
        {
          text: 'Tek başına fenere git',
          then: [
            bg('fener'),
            N('Asma kilit açık, kapı aralık. Yukarıdan, merdivenlerin tepesinden sarı bir ışık süzülüyor.'),
            D('Kim var orada?'),
            N('Işık anında sönüyor. Sessizlik. Sonra merdivenlerden aşağı, yavaş, aksak ayak sesleri.'),
            N('Kayaların arkasına saklanıyorsun. Kasketli bir siluet kapıyı kilitliyor ve kayalıklardan aşağı, çay evine doğru yürüyor.'),
            flag('takip'),
          ],
        },
        {
          text: 'Pencereden izle',
          then: [N('Bir saat sonra fener sönüyor. Az sonra çay evinin önünden aksak bir ayak sesi geçiyor. Kepengin önünde bir an duruyor. Sonra uzaklaşıyor.')],
        },
      ],
    },
  ],
};

const day14: Day = {
  n: 14, chapter: 3, title: 'Babamın Telsizi', weekday: 'Pazar',
  morning: [
    bg('cayevi'),
    show('telsiz'),
    N('Pazar sabahı Cevdet elinde eski, paslı bir telsizle geliyor. Ağır, gri, kulpları kırık.'),
    say('cevdet', 'Babamın. Kemal Usta pazar dükkân açmaz. Burada bakacakmış. Masanı kullanıyoruz, kusura bakma.'),
    N('Telsizin yan tarafında küçük bir kaset kapağı var. İçinde elli yıllık bir kaset sıkışmış.'),
    say('cevdet', 'Babam bütün telsiz konuşmalarını kasete kaydederdi. Sigortacılar için. Bu kaset o geceden kalma olmalı.'),
    hide,
    flag('kaset_var'),
  ],
  visits: [
    {
      who: 'kemal',
      arrive: [say('kemal', 'Önce ıhlamur. Sonra telsiz. Usta işi aceleye gelmez.')],
      wants: 'ihlamur',
      right: [bond('kemal'), say('kemal', 'Eline sağlık. Şimdi bakalım şu emektara.')],
      wrong: [say('kemal', 'Olsun. Usta işi aceleye gelmez dedim ama sen de gelme.')],
      after: [
        N('Kemal Usta telsizi açıyor. İçinden toz, tuz ve kurumuş bir yosun parçası çıkıyor.'),
        say('kemal', 'Kaset sağlam gibi. Ama kafası paslanmış. Yarın parça getiririm. Pazartesi akşam dinleriz.'),
      ],
    },
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Bana da bir kahve. Bu telsizi elli yıldır açmadım. Elim titriyor.')],
      wants: 'kahve',
      right: [bond('cevdet')],
      wrong: [say('cevdet', 'Fark etmez.')],
      after: [
        say('cevdet', 'O gece sekiz yaşındaydım. Fırtına uyarısı vardı. Kimse denize çıkmadı. Babam çıktı.'),
        say('cevdet', 'Annem yalvardı. Babam “Koyda biri kalmış, ben kimseyi denizde bırakmam” dedi. Kapıyı kapattı.'),
        say('cevdet', 'Fener yansaydı kayalığı görürdü. Bekçi yerinde değildi. Elli yıl bunu düşündüm. Başka bir şey düşünemedim.'),
        bond('cevdet'),
        flag('koyda_biri'),
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata! Ve kütüphaneden bir şey getirdim. Hazır mısın?')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Neyse, asıl haber bu.')],
      after: [
        N('Elif bir gazete fotokopisi uzatıyor. 4 Eylül 1976 tarihli yerel gazete.'),
        N('“Fırtınada balıkçı teknesi battı. Kaptan Rıza Yıldırım hayatını kaybetti. Fener bekçisi Y. A.’nın görevi başında olmadığı tespit edildi.”'),
        { t: 'item', id: 'gazete', name: '1976 gazete kupürü' },
        say('elif', 'Y. A. Pulun üstündeki harf de Y’ydi. Tesadüf mü?'),
        flag('gazete'),
      ],
    },
  ],
  evening: [
    bg('telefon'),
    say('anne', 'Sesin bir tuhaf. Bir şey mi oldu?'),
    D('Anne, babaannem hiç Rıza Kaptan’dan bahsetti mi? Ya da 1976 fırtınasından?'),
    say('anne', 'Fırtına mı? Ben o yıl doğmuşum. Babaannen hep “Sen fırtınayla geldin” derdi. Şakadan sanırdım.'),
    flag('firtinayla_geldin'),
  ],
};

const day15: Day = {
  n: 15, chapter: 3, title: 'Gevşek Tahta', weekday: 'Pazartesi',
  morning: [
    bg('cayevi'),
    N('Pazartesi sabahı pencere kenarındaki sandalyede biri oturuyor.'),
    N('Sessiz Amca geri dönmüş. Kasketini masaya bırakmış. Elleri tavlanın kapağının üstünde.'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Seni görünce bir an tereddüt ediyor. Sonra tavlayı açıyor. Pulları tek tek diziyor.')],
      wants: 'tavsan',
      right: [
        N('Bir yudum. Başını sallıyor. Sonra çok kısa bir an gülümsüyor. Geri döndüğü için bir özür gibi.'),
        bond('yusuf'),
        { t: 'if', flag: 'takip', then: [N('Kasketinin kenarında kuru, beyaz bir tuz izi. Kayalıkların tuzu.')] },
      ],
      wrong: [N('Bardağa bakıyor, sonra sana. Yorgun bir bakış. Bugün itiraz edecek gücü yok, yine de içmiyor.')],
    },
    {
      who: 'sukran',
      arrive: [N('Şükran Hala toplantıdan beri ilk kez geliyor. Kapıda Sessiz Amca’yı görünce duraksıyor.'), say('sukran', 'Adaçayı yavrum. Ballı.')],
      wants: 'adacayi',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Olsun yavrum, olsun.')],
      after: [
        say('sukran', 'O gece bardağı kırdım ya. Yaşlılık. Elim kaydı.'),
        {
          t: 'choice', prompt: 'Üstüne gidecek misin?',
          options: [
            {
              text: '“Hala, o gece fenere bakıp neden korktunuz?”',
              then: [
                N('Uzun bir sessizlik. Gözü pencere kenarındaki adamda.'),
                say('sukran', 'Bazı sırlar benim değil yavrum. Sahibi anlatsın. Sahibi anlatmazsa ben de anlatamam.'),
                flag('sukran_sahibi'),
              ],
            },
            { text: '“Önemli değil Hala, bardak dediğin kırılır.”', then: [say('sukran', 'Kırılır. Ama bazı şeyler kırılınca sesi elli yıl gider.'), bond('sukran')] },
          ],
        },
      ],
    },
    {
      who: 'kemal',
      arrive: [say('kemal', 'Parçayı buldum. Akşam dinleriz. Ihlamur, limonlu.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Bunu da içeriz, ne olacak.')],
    },
  ],
  evening: [
    bg('cayevi'),
    N('Kepenk yarıya kadar inik. Çay evinde sadece sen, Cevdet ve Kemal Usta. Masada telsiz.'),
    show('telsiz'),
    N('Kemal Usta son vidayı sıkıyor. Düğmeye basıyor. Hışırtı. Uzun bir hışırtı. Sonra bir ses.'),
    say('anlatici', '“…Yıldız’dan kıyıya… Koyda bir kayık var, feneri yok, karşı kıyıya, Şükran’ın evine doğru gidiyor…”'),
    say('anlatici', '“…bu havada batar… yardıma gidiyorum… motor… motor ses vermiyor…”'),
    N('Sonra yalnızca hışırtı. Kemal Usta düğmeyi kapatıyor. Kimse konuşmuyor.'),
    hide,
    say('cevdet', 'Babam bir kayık için açılmış. Fırtınada, feneri olmayan bir kayık için.'),
    say('cevdet', 'Şükran’ın evine… Şükran ebe. O gece biri ebeye mi gidiyormuş?'),
    { t: 'item', id: 'kaset', name: 'Rıza Kaptan’ın telsiz kaseti' },
    bond('cevdet', 2),
    flag('kaset'),
  ],
  night: [
    bg('cayevi'),
    N('Herkes gittikten sonra bardakları yıkıyorsun. Pamuk tezgâhın arkasında bir tahtayı tırmalıyor. Durmadan.'),
    say('pamuk', 'Mrrrv!'),
    N('Tahta gevşek. Kaldırıyorsun. Altında kırmızı bir iple bağlanmış kalın bir zarf destesi.'),
    N('Otuzdan fazla mektup. Hepsinin üstünde aynı şey yazıyor: “Y.’ye”. Hiçbiri pullanmamış. Hiçbiri gönderilmemiş.'),
    { t: 'item', id: 'mektuplar', name: 'Nesrin’in gönderilmemiş mektupları' },
    bond('pamuk'),
    flag('mektuplar'),
    { t: 'card', title: 'Y.’ye', subtitle: 'Otuz iki mektup, hiçbiri gönderilmemiş' },
  ],
};

const day16: Day = {
  n: 16, chapter: 3, title: 'Mektuplar', weekday: 'Salı',
  morning: [
    bg('depo'),
    show('mektup'),
    N('Sabaha kadar uyumadın. Deponun lambası altında mektupları tarih sırasına diziyorsun. İlki Eylül 1976.'),
    say('anlatici', '“Y., bugün kasaba seni suçladı. Ben sustum. Susmamı sen istedin ama ben yine de utanıyorum. — N.”'),
    say('anlatici', '“Y., Rıza’nın karısını gördüm bugün çarşıda. Gözlerimi kaçırdım. Bunu hiç unutmayacağım. — N.”'),
    N('Yıllar geçiyor. Mektuplar kısalıyor. Son mektup 2024 tarihli. El yazısı titrek.'),
    say('anlatici', '“Y., her sabah pencere kenarında oturuyorsun. Çayını ben koyuyorum. Elli yıldır tek kelime etmeden.”'),
    say('anlatici', '“Bu da bir çeşit konuşmak, değil mi? Ben gidince birisi çayını koysun diye defterin başına yazdım. — N.”'),
    hide,
    D('Pencere kenarında. Her sabah. Tavşan kanı çay.'),
    D('Y. Sessiz Amca.'),
    flag('y_kim'),
    bg('cayevi'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Sessiz Amca pencere kenarında. Artık ona aynı gözle bakamıyorsun. Cebinde mektuplar.')],
      wants: 'tavsan',
      right: [
        bond('yusuf'),
        {
          t: 'choice', prompt: 'Mektuplardan birini ona verecek misin?',
          options: [
            {
              text: 'Son mektubu tavlanın yanına bırak',
              then: [
                N('Zarfı görüyor. El yazısını tanıyor. Parmakları zarfın üstünde uzun süre duruyor.'),
                N('Okuyor. Bir kez. İki kez. Sonra zarfı katlayıp yeleğinin iç cebine, kalbinin üstüne koyuyor.'),
                N('Kalkıyor. Kapıda dönüp sana bakıyor. Gözleri kıpkırmızı.'),
                bond('yusuf'),
                flag('mektup_verildi'),
              ],
            },
            { text: 'Henüz değil', then: [N('Mektuplar cebinde ağırlaşıyor. Sessiz Amca bir şey sezmiş gibi pencereden sana bakıyor.')] },
          ],
        },
      ],
      wrong: [N('Bardağı kenara itiyor. Bugün ellerin titriyor, sen de fark ediyorsun.')],
    },
    {
      who: 'kemal',
      arrive: [say('kemal', 'Ihlamur. Dün akşamdan beri o ses kulağımda.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Neyse.')],
      after: [
        D('Kemal Usta, kopya anahtarı Sessiz Amca’ya yaptınız, değil mi?'),
        N('Kemal gözlüğünü alnına itiyor. Bardağı yavaşça tabağına bırakıyor.'),
        say('kemal', 'Ben bir şey söylemedim evladım. Ama yanlış da söylemiyorsun.'),
        flag('kopya_kimde'),
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata ve büyük açıklama!')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Büyük açıklamalar yanlış limonatayla da yapılır.')],
      after: [
        say('elif', 'Kasket. Topallık. Y harfli pul. Gazetedeki Y. A. Elli yıldır pencere kenarında oturan biri.'),
        say('elif', 'Sessiz Amca. Fenerin bekçisi o. Fener yakan da o!'),
        {
          t: 'choice', prompt: 'Elif’e ne diyeceksin?',
          options: [
            {
              text: '“Haklısın. Ama bunu kimseye söyleme.”',
              then: [say('elif', 'Söz. Gazeteci etiği. Kaynağını korursun. Bu sefer kaynak da hikâye de aynı kişi.'), bond('elif'), flag('elif_sir')],
            },
            {
              text: '“Bunu kanala koyarsan bir daha konuşmam.”',
              then: [say('elif', 'Hey! Koymayacaktım ki… Koymayacaktım. Tamam. Koymuyorum.'), flag('elif_sir')],
            },
          ],
        },
      ],
    },
  ],
};

const day17: Day = {
  n: 17, chapter: 3, title: 'Yıldız II', weekday: 'Çarşamba',
  morning: [
    bg('tekne'),
    N('Şafak. Cevdet seni Yıldız II’yle koyun ortasına götürüyor. Motoru susturuyor. Dalgaların sesinden başka ses yok.'),
    say('cevdet', 'Burası. Babamın teknesi tam altımızda. Otuz metre.'),
    N('Cevdet denize bir avuç kırmızı karanfil bırakıyor. Karanfiller suyun üstünde dağılıyor.'),
    say('cevdet', 'Her yıl 2 Eylül’de gelirim. Elli yıl. Bekçiye kızarak geldim. Bu yıl ne düşüneceğimi bilmiyorum.'),
    {
      t: 'choice', prompt: 'Cevdet’e ne diyeceksin?',
      options: [
        {
          text: '“Belki bekçi de o gece birine yardım ediyordu.”',
          then: [
            say('cevdet', 'Kime? O fırtınada?'),
            N('Sonra susuyor. Kasetteki sesi hatırlıyorsun, o da hatırlıyor. Feneri olmayan bir kayık.'),
            say('cevdet', '…Olabilir mi?'),
            flag('cevdet_supheli'),
          ],
        },
        {
          text: '“Babanız bir kahramanmış.”',
          then: [say('cevdet', 'Kahraman. Evet. Annem öyle derdi. Ben sadece babamı isterdim.'), bond('cevdet')],
        },
      ],
    },
    say('cevdet', 'Şu karşı kıyıdaki beyaz evi görüyor musun? Şükran Hala’nın eski evi. Ebe evi. O kayık oraya gidiyormuş.'),
    bg('cayevi'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'sukran',
      arrive: [say('sukran', 'Adaçayı yavrum. Sabah Cevdet’in teknesini gördüm koyda. Sen de mi oradaydın?')],
      wants: 'adacayi',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Neyse, neyse.')],
      after: [
        D('Hala, Rıza Kaptan’ın kaseti var. O gece telsizde sizin adınızı söylemiş. Evinize bir kayık geliyormuş.'),
        N('Şükran Hala’nın kaşığı bardağın içinde duruyor. Elleri titriyor.'),
        say('sukran', 'Anlatacağım. Söz. Ama önce o konuşsun. Pencere kenarındaki. Sana kendisi anlatsın istiyorum.'),
        say('sukran', 'Elli yıl bekledim, bir hafta daha beklerim.'),
        bond('sukran'),
        flag('sukran_soz'),
      ],
    },
    {
      who: 'hilmi',
      arrive: [say('hilmi', 'Ballı adaçayı. Zeytinlik satıldı. Garip, içim hafif.')],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Olsun, olsun. Artık hiçbir şeye kızmıyorum.')],
    },
  ],
};

const day18: Day = {
  n: 18, chapter: 3, title: 'Yusuf', weekday: 'Perşembe',
  morning: [
    bg('cayevi'),
    A('kepenk_ac'),
    show('yagmur'),
    N('Yağmurlu bir sabah. Yaz boyunca ilk yağmur. Kepengi kaldırdığında Sessiz Amca kapının önünde, ıslanmış bekliyor.'),
    N('İçeri girip pencere kenarına oturuyor. Tavlayı açıyor. Karşısındaki sandalyeyi ayağıyla hafifçe ileri itiyor.'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Karşısındaki sandalye. Sana. İlk kez.')],
      wants: 'tavsan',
      right: [
        N('İki bardak koyuyorsun. Birini onun önüne, birini kendi önüne. Karşısına oturuyorsun.'),
        N('Cebinden “N” ve “Y” harfli pulları çıkarıp tavlanın ortasına koyuyorsun.'),
        bond('yusuf'),
      ],
      wrong: [
        N('Bardağı kenara itiyor. Ama bugün kalkmıyor. Bekliyor. Doğru bardağı getirip karşısına oturuyorsun.'),
        N('Cebinden “N” ve “Y” harfli pulları çıkarıp tavlanın ortasına koyuyorsun.'),
      ],
      after: [
        {
          t: 'choice', prompt: 'Ne diyeceksin?',
          options: [
            {
              text: '“Günaydın, Yusuf Amca.”',
              then: [
                N('Eli tavlanın üstünde donup kalıyor. Yağmurun sesinden başka ses yok.'),
                N('Çok uzun bir süre sonra başını kaldırıyor. Dudakları kıpırdıyor. Sesi kısık, paslı, elli yıldır kullanılmamış bir kapı gibi.'),
                say('yusuf', 'Evet.'),
              ],
            },
            {
              text: 'Hiçbir şey söyleme, sadece bekle',
              then: [
                N('Bekliyorsun. Yağmur yağıyor. Sonra parmağını “Y” harfli pula koyuyor. Sonra kendi göğsüne.'),
                N('Dudakları kıpırdıyor. Sesi kısık, paslı, elli yıldır kullanılmamış bir kapı gibi.'),
                say('yusuf', 'Yusuf.'),
              ],
            },
          ],
        },
        say('yusuf', 'Elli yıldır kimse bana adımla seslenmedi.'),
        say('yusuf', 'Nesrin’in torunu. Sana anlatacağım. Ama önce Şükran anlatsın. O gece o da oradaydı.'),
        N('Kalkıyor. Kasketini takıyor. Kapıda dönüp ilk kez sana gülümsüyor.'),
        bond('yusuf', 2),
        flag('yusuf_isim'),
      ],
    },
    {
      who: 'cevdet',
      arrive: [
        N('Cevdet kapıda duruyor. Yusuf’un az önce kalktığı sandalyeye ve senin önündeki ikinci bardağa bakıyor.'),
        say('cevdet', 'Demek onunla aynı masaya oturuyorsun.'),
      ],
      wants: 'kahve',
      right: [
        {
          t: 'if', flag: 'cevdet_supheli',
          then: [say('cevdet', 'Kızmıyorum. Kızamıyorum artık. Sadece… bilmek istiyorum. O kayıkta kim vardı?'), bond('cevdet')],
          else: [say('cevdet', 'Kahveni içerim. Ama o masaya oturduğunu unutmam.'), bond('cevdet', -1)],
        },
      ],
      wrong: [say('cevdet', 'Bugün kahve de, sen de, hiçbir şey yerinde değil.')],
      after: [flag('cevdet_gordu')],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata! Pencereden gördüm. Konuştu mu? KONUŞTU MU?')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Limonata önemli değil şu an!')],
      after: [
        D('Konuştu.'),
        say('elif', 'Kanıt duvarına yazıyorum. Kurşun kalemle değil. Mürekkeple.'),
      ],
    },
  ],
  evening: [
    bg('telefon'),
    D('Anne, Yusuf diye birini tanıyor musun? Bu kasabadan.'),
    N('Telefonun öbür ucunda uzun bir sessizlik.'),
    say('anne', 'Babaannen bir kere, çok ateşliyken, o adı sayıkladı. Ben on yaşındaydım. Sabah sorduğumda tokat attı.'),
    say('anne', 'Hayatında bana bir kere vurdu. O gün. Bir daha da hiç sormadım.'),
    flag('anne_yusuf'),
  ],
  night: [
    bg('gece'),
    A('fener_yanar'),
    N('Gece fener yine yanıyor. Bu sefer pencereden izlerken içinde korku yok.'),
    D('Artık kimin yaktığını biliyorum. Ama nedenini bilmiyorum.'),
  ],
  chapterEnd: {
    title: 'Bölüm 3 sonu',
    text: 'Sessiz Amca’nın adı Yusuf. Elli yıl boyunca babaannenin koyduğu çayı içti ve tek kelime etmedi. Rıza Kaptan o gece feneri olmayan bir kayığa yardım etmek için açılmıştı. Kayık Şükran Hala’nın evine gidiyordu. Bölüm 4’te: Ebe.',
  },
};

export const CHAPTER_3: Day[] = [day13, day14, day15, day16, day17, day18];
