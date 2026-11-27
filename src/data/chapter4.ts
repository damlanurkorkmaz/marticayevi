import type { Day } from '../types';
import { D, N, bg, bond, flag, say, yusufDaily } from './helpers';

// ---------------------------------------------------------------------------
// BÖLÜM 4 — "Ebe"
// To make Şükran talk, the player recreates the herbal blend she and Nesrin
// used to brew. Then she tells the storm night: Nesrin went into labour,
// Yusuf left the lighthouse and rowed her across the bay to the midwife.
// The baby, born 2 September 1976, is Deniz's mother. Yusuf is the grandfather.
// Not revealed yet (chapter 5): whether the light would have saved Rıza.
// ---------------------------------------------------------------------------

const day19: Day = {
  n: 19, chapter: 4, title: 'Kayıp Tarif', weekday: 'Cuma',
  morning: [
    bg('cayevi'),
    N('Temmuz bitti, ağustos geldi. Çay evinin önündeki masalar artık her sabah dolu. Kasaba sana alıştı. Sen de kasabaya.'),
    N('Pencere kenarından bir ses geliyor. Kısık, paslı ama artık her sabah.'),
    say('yusuf', 'Günaydın.'),
    D('Günaydın, Yusuf Amca.'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'sukran',
      arrive: [say('sukran', 'Adaçayı yavrum. Ballı. Söz verdim, biliyorum. Anlatacağım.')],
      wants: 'adacayi',
      right: [bond('sukran')],
      wrong: [say('sukran', 'Olsun.')],
      after: [
        say('sukran', 'Ama o geceyi anlatmak için önce o geceyi hatırlamam lazım. Bir tadı var o gecenin.'),
        say('sukran', 'Nesrin’le gençken bir çay yapardık. İkimizin sırrı. Deftere bile yazmadı. O gece de onu içtik.'),
        say('sukran', 'Adaçayı. Kekik. Bir de bal gibi kokan beyaz bir çiçek… Adını hatırlamıyorum. Yaşlılık.'),
        say('sukran', 'Sen onu yap. İçeyim. Sonra her şeyi anlatırım.'),
        flag('harman_gorev'),
      ],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata. Ve görev mi var? Yüzünden belli. Ben de varım.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Görev başında yanlış limonata olur.')],
      after: [
        say('elif', 'Bal gibi kokan beyaz çiçek mi? Kanala sorarım. 240 abonem oldu, biri bilir.'),
      ],
    },
  ],
  evening: [
    bg('cayevi'),
    N('Kapanışta Yusuf Amca hâlâ pencere kenarında. Kalkarken yanından geçiyorsun.'),
    say('yusuf', 'Kekik fenerin kayalıklarında biter. Nesrin oradan toplardı.'),
  ],
  night: [
    bg('fener'),
    N('Gece fenerin dibindeki kayalıklara iniyorsun. Ay dolunay. Kayaların arasında küçük, mor çiçekli çalılar.'),
    N('Kapının önünde biri oturuyor. Yusuf Amca. Elinde bir fener lambası. Seni bekliyormuş gibi.'),
    say('yusuf', 'Şu taşın dibindekini al. Güneşi en çok o görür. En kokulusu odur.'),
    { t: 'item', id: 'kekik', name: 'Kayalık kekiği' },
    flag('kekik'),
    {
      t: 'choice', prompt: 'Yanına oturacak mısın?',
      options: [
        {
          text: 'Merdivene, yanına otur',
          then: [
            N('Bir süre ikiniz de denize bakıyorsunuz. Fenerin camında ay ışığı.'),
            say('yusuf', 'Nesrin de burada otururdu. Tam senin oturduğun yerde.'),
            bond('yusuf'),
          ],
        },
        { text: 'Teşekkür et ve dön', then: [say('yusuf', 'Git. Geç oldu. Rüzgâr dönüyor.')] },
      ],
    },
  ],
};

