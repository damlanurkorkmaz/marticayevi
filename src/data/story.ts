import type { Day } from '../types';
import { A, bg, bond, D, flag, hide, N, say, show, yusufDaily } from './helpers';
import { CHAPTER_2 } from './chapter2';
import { CHAPTER_3 } from './chapter3';
import { CHAPTER_4 } from './chapter4';
import { CHAPTER_5 } from './chapter5';
export { ENDINGS } from './chapter5';

// ---------------------------------------------------------------------------
// PROLOG — "Kepenk"
// ---------------------------------------------------------------------------

const day1: Day = {
  n: 1, chapter: 0, title: 'Kepenk', weekday: 'Pazartesi',
  morning: [
    bg('liman'),
    A('otobus_gider'),
    N('Haziranın ilk sabahı. Otobüs seni Yalıçam iskelesinin önünde bırakıp toz bulutu içinde uzaklaşıyor.'),
    D('Babaannemin cenazesinden beri ilk kez buradayım. Bir yaz. Sadece bir yaz kalıp dükkânı satacağım.'),
    N('İskelenin ucunda, kepengi paslanmış küçük bir dükkân. Tabelasındaki harflerin yarısı dökülmüş: “M RTI ÇAY EV”.'),
    bg('cayevi'),
    A('kepenk_ac'),
    N('Kepenk gıcırdayarak açılıyor. İçeride toz, deniz kokusu ve bir de… taze çay kokusu? Olamaz.'),
    D('Biri burayı benden önce açmış olabilir mi?'),
    N('Tezgâhın altında, bir bez parçasına sarılı kalın bir defter buluyorsun. Kapağında babaannenin el yazısı: “Nesrin’in defteri”.'),
    { t: 'item', id: 'defter', name: 'Babaannenin tarif defteri' },
    N('İlk sayfa bir tarif değil. Mürekkebi solmuş tek bir cümle:'),
    say('anlatici', '“Fener yanarsa, Yusuf’a tavşan kanı çay götür.”'),
    D('Yusuf kim? Fener elli yıldır sönük, herkes biliyor.'),
    { t: 'recipe', id: 'tavsan' },
    N('Sayfayı çevirince ilk tarif çıkıyor: tavşan kanı çay. Kenarına küçük harflerle notlar düşülmüş.'),
    D('Madem buradayım, en azından bir demlik çay yapmayı öğreneyim.'),
  ],
  visits: [
    {
      who: 'sukran',
      arrive: [
        N('Kapıdan başörtülü, gözlüklü yaşlı bir kadın başını uzatıyor.'),
        say('sukran', 'Aaa! Kepenk açık! Nesrin’in torunu sen misin yoksa? Maşallah, gözlerin tıpkı onun.'),
        say('sukran', 'Ben Şükran. Bu kasabada doğan her bebeği ben tuttum, seninkini tutamadım bir tek. Hadi bakalım, bir tavşan kanı koy da Nesrin’inkine benziyor mu görelim.'),
      ],
      wants: 'tavsan',
      right: [
        say('sukran', 'Hmm… Renk tamam. Dem tamam. Allah rahmet eylesin, Nesrin’in eli sende varmış.'),
        bond('sukran'),
      ],
      wrong: [
        say('sukran', 'Bu ne yavrum? Ben tavşan kanı dedim. Neyse, ilk gün, olur böyle şeyler.'),
      ],
      after: [
        say('sukran', 'Bak sana bir şey öğreteyim. Nesrin bana hep ballı adaçayı yapardı. Defterin bir yerinde vardır, ara bul.'),
        { t: 'recipe', id: 'adacayi' },
        say('sukran', 'Yarın gelirim, onu içerim. Haydi kolay gelsin!'),
      ],
    },
  ],
  evening: [
    bg('telefon'),
    N('Akşam, telefonun ekranında “Annem” yazıyor.'),
    say('anne', 'Vardın mı? Dükkân ne durumda? Emlakçıyla konuştum, iskele başı iyi para ederMİŞ.'),
    {
      t: 'choice', prompt: 'Ne diyeceksin?',
      options: [
        { text: '“Bir yaz kalacağım anne. Sonra karar veririm.”', then: [say('anne', 'Sen bilirsin. Ama o kasabaya fazla bağlanma.'), flag('kalmaya_meyilli')] },
        { text: '“Satacağım, merak etme.”', then: [say('anne', 'İyi. Ne kadar çabuk o kadar iyi.'), flag('satmaya_meyilli')] },
      ],
    },
    say('anne', 'Bir de… fenere gitme olur mu? Sadece gitme.'),
    D('Fener mi? Neden?'),
    N('Hat kesiliyor. Belki çekmiyordur. Belki de değil.'),
  ],
  night: [
    bg('gece'),
    N('Gece yarısı. Dükkânın üstündeki küçük odada uyuyamıyorsun.'),
    A('fener_yanar'),
    N('Birden pencereden içeri sarı bir ışık vuruyor. Bir… iki… üç kez dönüp geçiyor.'),
    {
      t: 'choice',
      options: [
        { text: 'Pencereye koş', then: [N('Burnun cama yapışıyor. Koyun karşısında, elli yıldır sönük olan fener yanıyor.'), N('Sonra, sanki biri seni gördüğünü fark etmiş gibi, sönüyor.'), flag('fener_gordu')] },
        { text: 'Yorganı başına çek', then: [N('Işık yorganın altından bile seçiliyor. Sonra kayboluyor. Rüya mıydı?'), flag('fener_gordu')] },
      ],
    },
    { t: 'card', title: 'Fener yandı', subtitle: '1976’dan beri ilk kez' },
  ],
};

