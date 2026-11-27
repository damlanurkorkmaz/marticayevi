# Martı Çay Evi

Ege'de küçük bir kasaba, babaanneden kalan bir çay evi ve elli yıldır sönük duran bir fener. Hikâye odaklı, rahat oynanışlı bir mobil oyun.

İlk yazın hikâyesi tamamlandı: Prolog (“Kepenk”) ve beş bölüm, “İlk Müşteriler”, “Muhtarın Planı”, “Yıldız’ın Hikâyesi”, “Ebe” ve “Fırtına Gecesi”. Toplam yirmi sekiz oyun günü, yaklaşık 3–4 saatlik oynanış ve seçimlere ve bağlara göre açılan üç son: **Fener Yanıyor**, **Aile Sırrı** ve **Kepenk**.

## Neler var?

- **Çay evi servisi:** Müşterinin ipuçlarından ne istediğini anla, içeceği seç ve zamanlama mini oyunuyla demle. Doğru içecek hikâyeyi ve bağları ilerletir; kusursuz demleme bahşiş getirir.
- **Diyalog ve seçimler:** Her karakterin kendi hikâyesi var. Seçimlerin sonraki günlerde karşına çıkar.
- **Nesrin'in defteri:** Tarifler hikâyeyle açılır. Bir tarifi kusursuz demlediğinde babaannenin o sayfadaki anısı okunur hâle gelir. Bulduğun eşyalar da burada durur.
- **Kasaba defteri:** Tanıştığın karakterler, sevdikleri içecek ve onlarla olan bağın.
- **Gece sahneleri:** Fenere gitmek, Pamuk'un peşine düşmek… Gizem gece açılır.
- **Otomatik kayıt:** Oyun her gün başında kaydedilir.

## Çalıştırma

Node.js 20 veya üstü gerekir.

```bash
npm install
npm run dev        # tarayıcıda geliştirme sunucusu (telefon görünümünde açın)
npm test           # senaryo ve oyun kuralları testleri
npm run build      # dist/ klasörüne üretim derlemesi
```

## Web'de oyna

Oyun her `main` push'unda otomatik olarak derlenir, test edilir ve GitHub Pages'te yayınlanır:

**https://damlanurkorkmaz.github.io/marticayevi/**

Telefonda bu adresi açıp tarayıcının "Ana ekrana ekle" seçeneğini kullanırsan oyun bir uygulama gibi tam ekran açılır.

## Telefona paketleme (Capacitor)

Oyun web teknolojisiyle yazıldı ve [Capacitor](https://capacitorjs.com) ile iOS ve Android uygulamasına dönüşür. Native projeler henüz depoda yok; bir kez şu adımlarla eklenir:

```bash
npm run build
npx cap add android      # Android Studio gerekir
npx cap add ios          # macOS + Xcode gerekir
npm run cap:sync         # her değişiklikten sonra
npx cap open android     # veya: npx cap open ios
```

Yazı tipleri (Fraunces, Nunito, Caveat) pakete gömülüdür, oyun internetsiz çalışır.

## Proje yapısı

```
src/
  data/
    story.ts        # Prolog ve 1. bölüm; bölüm listesi ve gün sırası
    chapter2.ts     # 2. bölüm: Muhtarın Planı
    chapter3.ts     # 3. bölüm: Yıldız’ın Hikâyesi
    chapter4.ts     # 4. bölüm: Ebe
    chapter5.ts     # 5. bölüm: Fırtına Gecesi ve üç son
    helpers.ts      # Senaryo yazarken kullanılan kısayollar (say, N, D, bond, flag…)
    characters.ts   # Karakter adları, rolleri, portreleri
    drinks.ts       # İçecekler, fiyatlar, demleme zorluğu, defter tarifleri ve anılar
  engine/
    scene.ts        # Senaryo düğümlerini çalıştıran motor
    state.ts        # Oyun durumu, bağlar, bayraklar, kayıt
  ui/
    stage.ts        # Oyun ekranı: arka plan, karakter, diyalog kutusu, demleme
    overlays.ts     # Tarif defteri ve kasaba defteri
    art.ts          # Arka plan çizimleri (SVG)
  game.ts           # Gün döngüsü: sabah, müşteriler, akşam, gece, gün sonu
  main.ts           # Başlık ekranı
public/assets/portraits/   # Karakter portreleri (SVG)
tests/story.test.ts        # Senaryo bütünlüğü ve kurallar
```

## Yeni gün ya da sahne eklemek

Senaryo tamamen veri olarak yazılıdır; motoru değiştirmeden yeni günler eklenebilir. Her bölüm kendi dosyasında durur (örneğin `src/data/chapter2.ts`) ve `story.ts` içindeki `DAYS` listesine eklenir. Bir gün şu parçalardan oluşur:

```ts
{
  n: 7, chapter: 2, title: 'Muhtarın Planı', weekday: 'Pazar',
  morning: [N('Anlatıcı cümlesi'), say('hilmi', 'Karakter repliği')],
  visits: [{ who: 'hilmi', arrive: [...], wants: 'kahve', right: [...], wrong: [...], after: [...] }],
  evening: [...],
  night: [...],
  chapterEnd: { title: 'Bölüm 2 sonu', text: '...' },
}
```

Kullanılabilen düğümler: `say`, `choice`, `bond`, `flag`, `if`, `money`, `recipe`, `item`, `backdrop`, `card`, `enter` (müşteriyi sahnenin ortasında içeri sokar), `ifBond` (belirli karakterlerle bağ yeterince güçlüyse bir yol açar). Yeni bir bölüm eklerken `CHAPTERS` listesine adını, `NEXT_UP` satırına da sıradaki bölümü yazın.

`npm test` her değişiklikte şunları kontrol eder: bilinmeyen karakter ya da içecek kullanılmamış mı, kontrol edilen her bayrak bir yerde açılıyor mu, bir müşteri tarifi henüz açılmamış bir içecek istiyor mu, satırlar telefona sığacak uzunlukta mı, ve oyun baştan sona iki farklı seçim yoluyla hatasız oynanabiliyor mu.

## Sonraki fazlar

Hikâyenin tamamı (5 bölüm, 3 son) ve sonraki yazlar için senaryo taslağı ayrı bir belgede tutuluyor. Sıradaki: **2. yaz — Yazlık Sinema.**