const day20: Day = {
  n: 20, chapter: 4, title: 'Mürver', weekday: 'Cumartesi',
  morning: [
    bg('cayevi'),
    N('Kekiği tezgâhın üstünde kurumaya bıraktın. Bütün çay evi kayalık kokuyor.'),
    say('elif', 'Kanaldan cevap geldi! Yirmi kişi “yasemin” dedi, biri “mürver” dedi. Mürver olan Ankara’dan bir botanik hocası. Ona güveniyorum.'),
  ],
  visits: [
    yusufDaily(),
    {
      who: 'hilmi',
      arrive: [say('hilmi', 'Ballı adaçayı. Zeytinliği devrettim bugün. Garip bir gün.')],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Bugün hiçbir şeyin tadını almıyorum zaten.')],
      after: [
        D('Hilmi Bey, mürver ağacı bilir misiniz? Bal gibi kokan beyaz çiçekli.'),
        say('hilmi', 'Bilmez olur muyum! Zeytinliğin dibinde koca bir tane var. Babam dikmişti.'),
        say('hilmi', 'Gerçi artık zeytinlik benim değil. Ama yeni sahibi ağaç için bir şey demez. Benimle gel, göstereyim.'),
        {
          t: 'choice',
          options: [
            {
              text: 'Hilmi’yle zeytinliğe git',
              then: [
                N('Öğleden sonra zeytinlikteyiz. Hilmi her ağacın yanında durup bir şey anlatıyor. Bu ağacı dedesi aşılamış, şunu Seda doğunca dikmişler.'),
                N('En dipte mürver. Beyaz, şemsiye gibi açmış çiçekler. Gerçekten bal gibi kokuyor.'),
                say('hilmi', 'Al. Ne kadar istersen al. Artık bu ağacı benden başka hatırlayan biri daha var.'),
                bond('hilmi', 2),
              ],
            },
            {
              text: '“Siz toplayıp getirebilir misiniz?”',
              then: [N('Akşamüstü Hilmi kapıda. Elinde gazeteye sarılı bir demet beyaz çiçek. Bir şey demeden bırakıp gidiyor.'), bond('hilmi')],
            },
          ],
        },
        { t: 'item', id: 'murver', name: 'Mürver çiçeği' },
        flag('murver'),
      ],
    },
    {
      who: 'cevdet',
      arrive: [say('cevdet', 'Kahve. Kemal Usta söyledi, Şükran bir şey anlatacakmış. O geceyi.')],
      wants: 'kahve',
      right: [bond('cevdet')],
      wrong: [say('cevdet', 'Kahvenin tadı umurumda değil bugün.')],
      after: [
        say('cevdet', 'Ben de dinlemek istiyorum. Babam o gece öldü. Hakkım var.'),
        {
          t: 'choice', prompt: 'Cevdet’e ne diyeceksin?',
          options: [
            {
              text: '“Haklısınız. Gelin.”',
              then: [say('cevdet', 'Sağ ol. Ne duyarsam duyayım, sesimi çıkarmayacağım. Söz.'), bond('cevdet'), flag('cevdet_davet')],
            },
            {
              text: '“Önce ben dinleyeyim. Sonra size kendim anlatırım.”',
              then: [say('cevdet', '…Peki. Ama bir şey saklarsan, bunu da elli yıl unutmam.'), flag('cevdet_sonra')],
            },
          ],
        },
      ],
    },
    {
      who: 'kemal',
      arrive: [say('kemal', 'Ihlamur. Bütün kasaba senin harmanını konuşuyor. Kekik, mürver… Abla’nın işi.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Neyse, ben ıhlamurdan şaşmam ama sen şaşabilirsin.')],
      after: [say('kemal', 'Bir sır vereyim. Abla her demliğe en son bir tutam tuz atardı. Kimse fark etmezdi. Ama fark ederdin.')],
    },
  ],
};