const day2: Day = {
  n: 2, chapter: 0, title: 'Pencere kenarı', weekday: 'Salı',
  morning: [
    bg('cayevi'),
    A('kepenk_ac'),
    N('Sabah 07.30. Kepengi kaldırdığında kapının önünde biri bekliyor.'),
    N('Yaşlı bir adam. Başında eski bir kasket, üstünde el örgüsü bir yelek. Seni görünce hiçbir şey söylemeden içeri giriyor ve pencere kenarındaki masaya oturuyor.'),
    show('tavla'),
    N('Masada bir tavla duruyor. Adam pulları tek tek diziyor. Kimseyi beklemeden, tek başına oynamaya başlıyor.'),
    D('Günaydın? Ne alırsınız?'),
    N('Cevap yok. Sadece pencereden koyun karşısındaki fenere bakıyor.'),
    hide,
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [
        N('Adam gözünü fenerden ayırmadan, parmağıyla tezgâhın altını işaret ediyor. Tam defteri bulduğun yeri.'),
        D('Defter… “Fener yanarsa, Yusuf’a tavşan kanı çay götür.” Dün gece fener yandı.'),
      ],
      wants: 'tavsan',
      right: [
        N('Bardağı ince parmaklarıyla tutuyor. Bir süre buharına bakıyor. Sonra bir yudum.'),
        N('Gözleri doluyor. Başını bir kez, çok yavaş sallıyor. Hayatında aldığın en ağır teşekkür bu.'),
        bond('yusuf'),
        N('Kalkarken tavlanın üstüne bir pul bırakıyor. Pulun arkasına bıçakla bir harf kazınmış: “N”.'),
        { t: 'item', id: 'pul_n', name: '“N” harfli tavla pulu' },
        flag('pul_n'),
      ],
      wrong: [
        N('Adam bardağa bakıyor. Sonra sana. Bardağı nazikçe kenara itiyor, masaya bozuk para bırakıp çıkıyor.'),
        D('Yanlış bir şey yaptım. Ama ne?'),
      ],
    },
    {
      who: 'sukran',
      arrive: [
        say('sukran', 'Gördün mü dün geceyi? Fener yandı! Elli yıl! Bütün kasaba sabahtan beri onu konuşuyor.'),
        say('sukran', 'Ay boğazım kurudu konuşmaktan. Dün sana söylediğimden koy bakalım, tepeden toplanandan.'),
      ],
      wants: 'adacayi',
      right: [
        say('sukran', 'İşte bu! Balı en son koymuşsun, aferin.'),
        bond('sukran'),
        say('sukran', 'Hayalet diyorlar. Ben hayalete inanmam yavrum. Ama bazı insanlara inanırım…'),
        N('Şükran Hala’nın gözü bir an pencere kenarındaki boş masaya kayıyor.'),
      ],
      wrong: [
        say('sukran', 'Bu adaçayı değil ki yavrum! Neyse, sıcak sıcak içilir yine de.'),
      ],
      after: [
        {
          t: 'choice', prompt: 'Şükran Hala’ya ne soracaksın?',
          options: [
            {
              text: '“Hala, Yusuf kim?”',
              then: [
                N('Şükran Hala’nın kaşığı bardağın içinde duruyor.'),
                say('sukran', 'O adı… O adı bu tezgâhta duymayalım yavrum. Nesrin duymak istemezdi.'),
                flag('yusuf_soruldu'),
              ],
            },
            {
              text: '“Fener neden elli yıldır sönük?”',
              then: [
                say('sukran', '1976. Eylülün ikinci gecesi. Öyle bir fırtına ki, ne öncesinde gördük ne sonrasında.'),
                say('sukran', 'Rıza Kaptan’ın teknesi, Yıldız, kayalara bindirdi. Fener o gece yanmıyordu. Ondan sonra da kimse yakmadı.'),
                flag('firtina_duyuldu'),
              ],
            },
          ],
        },
      ],
    },
  ],
  chapterEnd: {
    title: 'Prolog sonu',
    text: 'Fener elli yıl sonra yandı. Sessiz bir adam sana “N” harfli bir pul bıraktı. Ve babaannen, birinin adını bir sayfanın başına yazacak kadar önemsemiş.',
  },
};

