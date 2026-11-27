import type { Day } from '../types';
import { A, D, N, bg, bond, flag, say, yusufDaily } from './helpers';

// ---------------------------------------------------------------------------
// BÖLÜM 2 — "Muhtarın Planı"
// Everyone (and the player) suspects Hilmi of lighting the lighthouse. He is
// hiding something, but not that: he secretly sold the keeper's house to a
// hotel company to pay his daughter's debts. The lighthouse lights up while
// the whole town, Hilmi included, sits in the café.
// ---------------------------------------------------------------------------

const day7: Day = {
  n: 7, chapter: 2, title: 'Teklif', weekday: 'Pazar',
  morning: [
    bg('cayevi'),
    N('Pazar sabahı. Elif’in gece gönderdiği video aklından çıkmıyor. Kasketli biri, elinde anahtar.'),
    A('kepenk_ac'),
    N('Kepengi kaldırdığında iskele başında siyah, İzmir plakalı bir araba duruyor. Camları koyu.'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [
        N('Saat sekiz. Sessiz Amca’nın masası boş. Sekiz buçuk. Hâlâ boş.'),
        { t: 'enter', who: 'yusuf' },
        N('Dokuza doğru geliyor. Her zamankinden daha çok aksıyor. Ayakkabılarında ıslak kum var.'),
      ],
      wants: 'tavsan',
      right: [
        N('Bardağı iki eliyle tutuyor. Gözleri kapalı. Yorgun.'),
        bond('yusuf'),
        {
          t: 'if', flag: 'pul_gosterildi',
          then: [N('Kasketine baktığını fark ediyor. Kasketi yavaşça alnına doğru indiriyor.')],
        },
      ],
      wrong: [N('Bardağa bakmıyor bile. Bugün başka bir şeyle meşgul.')],
    },
    {
      who: 'hilmi',
      arrive: [
        N('Muhtar Hilmi içeri giriyor. Yanında saçları jöleli, genç, takım elbiseli bir adam.'),
        say('hilmi', 'Tuncer Bey, Liman Otelcilik’ten. İzmir’den bizim için geldi! Bana o ballı şeyden ver, doktor kahveyi yasakladı ya.'),
      ],
      wants: 'adacayi',
      right: [say('hilmi', 'Bak Tuncer Bey, bu kasabanın tadı bu işte!'), bond('hilmi')],
      wrong: [say('hilmi', 'Ballı olan demiştim ama… Neyse, misafirin yanında olmaz.')],
      after: [
        N('Tuncer Bey bir zarf uzatıyor. İçinde bir rakam. Okuyunca bir an nefesin kesiliyor.'),
        say('hilmi', 'Peşin. Bu parayla İstanbul’da istediğin yerde dükkân açarsın. Düşün, taşın.'),
        {
          t: 'choice', prompt: 'Ne diyeceksin?',
          options: [
            {
              text: '“Mesele para değil, Hilmi Bey.”',
              then: [say('hilmi', 'Her şeyin meselesi paradır evladım. Sadece bazen geç anlaşılır.'), flag('teklif_ret')],
            },
            {
              text: '“Zarfı bırakın, bakarım.”',
              then: [say('hilmi', 'İşte akıllı insan!'), { t: 'item', id: 'teklif', name: 'Otel şirketinin teklif zarfı' }, flag('teklif_alindi')],
            },
            {
              text: '“Fenerin kapısındaki yeni kilidi siz mi taktınız?”',
              then: [
                N('Hilmi’nin gülümsemesi yüzünde donup kalıyor.'),
                say('hilmi', 'Kilit mi? Ne kilidi? Ha… o. Belediye işleri. Güvenlik. Çocuklar çıkıp düşmesin diye.'),
                N('Tuncer Bey saatine bakıyor. Hilmi kalkmak için acele ediyor.'),
                bond('hilmi', -1),
                flag('hilmi_kilit_soruldu'),
              ],
            },
          ],
        },
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata! Ve sıkı dur, çünkü vakayı çözdüm.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Neyse, şu an içeceğe odaklanamam.')],
      after: [
        say('elif', 'Fenerin yandığı geceleri yazdım: Pazartesi, Perşembe, Cumartesi. Üçünde de muhtarın arabası fener yolundaydı.'),
        say('elif', 'Kasket mi? Muhtar gece yürüyüşünde hep kasket takar. Keli üşümesin diye. Herkes bilir.'),
        {
          t: 'choice',
          options: [
            { text: '“Bence muhtar değil.”', then: [say('elif', 'Kanıtla o zaman! Ben kanıtla konuşurum.')] },
            { text: '“Belki de haklısın.”', then: [say('elif', 'Tabii ki haklıyım. Ortaklığımız resmen başladı.'), bond('elif'), flag('hilmiden_suphe')] },
          ],
        },
      ],
    },
  ],
  evening: [
    bg('telefon'),
    say('anne', 'Hilmi amca mı? Aradı mı seni? Ne istiyormuş?'),
    D('Dükkânı almak istiyor. Bir otel şirketi adına.'),
    say('anne', 'Hiç değişmemiş. Babaannenle hiç anlaşamazlardı. Bir kere yine almak istemişti, babaannen kapıyı yüzüne kapatmıştı.'),
    say('anne', 'Ama sen bilirsin. Satmak istiyordun zaten, değil mi?'),
    {
      t: 'choice',
      options: [
        { text: '“Artık o kadar emin değilim.”', then: [say('anne', '…Babaannen de hep böyle derdi. Sonra ömrü orada geçti.'), flag('kalmaya_meyilli')] },
        { text: '“Evet. Ama Hilmi’ye değil.”', then: [say('anne', 'Kime satarsan sat, yeter ki bitsin.')] },
      ],
    },
  ],
};

const day8: Day = {
  n: 8, chapter: 2, title: 'Kanıt Duvarı', weekday: 'Pazartesi',
  morning: [
    bg('depo'),
    N('Daha kepengi açmadan Elif seni kolundan çekip deponun arka duvarına götürüyor.'),
    N('Duvar fotoğraflarla, gazete kupürleriyle, kırmızı iplerle kaplanmış. Ortada muhtarın bir fotoğrafı. Etrafında kocaman soru işaretleri.'),
    say('elif', 'Kanıt duvarı! Babaannenin deposu en iyi karargâh. Pamuk da onayladı.'),
    say('pamuk', 'Mrrr.'),
    {
      t: 'if', flag: 'foto',
      then: [
        N('Elif, deponun sandığında bulduğun yırtık fotoğrafı da duvarın köşesine iğneliyor.'),
        say('elif', 'Bu elin sahibini de bulacağız. Bardağı tutuşuna bak. Çay delisi biri.'),
      ],
    },
    bg('cayevi'),
  ],
  visits: [
    yusufDaily([
      N('Dışarıdan muhtarın kahkahası duyuluyor. Sessiz Amca bardağı yarım bırakıp kalkıyor.'),
      N('Kapıda Hilmi’yle göz göze geliyorlar. İkisi de tek kelime etmiyor. Hilmi önce gözlerini kaçırıyor.'),
      flag('yusuf_hilmi'),
    ]),
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Kahve. Sade. Dün akşamdan beri ağzım zehir gibi.')],
      wants: 'kahve',
      right: [bond('cevdet'), say('cevdet', 'İyi geldi.')],
      wrong: [say('cevdet', 'Bugün de mi? Hadi neyse.')],
      after: [
        say('cevdet', 'Muhtar dün iki takım elbiseliyle fenerin etrafında dolanıyordu. Ellerinde şerit metre. Ölçü alıyorlardı.'),
        {
          t: 'choice', prompt: 'Cevdet’e ne soracaksın?',
          options: [
            {
              text: '“Fener kimin malı ki?”',
              then: [
                say('cevdet', 'Fener devletin. Ama yanındaki bekçi evi ve arazisi köyündür. Köy adına imzayı da muhtar atar.'),
                say('cevdet', 'Köy toplantısı yapmadan atamaz ama. Yapmadı da.'),
                bond('cevdet'),
                flag('arazi_koyun'),
              ],
            },
            {
              text: '“Sizce fener neden yanıyor?”',
              then: [say('cevdet', 'Bilmiyorum. Bilmek de istemiyorum. Elli yıl yanmadı, keşke yanmasaydı.')],
            },
          ],
        },
      ],
    },
    {
      who: 'sukran',
      arrive: [say('sukran', 'Ay yavrum, adaçayı. Ballı. Duydun mu muhtarın kızını?')],
      wants: 'adacayi',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Neyse, ağzım laftan kurudu zaten, ne olsa içerim.')],
      after: [
        say('sukran', 'Seda. İzmir’de butik açmıştı. Batmış. Bankaya borcu varmış, evine haciz gelecekmiş.'),
        say('sukran', 'Hilmi kızına kıyamaz. Babası öyle. Allah yardımcısı olsun.'),
        flag('seda_borc'),
      ],
    },
  ],
  night: [
    bg('gece'),
    N('Saat 23.10. Elif’ten mesaj: “Muhtarın arabası yine fener yolunda. Şimdi. Geliyor musun?”'),
    {
      t: 'choice',
      options: [
        {
          text: 'Elif’le gizlice fenere git',
          then: [
            bg('fener'),
            N('Kayaların arkasına çömeliyorsunuz. Fenerin kapısında iki el feneri. Muhtar ve Tuncer Bey.'),
            N('Hilmi cebinden bir anahtar çıkarıyor ve yeni asma kilidi açıyor. Kapıyı itiyor.'),
            N('İçeriden Tuncer Bey’in sesi geliyor: “Bekçi evini yıkarız. Buraya resepsiyon, şuraya teras. Manzara milyon dolar.”'),
            N('Birkaç dakika sonra çıkıyorlar. Hilmi kilidi kapatıyor. Fener karanlık kalıyor.'),
            say('elif', 'Anahtar onda! Gördün mü? Kanıt!'),
            D('Gördüm. Ama fener yanmadı.'),
            bond('elif'),
            flag('hilmi_anahtar'),
            flag('hilmi_gozetlendi'),
          ],
        },
        {
          text: 'Evde kal',
          then: [
            N('Pencereden fenere bakıyorsun. Kapının önünde iki küçük ışık. Sonra sönüyorlar. Fener karanlık.'),
            say('elif', '“Muhtar kilidi KENDİ ANAHTARIYLA açtı! Yanında otelci vardı. Yarın anlatırım!!”'),
            flag('hilmi_anahtar'),
          ],
        },
      ],
    },
  ],
};