const day21: Day = {
  n: 21, chapter: 4, title: 'Harman', weekday: 'Pazar',
  morning: [
    bg('cayevi'),
    N('Sabah erkenden tezgâhın başındasın. Adaçayı, kayalık kekiği, mürver çiçeği. Ve en son, bir tutam tuz.'),
    N('Defterin en son boş sayfasını açıyorsun. Kendi el yazınla ilk kez bir tarif yazıyorsun.'),
    { t: 'recipe', id: 'harman' },
    N('Dört dakika. Fazlası acı, azı tatsız. Bu çayın affı yok.'),
  ],
  visits: [
    {
      who: 'sukran',
      arrive: [
        say('sukran', 'Kokusu sokağa taşmış yavrum. Kapıya kadar geldi, beni çağırdı.'),
        say('sukran', 'Hadi bakalım. Elli yıl sonra.'),
      ],
      wants: 'harman',
      right: [
        N('Şükran Hala bardağı burnuna götürüyor. Gözlerini kapatıyor. Bir yudum.'),
        N('Uzun bir süre öyle kalıyor. Gözlerinden yaşlar süzülüyor ama gülümsüyor.'),
        say('sukran', 'İşte bu. Nesrin’in ellerinin kokusu. Elli yıl sonra.'),
        bond('sukran', 2),
      ],
      wrong: [
        N('Şükran Hala bir yudum alıyor. Başını iki yana sallıyor.'),
        say('sukran', 'Değil yavrum. Ama yakın. Çok yakın. Niyetin yeter. Nesrin de ilk seferde tutturamamıştı.'),
        bond('sukran'),
      ],
      after: [
        say('sukran', 'Yarın sabah, dükkânı açmadan. Ben gelirim. Yusuf da gelsin. Anlatacağım.'),
        flag('sukran_anlatacak'),
      ],
    },
    {
      who: 'yusuf',
      arrive: [N('Yusuf Amca harmanın kokusunu alınca kapıda duruyor. Sonra yavaşça yerine geçiyor.')],
      wants: 'tavsan',
      right: [
        bond('yusuf'),
        say('yusuf', 'Şükran anlatacak mı?'),
        D('Yarın sabah.'),
        say('yusuf', 'İyi. Benim sesim yetmez. Elli yıl sustu, o kadar şeyi taşıyamaz.'),
      ],
      wrong: [N('Bugün bardağa bakmıyor bile. Harmanın kokusu onu başka bir yere götürmüş.')],
    },
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata. Ve sanırım yarın sabah gelmemem gerekiyor. Değil mi?')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Neyse.')],
      after: [
        {
          t: 'choice',
          options: [
            { text: '“Bu sefer gelmesen iyi olur, Elif.”', then: [say('elif', 'Anlıyorum. Bazı hikâyeler kanala değil, insanlara aittir. Bunu bir yere yazacağım.'), bond('elif')] },
            { text: '“Gelmek istersen kapının önünde bekle.”', then: [say('elif', 'Kapının önünde, kulaklıklarım takılı, hiçbir şey duymadan. Söz.')] },
          ],
        },
      ],
    },
  ],
};