// ---------------------------------------------------------------------------
// BÖLÜM 1 — "İlk Müşteriler"
// ---------------------------------------------------------------------------

const day3: Day = {
  n: 3, chapter: 1, title: 'Hayalet Kanalı', weekday: 'Çarşamba',
  morning: [
    bg('cayevi'),
    N('Fenerin yandığı haberi yayıldıkça kasabalılar birer birer çay evine uğramaya başladı. Herkesin bir merakı, bir sorusu var.'),
    N('Tezgâhın üstüne beyaz, tüylü bir kedi atlıyor. Patisiyle defteri itiyor. Defter yere düşüp bir sayfada açılıyor.'),
    say('pamuk', 'Mrrrv.'),
    D('Sen de kimsin? Tasmanda… “Pamuk” yazıyor. Babaannemin kedisi.'),
    { t: 'recipe', id: 'limonata' },
    N('Açılan sayfa limonata tarifi. Kenarında bir not: “Çocuklar için.”'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'elif',
      arrive: [
        N('Kapı çarparak açılıyor. Elinde telefon, boynunda kocaman kulaklıklarla on beş yaşlarında bir kız içeri dalıyor.'),
        say('elif', 'Selam! Yeni gelen sen misin? Ben Elif. “Yalıçam Gizemleri” kanalı benim. 212 abone. Duymuşsundur.'),
        say('elif', 'Of, dışarısı fırın gibi. Ekşi, soğuk, nane kokan bir şey var mı?'),
      ],
      wants: 'limonata',
      right: [
        say('elif', 'Ooo! Bu limonata efsane. Kanalda reklamını yaparım, bedavaya.'),
        bond('elif'),
      ],
      wrong: [
        say('elif', 'Ihh, bu sıcak! Neyse, kibar olayım… Teşekkürler.'),
      ],
      after: [
        say('elif', 'Neyse, asıl konu bu. Pazartesi gecesi çektim. Bak.'),
        show('video_fener'),
        N('Telefonun ekranında titrek bir görüntü: koy, karanlık, sonra fenerin tepesinde sarı bir ışık. Saat 00.00.'),
        say('elif', 'Herkes hayalet diyor. Ben kanıt istiyorum. Bu gece fenere gidiyorum. Sen de gel, iki kamera daha iyi.'),
        hide,
        flag('elif_davet'),
      ],
    },
    {
      who: 'sukran',
      arrive: [say('sukran', 'Her zamankinden yavrum. Elif kızı gördüm, yine o fener lafı. O kız bir gün o merdivenlere tırmanacak, ödüm kopuyor.')],
      wants: 'adacayi',
      right: [say('sukran', 'Sen bu işi öğreniyorsun bak.'), bond('sukran')],
      wrong: [say('sukran', 'Yine mi karıştırdın yavrum? Olsun, olsun.')],
    },
  ],
  night: [
    bg('gece'),
    N('Saat 23.40. Telefonuna bir mesaj düşüyor. Elif: “Kayalıkların orada bekliyorum. Fener feneri bekler, hehe.”'),
    {
      t: 'choice', prompt: 'Gidecek misin?',
      options: [
        {
          text: 'Elif’le fenere git',
          then: [
            bg('fener'),
            N('Kayalıklardan fenere çıkan patika ay ışığında bembeyaz. Elif önde, telefonunun ışığı titriyor.'),
            N('Fenerin demir kapısında yepyeni, pırıl pırıl bir asma kilit var. Etrafındaki her şey paslı, bir tek o yeni.'),
            say('elif', 'Bak! Kumda ayak izi. Islak. Biri az önce buradaydı.'),
            say('elif', 'Hayaletler ayakkabı giymez. Bu bir insan. Kanıt!'),
            bond('elif'),
            flag('fener_gece1'),
          ],
        },
        {
          text: 'Evde kal',
          then: [
            N('Yorgunsun. Ertesi sabah erken kalkacaksın.'),
            say('elif', '“Korkak :) Neyse, yarın anlatırım.”'),
          ],
        },
      ],
    },
  ],
};