const day9: Day = {
  n: 9, chapter: 2, title: 'Hırdavatçı', weekday: 'Salı',
  morning: [
    bg('cayevi'),
    N('Pamuk tezgâhın üstünde, açık duran defterin tam ortasında uyuyor. Altında kalan sayfa: ıhlamur.'),
    { t: 'recipe', id: 'ihlamur' },
    N('Sayfanın köşesine bir isim yazılmış: “Kemal, salı.”'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'kemal',
      arrive: [
        N('İçeri gözlüğü alnına itilmiş, yeleğinin cebi kalem dolu bir adam giriyor. Her adımında anahtarlar şıngırdıyor.'),
        say('kemal', 'Kemal. Çarşıdaki hırdavatçı. Salıları Nesrin Abla bana bir şey yapardı. Boğazım için. Limonlu.'),
      ],
      wants: 'ihlamur',
      right: [say('kemal', 'Aynısı. Abla’nın elinden çıkmış gibi. Bak gözüm doldu, yaşlılık.'), bond('kemal')],
      wrong: [say('kemal', 'Yok, bu değil. Ama sen bilemezsin, kabahat bende. Defterine bak, salı yazar.')],
      after: [
        {
          t: 'choice', prompt: 'Kemal Usta’ya bir şey soracak mısın?',
          options: [
            {
              text: '“Fenerin kapısındaki yeni kilidi siz mi sattınız?”',
              then: [
                say('kemal', 'Kasabada benden başka kilit satan mı var? Üç hafta önce. Muhtar aldı, kendi eliyle taktı.'),
                say('kemal', 'Pirinç asma kilit. İki anahtarıyla birlikte verdim.'),
                N('Bir an duraksıyor. Bir şey daha söyleyecek gibi. Sonra vazgeçiyor.'),
                flag('kilit_hilmi'),
              ],
            },
            { text: '“Kolay gelsin, Kemal Usta.”', then: [say('kemal', 'Sağ ol evladım. Bir kapın, bir kilidin bozulursa bana gel.')] },
          ],
        },
      ],
    },
    {
      who: 'hilmi',
      arrive: [say('hilmi', 'Günaydın! Ballı adaçayı, tansiyonum yine tavan.')],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Bu ballı mı? Tadı hiç ballı değil.')],
      after: [
        {
          t: 'if', flag: 'hilmi_gozetlendi',
          then: [
            say('hilmi', 'Dün gece… Tuncer Bey’e manzarayı gösteriyordum. Gece manzarası. Merak eden olursa diye söylüyorum.'),
            N('Kimse sormamıştı.'),
          ],
          else: [say('hilmi', 'Teklifimiz hâlâ geçerli, unutma.')],
        },
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata, ama fısıltıyla.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Fısıltıyla dedim, yanlışıyla değil.')],
      after: [
        say('elif', 'Yarın e-Devlet’ten bekçi evinin tapusuna bakacağım. Annemin şifresiyle. Şşş.'),
        flag('tapu_plani'),
      ],
    },
  ],
};

const day10: Day = {
  n: 10, chapter: 2, title: 'Tapu', weekday: 'Çarşamba',
  morning: [
    bg('cayevi'),
    N('Elif kapıdan nefes nefese giriyor, telefonu havada.'),
    say('elif', 'Bekçi evi ve arazisi iki ay önce satılmış! Alıcı: Liman Otelcilik. Satan: köy. İmza: Muhtar Hilmi.'),
    say('elif', 'Köy toplantısı yapılmadan köyün malı satılamaz. Öğretmenimize sordum, kesin.'),
    { t: 'item', id: 'tapu', name: 'Tapu kaydının ekran görüntüsü' },
    flag('tapu'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'sukran',
      arrive: [say('sukran', 'Adaçayı yavrum. Bu sabah çok sıkıntılıyım, nedenini bilmiyorum.')],
      wants: 'adacayi',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Olsun, olsun.')],
      after: [
        N('Elif’in telefonundaki tapu kaydını gösteriyorsun. Şükran Hala’nın yüzü bembeyaz oluyor.'),
        say('sukran', 'Bekçi evini mi? O evde… Elli yıl önce orada Yusuf otururdu. Fenerin bekçisi.'),
        N('Sonra ağzından kaçırdığını fark ediyor. Bardağı bırakıp kalkıyor.'),
        flag('bekci_yusuf'),
      ],
    },
    {
      who: 'hilmi',
      arrive: [N('Muhtar ıslık çalarak giriyor. Hiçbir şeyden haberi yok.'), say('hilmi', 'Her zamankinden!')],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Her zamanki bu değil ama… Neyse.')],
      after: [
        {
          t: 'choice', prompt: 'Tapu kaydı cebinde. Ne yapacaksın?',
          options: [
            {
              text: 'Yanına otur, sessizce söyle',
              then: [
                D('Bekçi evini köye sormadan sattığınızı biliyorum, Hilmi Bey.'),
                N('Hilmi’nin ıslığı yarıda kalıyor. Uzun bir süre bardağına bakıyor.'),
                say('hilmi', 'Seda’nın evine haciz gelecekti. Torunlarımın evine. Bankaya üç ay süre verdiler.'),
                say('hilmi', 'Köyün malını sattım. Biliyorum. Parayı geri verecek yüzüm de yok, param da.'),
                bond('hilmi', 2),
                flag('hilmi_itiraf'),
              ],
            },
            {
              text: 'Herkesin önünde yüksek sesle söyle',
              then: [
                D('Hilmi Bey! Köyün bekçi evini otelciye kime sorarak sattınız?'),
                N('Çay evi bir anda susuyor. Tavla zarları bile duruyor. Bütün gözler muhtarda.'),
                N('Hilmi kıpkırmızı. Bir şey söylemeden kalkıp çıkıyor. Kapıyı arkasından sertçe kapatıyor.'),
                bond('hilmi', -2),
                flag('hilmi_rezil'),
              ],
            },
            {
              text: 'Şimdilik bir şey söyleme',
              then: [
                N('Hilmi yüzündeki ifadeyi görüyor. “Bir şey mi var?” “Yok.” Bir süre sana bakıyor. Bir şeyler sezdi.'),
                flag('hilmi_sessiz'),
              ],
            },
          ],
        },
      ],
    },
    {
      who: 'kemal',
      arrive: [say('kemal', 'Salı değil ama canım çekti. Ihlamur, limonlu.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Yok, yok. Limonlu olan.')],
    },
  ],
  night: [
    bg('gece'),
    N('Gece yarısı Elif arıyor. Fısıltıyla konuşuyor.'),
    say('elif', 'Muhtarın evinin karşısındayım. Evde. Işıklar kapalı, arabası kapıda, horlaması sokaktan duyuluyor.'),
    say('elif', 'Bu gece fener yanarsa…'),
    A('fener_yanar'),
    N('Cümlesini bitiremeden pencereden sarı bir ışık vuruyor. Bir. İki. Üç.'),
    D('Fener yanıyor. Hilmi evde uyurken.'),
    say('elif', 'O zaman kim?!'),
    flag('hilmi_degil'),
    { t: 'card', title: 'Fener yine yandı', subtitle: 'Muhtar evinde uyurken' },
  ],
};

const day11: Day = {
  n: 11, chapter: 2, title: 'Kopya Anahtar', weekday: 'Perşembe',
  morning: [
    bg('cayevi'),
    {
      t: 'if', flag: 'hilmi_rezil',
      then: [N('Bütün kasaba tapu meselesini konuşuyor. Dün çay evinde olanları duymayan kalmamış.')],
      else: [N('Elif dilini tutamamış. Öğlene kadar bütün kasaba bekçi evinin satıldığını öğreniyor.')],
    },
    N('Kahvehanenin kapısına bir kâğıt asılmış: “Yarın akşam Martı Çay Evi’nde köy toplantısı. Muhtar Hilmi.”'),
    D('Benim çay evimde mi? Kimse bana sormadı.'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Sessiz Amca bugün tavlayı açmıyor. Sadece fenere bakıyor. Elleri hafifçe titriyor.')],
      wants: 'tavsan',
      right: [
        bond('yusuf'),
        N('Giderken kapalı tavlayı masada bırakıyor. Kapağının arasına katlanmış bir kâğıt sıkışmış.'),
        N('Titrek, eski usul bir el yazısı. İki kelime: “Satmasınlar.”'),
        { t: 'item', id: 'not', name: 'Sessiz Amca’nın notu: “Satmasınlar.”' },
        flag('yusuf_not'),
      ],
      wrong: [N('Bardağa dokunmadan kalkıyor. Kapalı tavlayı koltuğunun altına alıp gidiyor.')],
    },
    {
      who: 'kemal',
      arrive: [say('kemal', 'Ihlamur evladım. Bu gece hiç uyuyamadım. Vicdan meselesi.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Neyse, sıcak olsun yeter.')],
      after: [
        {
          t: 'if', flag: 'kilit_hilmi',
          then: [D('Kemal Usta, geçen gün kilidi iki anahtarıyla sattığınızı söylemiştiniz. Bir şey daha diyecektiniz.')],
          else: [D('Kemal Usta, fenerin kilidini siz satmışsınız. Muhtarda bir anahtar var. Başka var mı?')],
        },
        N('Kemal gözlüğünü alnından indiriyor. Uzun uzun bardağına bakıyor.'),
        say('kemal', 'Muhtar kilidi taktığının ertesi sabahı biri geldi dükkâna. Elinde bir sabun parçası. Kilidin anahtar deliğinin izi üstünde.'),
        say('kemal', 'Kopya istedi. Yaptım.'),
        D('Kim?'),
        say('kemal', 'Söz verdim, söyleyemem. Ama şunu bil: elli yıl o kapının anahtarı onun cebindeydi.'),
        say('kemal', 'Bir pirinç kilit yüzünden elinden alınmasına gönlüm razı olmadı.'),
        bond('kemal'),
        flag('kopya_anahtar'),
      ],
    },
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Kahve. Yarın toplantıdayım. Muhtar köyün malını sattıysa hesabını verecek.')],
      wants: 'kahve',
      right: [bond('cevdet')],
      wrong: [say('cevdet', 'Kafam zaten bozuk, bu da olsun.')],
      after: [
        {
          t: 'if', flag: 'telsiz',
          then: [say('cevdet', 'Bir de… babamın telsizini Kemal Usta’ya göstereyim diyorum. Belki tamir eder. Belki de etmesin.'), flag('telsiz_tamir')],
        },
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata ve son dakika gelişmesi lütfen!')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Sorun değil, beynim zaten başka yerde.')],
      after: [
        {
          t: 'if', flag: 'kopya_anahtar',
          then: [
            say('elif', 'Kopya anahtar mı?! Yani kasabada o kapıyı açabilen ikinci biri var.'),
            say('elif', 'Kasketli, topal ve elli yıldır anahtarı cebinde taşıyan biri. Duvara yazıyorum.'),
          ],
        },
      ],
    },
  ],
  evening: [
    bg('telefon'),
    say('anne', 'Köy toplantısı mı? Senin dükkânda mı?'),
    say('anne', 'Babaannen her toplantıya giderdi. En önde otururdu, kimse ondan önce söz alamazdı.'),
    say('anne', 'Bir tek… bekçi evi konuşulduğunda hep susardı. Hiç anlamadım nedenini.'),
    flag('anne_bekci'),
  ],
};