const day22: Day = {
  n: 22, chapter: 4, title: 'Ebe', weekday: 'Pazartesi',
  morning: [
    bg('cayevi'),
    N('Sabah altı. Kepenk yarıya kadar açık. Masada üç bardak harman. Şükran Hala bir yanda, Yusuf Amca pencere kenarında.'),
    { t: 'if', flag: 'cevdet_davet', then: [N('Cevdet kapının yanındaki sandalyede, kollarını kavuşturmuş. Yusuf’a bakmıyor.')] },
    say('sukran', '1976. Ben yirmi dört yaşındaydım. Kasabanın ebesi. Nesrin yirmi iki. Yusuf yirmi sekiz, fenerin bekçisi.'),
    say('sukran', 'Nesrin’le Yusuf birbirini severdi. Kimse bilmezdi. Bir ben bilirdim. Bir de Nesrin’in karnındaki bebek.'),
    say('sukran', 'Sonbaharda evleneceklerdi. Yusuf’un tayini çıkınca. Nesrin geniş elbiseler giyerdi, kimse fark etmedi.'),
    say('sukran', 'Ama bebek erken geldi. 2 Eylül gecesi. Fırtınanın ortasında. Nesrin bu dükkânın üstündeki odada, tek başına.'),
    say('sukran', 'Kanaması vardı. Kasabada doktor yoktu. Benim evim karşı kıyıdaydı. Yolu sel basmıştı.'),
    say('yusuf', 'Pencerede lambayı üç kez yakıp söndürdü. Bizim işaretimizdi. Fenerden gördüm.'),
    say('yusuf', 'Feneri bıraktım. Sandalı indirdim. Onu kucağımda indirdim merdivenlerden. Kayığın feneri rüzgârda söndü. Karanlıkta kürek çektim.'),
    say('sukran', 'Sabaha karşı üçte kapım çaldı. İkisi de sırılsıklam. Bebek o gece, benim elimde doğdu. Bir kız.'),
    N('Şükran Hala bardağını bırakıyor. Sesi titriyor.'),
    say('sukran', 'Sabah Rıza’nın teknesini kayalıkta buldular. Kasaba bekçiyi suçladı. Fener yanmıyordu çünkü.'),
    say('yusuf', 'Gerçeği söyleseydim, Nesrin’in adı çıkardı. Evlenmemiş bir kız, bir bebek, 1976. Bu kasaba onları yaşatmazdı.'),
    say('yusuf', 'Ben sustum. Suçu aldım. Nesrin birkaç ay sonra Ahmet’le evlendi. Bebeği Ahmet’in kızı diye büyüttü.'),
    say('sukran', 'Bebeğin adını Nesrin koydu. Onları kurtarmak için denize açılan teknenin adını. Yıldız.'),
    N('Yıldız. Annenin adı.'),
    D('Annem… 2 Eylül 1976’da doğdu.'),
    say('yusuf', 'Biliyorum. Her yıl o gece feneri yakıyorum. Onun doğduğu gece. Rıza’nın öldüğü gece.'),
    {
      t: 'if', flag: 'cevdet_davet',
      then: [
        N('Kapının yanında bir sandalye gıcırdıyor. Cevdet ayağa kalkmış. Yüzü bembeyaz.'),
        say('cevdet', 'Babam… sizi kurtarmak için mi öldü?'),
        N('Kimse cevap vermiyor. Cevdet kapıyı açıp çıkıyor. Kepengin altından eğilerek. Tek kelime etmeden.'),
        flag('cevdet_biliyor'),
      ],
    },
    {
      t: 'choice', prompt: 'Yusuf Amca’ya ne diyeceksin?',
      options: [
        {
          text: '“Neden bana hiç söylemedin?”',
          then: [
            say('yusuf', 'Nesrin’e söz verdim. Onun sırrıydı. O gitti, söz kaldı.'),
            say('yusuf', 'Sonra sen geldin. Onun gibi çay demledin. Sözümü tutmak zorlaştı.'),
          ],
        },
        {
          text: 'Kalk ve ona sarıl',
          then: [
            N('Kalkıyorsun. Yusuf Amca’nın önünde duruyorsun. Sonra kollarını ona doluyorsun.'),
            N('Bir an kaskatı kalıyor. Sonra elini, çok yavaşça, sırtına koyuyor. Titriyor.'),
            bond('yusuf'),
          ],
        },
        {
          text: 'Hiçbir şey söyleme, bardağını tazele',
          then: [
            N('Kalkıp demliği getiriyorsun. Önce onun bardağını dolduruyorsun. Tavşan kanı. Şekersiz.'),
            say('yusuf', 'Nesrin de öyle yapardı. Söyleyecek söz bulamayınca çay koyardı.'),
          ],
        },
      ],
    },
    bond('yusuf', 2),
    flag('dede'),
    { t: 'card', title: 'Yıldız', subtitle: '2 Eylül 1976, sabaha karşı üç' },
  ],
  visits: [
    {
      who: 'elif',
      arrive: [N('Öğleye doğru Elif sessizce içeri giriyor. Kulaklıkları boynunda. Hiçbir şey sormuyor.'), say('elif', 'Limonata. Ve… iyi misin?')],
      wants: 'limonata',
      right: [bond('elif'), say('elif', 'Anlatmak istersen buradayım. İstemezsen de buradayım.')],
      wrong: [say('elif', 'Ellerin titriyor. Otur biraz, ben kendim yaparım.')],
    },
  ],
  evening: [
    bg('telefon'),
    D('Anne… adın neden Yıldız?'),
    say('anne', 'Ne biliyim. Babaannen koydu. Bir teknenin adıymış, öyle derdi. Neden sordun?'),
    {
      t: 'choice', prompt: 'Ne yapacaksın?',
      options: [
        {
          text: 'Her şeyi şimdi anlat',
          then: [
            N('Anlatıyorsun. Fırtınayı, kayığı, Şükran Hala’yı, pencere kenarındaki adamı. Annen bir kez bile sözünü kesmiyor.'),
            N('Sonunda hat uzun süre sessiz kalıyor.'),
            say('anne', 'Babaannen o gece sayıkladığında… o adı… Ben on yaşındaydım. Tokat attı. Şimdi anlıyorum neden.'),
            say('anne', 'Kapatmam lazım. Düşünmem lazım.'),
            flag('anne_biliyor'),
          ],
        },
        {
          text: '“Telefonda olmaz. Yüz yüze anlatacağım.”',
          then: [say('anne', 'Korkutuyorsun beni.'), D('Korkulacak bir şey değil anne. Sadece… çok uzun bir hikâye.'), flag('anne_yuzyuze')],
        },
      ],
    },
  ],
};