const day4: Day = {
  n: 4, chapter: 1, title: 'Sert Kahve', weekday: 'Perşembe',
  morning: [
    bg('liman'),
    N('Sabah iskelede bir motor sesi. Mavi boyalı, eski bir balıkçı teknesi yanaşıyor. Kıçında beyaz harflerle adı yazıyor: “Yıldız II”.'),
    bg('cayevi'),
    N('Defterin bir sayfası rüzgârla kendiliğinden çevriliyor. Türk kahvesi. Kenarında: “Rıza Kaptan sade içerdi.”'),
    { t: 'recipe', id: 'kahve' },
  ],
  visits: [
    yusufDaily([
      N('Kalkarken bir pul daha bırakıyor. Arkasına kazınmış harf: “Y”.'),
      { t: 'item', id: 'pul_y', name: '“Y” harfli tavla pulu' },
      { t: 'if', flag: 'pul_n', then: [flag('pul_ikisi')] },
    ]),
    {
      who: 'cevdet',
      arrive: [
        N('Kalın kollu, kırmızı bereli bir adam kapıyı omzuyla itip giriyor. Tuz ve mazot kokuyor.'),
        say('cevdet', 'Kahve. Sade. Nesrin’in yaptığı gibi. Yapabiliyorsan.'),
      ],
      wants: 'kahve',
      right: [
        N('Fincanı tek yudumda bitiriyor. Uzun bir sessizlik.'),
        say('cevdet', '…Fena değil.'),
        bond('cevdet'),
      ],
      wrong: [
        say('cevdet', 'Bu ne? Ben kahve dedim.'),
        N('Parayı masaya bırakıp gidiyor. Kapıdan çıkarken bir kez dönüp bakıyor. Belki bir şans daha verir.'),
      ],
      after: [
        {
          t: 'choice', prompt: 'Cevdet’e bir şey söyleyecek misin?',
          options: [
            {
              text: '“Pazartesi gece fener yandı, gördünüz mü?”',
              then: [
                N('Cevdet’in yumruğu masaya iniyor. Fincanlar zıplıyor.'),
                say('cevdet', 'O fenerin adını bu masada anma. Babam o feneri bekleyerek boğuldu.'),
                bond('cevdet', -1),
                flag('cevdet_kizdi'),
              ],
            },
            {
              text: '“Tekneniz çok güzel. Adı neden Yıldız II?”',
              then: [
                say('cevdet', 'Babamın teknesinin adı Yıldız’dı. İkincisi benim.'),
                say('cevdet', 'Birincisi koyun dibinde. Elli yıldır.'),
                bond('cevdet'),
                flag('yildiz_adi'),
              ],
            },
          ],
        },
      ],
    },
    {
      who: 'hilmi',
      arrive: [
        N('Takım elbiseli, bıyıklı bir adam güler yüzle içeri giriyor. Elini uzatıyor.'),
        say('hilmi', 'Hilmi. Muhtar. Hoş geldin, başımızın tacı! Neskafen var mı?'),
        D('Neskafe yok, kusura bakmayın.'),
        say('hilmi', 'Yok mu? Peki. O zaman en pahalısından olsun. Sert bir şey.'),
      ],
      wants: 'kahve',
      right: [say('hilmi', 'Ooo, Nesrin Hanım’ın kahvesi! Bu dükkân bir hazine.'), bond('hilmi')],
      wrong: [say('hilmi', 'Hmm, ben sert bir şey demiştim ama… Hoş, hoş.')],
      after: [
        say('hilmi', 'Sana açık konuşayım. İzmirli bir otel şirketi limanı istiyor. Bu dükkân tam iskelenin başında. İyi para verirler, çok iyi.'),
        {
          t: 'choice', prompt: 'Ne cevap vereceksin?',
          options: [
            { text: '“Düşüneceğim.”', then: [say('hilmi', 'Düşün, düşün. Acele yok. Ama çok da bekletme.'), flag('hilmi_dusun')] },
            { text: '“Çay evi satılık değil.”', then: [say('hilmi', 'Ha ha! Nesrin Hanım da aynen böyle derdi. Görüşürüz.'), N('Gülüyor ama gözleri gülmüyor.'), flag('hilmi_ret')] },
          ],
        },
      ],
    },
  ],
};