const day12: Day = {
  n: 12, chapter: 2, title: 'Köy Toplantısı', weekday: 'Cuma',
  morning: [
    bg('cayevi'),
    N('Bütün gün sandalye taşıyorsun. Çay evine yirmi iki sandalye, iki uzun masa, üç demlik.'),
  ],
  visits: [
    yusufDaily([N('Bugün her zamankinden erken kalkıyor. Kapıda bir an duruyor, sonra fenere doğru yürüyor.')]),
    {
      who: 'sukran',
      arrive: [say('sukran', 'Adaçayı yavrum. Bu akşam bir şey olacak, içimde bir his var.')],
      wants: 'adacayi',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Ellerin titriyor yavrum, sen de mi heyecanlısın?')],
    },
  ],
  evening: [
    bg('cayevi'),
    N('Akşam. Çay evi ağzına kadar dolu. Kapının önünde ayakta duranlar bile var. Tuncer Bey en arkada, telefonuyla oynuyor.'),
    N('Muhtar Hilmi ayağa kalkıyor. Boğazını temizliyor.'),
    {
      t: 'if', flag: 'hilmi_itiraf',
      then: [
        say('hilmi', 'Önce ben konuşacağım. Bekçi evini köye sormadan sattım. Kızımın borcu için. Utanıyorum.'),
        say('hilmi', 'Satışı iptal ediyorum. Parayı babamdan kalan zeytinliği satıp geri vereceğim. Köyün malı köyündür.'),
        N('Çay evinde bir uğultu. Cevdet bile başını sallıyor.'),
        say('cevdet', 'Zeytinliğini mi satacaksın? …Helal olsun muhtar.'),
        bond('hilmi'),
        flag('satis_iptal'),
      ],
      else: [
        say('hilmi', 'Bekçi evi elli yıldır çürüyor! Ben köye para getirdim, yatırım getirdim!'),
        N('Arkadan bağrışmalar. Biri “Köye sordun mu?” diye bağırıyor. Hilmi terliyor.'),
        {
          t: 'choice', prompt: 'Söz alacak mısın?',
          options: [
            {
              text: 'Kalk ve Seda’nın borcunu anlat',
              then: [
                D('Hilmi Bey bunu kendisi için yapmadı. Kızının evine haciz gelecekti.'),
                N('Salon susuyor. Hilmi sana bakıyor. Gözleri dolu.'),
                say('hilmi', 'Doğru. Utanıyorum. Satışı iptal edeceğim. Zeytinliği satar, parayı geri veririm.'),
                bond('hilmi', 2),
                flag('satis_iptal'),
              ],
            },
            {
              text: 'Sessiz kal',
              then: [
                N('Toplantı uzuyor. Sonunda köy oylamaya gidiyor. Satış iptal edilecek. Hilmi muhtarlıktan istifa ediyor.'),
                N('Çıkarken sana bakmıyor.'),
                flag('satis_iptal'),
                flag('hilmi_istifa'),
              ],
            },
          ],
        },
      ],
    },
    N('Tuncer Bey kapıyı çarpıp çıkıyor. Arabası tozu dumana katarak uzaklaşıyor.'),
    say('cevdet', 'Peki ya fener, muhtar? Onu da sen mi yakıyordun? Babamın mezarı gibi duran o feneri?'),
    say('hilmi', 'Ben mi? Ben o kapıyı sadece otelciye gösterdim. Fener yandığı gece ben evimde uyuyordum.'),
    say('elif', 'Doğru! Kanıtım var. Bütün gece evinin karşısındaydım.'),
    A('fener_yanar'),
    N('Tam o anda pencereden sarı bir ışık vuruyor. Bütün başlar aynı anda dönüyor.'),
    N('Fener yanıyor. Bütün kasaba buradayken.'),
    D('Burada olmayan tek kişi…'),
    N('Pencere kenarındaki masaya bakıyorsun. Tavla kapalı. Sandalye boş.'),
    N('Şükran Hala’nın elindeki bardak yere düşüp kırılıyor.'),
    { t: 'card', title: 'Fener yandı', subtitle: 'Bütün kasaba çay evindeyken' },
  ],
  chapterEnd: {
    title: 'Bölüm 2 sonu',
    text: 'Hilmi feneri yakmıyordu; sadece satmaya çalışıyordu. Kilidin bir kopyası daha var. Fener bütün kasaba çay evindeyken yandı ve pencere kenarındaki sandalye boştu. Bölüm 3’te: Yıldız’ın Hikâyesi.',
  },
};

export const CHAPTER_2: Day[] = [day7, day8, day9, day10, day11, day12];