const day23: Day = {
  n: 23, chapter: 4, title: 'Elli Yıl', weekday: 'Salı',
  morning: [
    bg('cayevi'),
    N('Ertesi sabah Yusuf Amca her zamankinden erken geliyor. Kasketini çıkarıp masaya koyuyor. İlk kez.'),
  ],
  visits: [
    {
      who: 'yusuf',
      arrive: [N('Tavla açık. Karşısındaki sandalye senin.')],
      wants: 'tavsan',
      right: [
        bond('yusuf'),
        say('yusuf', 'Elli yıl. Her sabah. Bir kelime etmedik. Bir kere bile.'),
        say('yusuf', 'Ama çayın rengine bakardım. Koyuysa iyi değildi o gün. Açıksa gülüyordu.'),
        say('yusuf', 'Seninki onunki gibi. Bugün açık.'),
      ],
      wrong: [say('yusuf', 'Bu onun çayı değil. Ama bugün fark etmez. Otur.')],
      after: [
        {
          t: 'choice', prompt: 'Ona ne diyeceksin?',
          options: [
            {
              text: '“Sana dede diyebilir miyim?”',
              then: [
                N('Cevap vermiyor. Veremiyor. Sadece başını sallıyor. Bir kez. İki kez.'),
                N('Sonra tavlanın pullarını diziyor. Sana zarları uzatıyor.'),
                bond('yusuf'),
                flag('dede_dedi'),
              ],
            },
            {
              text: '“Bir el tavla atalım mı, Yusuf Amca?”',
              then: [
                N('Zarları uzatıyor. İlk el sen kazanıyorsun. Sonra o. Sonra o. Sonra yine o.'),
                say('yusuf', 'Nesrin de hep ilk eli kazanırdı. Sonra kızardı.'),
              ],
            },
          ],
        },
      ],
    },
    {
      who: 'cevdet',
      arrive: [
        {
          t: 'if', flag: 'cevdet_biliyor',
          then: [N('Cevdet kapıda. Gözleri kan çanağı. Bütün gece uyumamış.')],
          else: [N('Cevdet içeri giriyor. Yüzüne bakınca bir şeyler olduğunu anlıyor.'), say('cevdet', 'Şükran anlattı mı? Söz vermiştin.')],
        },
      ],
      wants: 'kahve',
      right: [bond('cevdet')],
      wrong: [say('cevdet', 'Kahve değil derdim.')],
      after: [
        {
          t: 'if', flag: 'cevdet_biliyor',
          then: [],
          else: [
            N('Anlatıyorsun. Doğumu, kayığı, Yıldız adını. Cevdet hiç kıpırdamadan dinliyor.'),
            flag('cevdet_biliyor'),
          ],
        },
        say('cevdet', 'Babam o kayığı kurtarmak için öldü. Ve kurtarmış da. Bir bebek doğmuş. Annen.'),
        say('cevdet', 'Elli yıl o adama kızdım. Şimdi kime kızacağımı bilmiyorum. Belki de kimseye.'),
        say('cevdet', '2 Eylül’de teknede olacağım. Her yıl olduğu gibi. Bu sene ne düşüneceğimi bilmiyorum.'),
      ],
    },
    {
      who: 'sukran',
      arrive: [say('sukran', 'Harman yavrum. Artık her sabah onu içeceğim.')],
      wants: 'harman',
      right: [bond('sukran'), say('sukran', 'Elli yıllık yükü dün bıraktım. Sırtım hafif. Uyudum, rüyamda Nesrin vardı. Gülüyordu.')],
      wrong: [say('sukran', 'Değil ama olsun. Dünden beri her şey olsun.')],
    },
  ],
};