const day5: Day = {
  n: 5, chapter: 1, title: 'Pamuk', weekday: 'Cuma',
  morning: [
    bg('cayevi'),
    N('Cuma. Pazar yerinin kurulduğu gün. Tezgâhın önünden geçen herkes içeri bir göz atıyor.'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'elif',
      arrive: [say('elif', 'Hep aynısından! Ekşi, soğuk, naneli!')],
      wants: 'limonata',
      right: [bond('elif'), say('elif', 'Bu limonata için yaşanır.')],
      wrong: [say('elif', 'Bugün de mi şaşırdın? Hıh.')],
      after: [
        {
          t: 'if', flag: 'fener_gece1',
          then: [
            say('elif', 'Dün gece bir şey yaptım. Eski kameramı fenerin dibindeki kayaya sakladım. Bütün gece kayıt alıyor.'),
            say('elif', 'Kim o kilidi açıyorsa, yakalayacağız.'),
            flag('kamera'),
          ],
          else: [
            say('elif', 'Sen gelmeyince kendi başıma gittim. Kapıda yepyeni bir kilit var! Kameramı oraya sakladım, bütün gece kayıt alıyor.'),
            flag('kamera'),
          ],
        },
      ],
    },
    {
      who: 'sukran',
      arrive: [say('sukran', 'Pazardan geliyorum, ayaklarım koptu. Adaçayı yavrum, ballı.')],
      wants: 'adacayi',
      right: [bond('sukran'), say('sukran', 'Oh, can geldi.')],
      wrong: [say('sukran', 'Bu ne bu? Yaşlı kadına bunu mu içirecektin?')],
      after: [
        {
          t: 'choice', prompt: 'Şükran Hala’ya soracak mısın?',
          options: [
            {
              text: '“Babaannem gençken fenere gider miydi?”',
              then: [
                say('sukran', 'Nesrin mi? Herkes giderdi o zamanlar. Gençler merdivenlerinde otururdu, çay içerdi…'),
                say('sukran', 'Hadi ben kalkayım. Ayaklarım…'),
                N('Daha bardağının yarısı dolu.'),
                flag('sukran_kacti'),
              ],
            },
            { text: 'Hiçbir şey sorma', then: [N('Şükran Hala pazardaki domates fiyatlarını anlatıyor. Uzun uzun.')] },
          ],
        },
      ],
    },
  ],
  evening: [
    bg('telefon'),
    say('anne', 'Ne yapıyorsun? Emlakçı yine aradı.'),
    D('Anne, pazartesi gece fener yandı. Elli yıldır sönükmüş.'),
    N('Telefonun öbür ucunda uzun bir sessizlik.'),
    say('anne', 'Babaannen o fenerden hiç bahsetmezdi. Ben de sormazdım.'),
    say('anne', 'Neyse. Doğum günüm yaklaşıyor, unutma bu sefer. 2 Eylül.'),
    flag('anne_dogum'),
    D('2 Eylül. Bir yerden tanıdık geliyor.'),
  ],
  night: [
    bg('gece'),
    N('Gece yarısı bir tırmalama sesiyle uyanıyorsun. Pamuk, dükkânın arkasındaki depo kapısını tırmalıyor.'),
    {
      t: 'choice',
      options: [
        {
          text: 'Pamuk’un peşinden git',
          then: [
            bg('depo'),
            N('Depo tozlu. Pamuk bir sandığın üstüne atlıyor ve orada oturup sana bakıyor.'),
            N('Sandığın içinde, eski bir kutuda bir fotoğraf: genç bir kadın fenerin merdivenlerinde oturmuş, gülüyor. Babaannen. Belki yirmi yaşında.'),
            N('Fotoğrafın yarısı yırtılmış. Yanındaki kişiden geriye sadece bir el kalmış. Elinde ince belli bir çay bardağı.'),
            { t: 'item', id: 'foto', name: 'Yırtık fotoğraf' },
            bond('pamuk'),
            flag('foto'),
          ],
        },
        { text: 'Pamuk’u içeri alıp uyu', then: [N('Pamuk ayak ucunda kıvrılıyor ama gözleri bütün gece depo kapısında.'), bond('pamuk')] },
      ],
    },
  ],
};

const day6: Day = {
  n: 6, chapter: 1, title: 'Siluet', weekday: 'Cumartesi',
  morning: [
    bg('cayevi'),
    N('Cumartesi. Çay evinin önündeki masalar ilk kez dolu. Babaannen olsa gurur duyardı. Belki.'),
  ],
  visits: [
    yusufDaily([
      {
        t: 'if', flag: 'pul_ikisi',
        then: [
          N('Cebindeki iki pulu, “N” ve “Y”yi tavlanın üstüne yan yana koyuyorsun.'),
          N('Sessiz Amca uzun süre pullara bakıyor. Sonra parmağını “N”nin üstüne koyuyor. Ardından yavaşça pencereden fenere işaret ediyor.'),
          bond('yusuf'),
          flag('pul_gosterildi'),
        ],
      },
    ]),
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Kahve. Bugün çok balık var, çok iş var.')],
      wants: 'kahve',
      right: [
        bond('cevdet'),
        {
          t: 'if', flag: 'cevdet_kizdi',
          then: [say('cevdet', 'Geçen gün… sert çıktım. Babam meselesi. Kusura bakma.')],
          else: [say('cevdet', 'Babamın telsizi hâlâ evde duruyor biliyor musun. Bozuk. Ama atamadım.'), flag('telsiz')],
        },
      ],
      wrong: [say('cevdet', 'Yine mi? Tamam, tamam.')],
    },
    {
      who: 'hilmi',
      arrive: [say('hilmi', 'Doktor kahveyi yasakladı, tansiyon. Sakinleştirici bir şey ver bana, bitkisel.')],
      wants: 'adacayi',
      right: [bond('hilmi'), say('hilmi', 'Ballı! Nesrin Hanım’ın tarifi. Teklifimi unutma ama, he?')],
      wrong: [say('hilmi', 'Bu mu sakinleştirici? Tansiyonum fırladı şimdi.')],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata, acil! Bu akşam kamerayı alıyorum. Heyecandan ölüyorum.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Heyecandan fark etmedim bile. İçtim gitti.')],
    },
  ],
  night: [
    bg('gece'),
    N('Saat 01.20. Telefonun çalıyor. Elif. Fısıltıyla konuşuyor.'),
    say('elif', 'Uyanık mısın? Kamerayı aldım. Kaydı izledim. Sana gönderiyorum, şimdi bak.'),
    show('video_siluet'),
    N('Görüntü karanlık. Saat 03.12. Patikadan biri geliyor. Yavaş, biraz topal.'),
    N('Kilidi bir anahtarla açıyor. Kapıyı itiyor. Tam içeri girerken başını bir an kameraya çeviriyor.'),
    N('Yüzü seçilmiyor. Ama başında eski, yuvarlak bir kasket var.'),
    hide,
    {
      t: 'if', flag: 'pul_gosterildi',
      then: [D('O kasketi tanıyorum. Her sabah pencere kenarında oturuyor.')],
      else: [D('Bu kasketi bir yerden tanıyorum. Ama nereden?')],
    },
    say('elif', 'Gördün mü?! Hayalet değil bu. Ama kim?'),
  ],
  chapterEnd: {
    title: 'Bölüm 1 sonu',
    text: 'Fener her gece kendiliğinden yanmıyor. Biri onu yakıyor. Kasketli, topal, ve elinde anahtarı olan biri. Bölüm 2’de: Muhtarın Planı.',
  },
};

export const CHAPTERS: Record<number, { label: string; title: string }> = {
  0: { label: 'Prolog', title: 'Kepenk' },
  1: { label: 'Bölüm 1', title: 'İlk Müşteriler' },
  2: { label: 'Bölüm 2', title: 'Muhtarın Planı' },
  3: { label: 'Bölüm 3', title: 'Yıldız’ın Hikâyesi' },
  4: { label: 'Bölüm 4', title: 'Ebe' },
  5: { label: 'Bölüm 5', title: 'Fırtına Gecesi' },
};

/** Shown on the end screen until the next chapter ships. */
export const NEXT_UP = '2. yaz, “Yazlık Sinema”';

export const DAYS: Day[] = [day1, day2, day3, day4, day5, day6, ...CHAPTER_2, ...CHAPTER_3, ...CHAPTER_4, ...CHAPTER_5];

export const LAST_DAY = DAYS[DAYS.length - 1].n;

export function getDay(n: number): Day | undefined {
  return DAYS.find((d) => d.n === n);
}