const day24: Day = {
  n: 24, chapter: 4, title: 'Fırtına Uyarısı', weekday: 'Çarşamba',
  morning: [
    bg('liman'),
    N('Ağustosun son günleri. Liman reisliği iskeleye kırmızı bir bayrak çekiyor. Radyo aynı haberi tekrarlıyor:'),
    say('anlatici', '“Meteorolojiden kuvvetli fırtına uyarısı: 2 Eylül gecesi Ege kıyılarında rüzgâr saatte 90 kilometreyi bulabilir.”'),
    D('2 Eylül. Elli yıl sonra. Aynı gece.'),
    bg('cayevi'),
  ],
  visits: [
    yusufDaily([say('yusuf', 'Fırtına geliyor. Hissediyorum. Dizim söylüyor.')]),
    {
      who: 'elif',
      arrive: [say('elif', 'Limonata! Fırtına uyarısı! 2 Eylül! Bu kadar da edebi olmaz ama.')],
      wants: 'limonata',
      right: [bond('elif')],
      wrong: [say('elif', 'Edebiyat yanlış limonatayı affeder.')],
      after: [say('elif', 'O gece fenerde olacağım. Bu sefer kamera için değil. Yanında olmak için.')],
    },
    {
      who: 'kemal',
      arrive: [say('kemal', 'Ihlamur. Bütün kasabanın kepenklerini sağlamlaştırdım bugün. Seninkine de bakarım.')],
      wants: 'ihlamur',
      right: [bond('kemal')],
      wrong: [say('kemal', 'Olsun. Fırtına öncesi ne içsen olur.')],
    },
    {
      who: 'hilmi',
      arrive: [say('hilmi', 'Ballı adaçayı. Köye haber verdim, o gece kimse denize çıkmayacak. Kimse.')],
      wants: 'adacayi',
      right: [bond('hilmi')],
      wrong: [say('hilmi', 'Olsun, olsun.')],
    },
  ],
  evening: [
    bg('telefon'),
    say('anne', 'Fırtına uyarısını haberlerde gördüm. Tam doğum günümde. Sizin oraya.'),
    say('anne', 'Ben… bu sene oraya gelsem mi diyorum. İlk kez. Ne dersin?'),
    {
      t: 'choice', prompt: 'Annene ne diyeceksin?',
      options: [
        { text: '“Gel anne. Seni biriyle tanıştırmam lazım.”', then: [say('anne', 'Biletime bakıyorum. 1 Eylül akşamı oradayım.'), flag('anne_geliyor')] },
        { text: '“Fırtına geçsin, sonra gel.”', then: [say('anne', 'Belki de haklısın. Sen orada dikkatli ol, olur mu?'), flag('anne_sonra')] },
      ],
    },
  ],
  night: [
    bg('fener'),
    N('Gece fenerin merdivenlerinde Yusuf Amca’yla oturuyorsun. Rüzgâr şimdiden dönmeye başlamış.'),
    say('yusuf', 'Fener o gece yansaydı, Rıza kayalığı görürdü. Elli yıl bunu düşündüm. Her gece.'),
    {
      t: 'choice', prompt: 'Ne diyeceksin?',
      options: [
        {
          text: '“Kasette motorun ses vermediğini söylüyordu.”',
          then: [
            say('yusuf', 'Duydum. Kemal anlattı.'),
            say('yusuf', 'Motor durmuş olsa ne olur? Fener yansaydı belki kürekle dönerdi. Belki. Elli yıl “belki”yle yaşanmıyor.'),
            flag('motor_suphe'),
          ],
        },
        {
          text: '“Bir bebeği kurtardın, dede. Annemi.”',
          then: [say('yusuf', 'Bir bebek kurtardım. Bir babayı kaybettik. Terazi elli yıldır dengede durmuyor.'), bond('yusuf')],
        },
      ],
    },
    N('Fenerin camında ilk şimşek yansıyor. Uzaklarda, çok uzaklarda.'),
  ],
  chapterEnd: {
    title: 'Bölüm 4 sonu',
    text: 'Yusuf o gece fenerini bir doğum için bıraktı. Bebek annendi ve adını onları kurtarmaya gelen tekneden aldı: Yıldız. Pencere kenarındaki adam deden. Ve 2 Eylül gecesi, elli yıl sonra, yeniden fırtına geliyor. Bölüm 5’te: Fırtına Gecesi.',
  },
};

export const CHAPTER_4: Day[] = [day19, day20, day21, day22, day23, day24];
