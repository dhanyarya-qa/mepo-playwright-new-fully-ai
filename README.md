## mepo-playwright (NEW) Fully AI

Playwright TypeScript automation suite untuk website publik `https://dev.mepo.travel/`.

Proyek ini dibuat untuk memastikan semua fitur publik utama tervalidasi secara end-to-end: menu, halaman, tombol, teks, banner, footer, social links, halaman external, dan behavior form.

## AI Attribution

Proyek ini **terbuat full menggunakan AI Cursor** (analisis fitur, penyusunan test plan, implementasi test suite, dan stabilisasi locator/assertion).

## Cakupan Test

### 1) Route publik
- `/`
- `/about`
- `/products`
- `/activities`
- `/term-conditions`
- `/contact-us`

### 2) Header / navigasi
- Validasi link nav: `Home`, `About`, `Products`, `Activities`, `Contact Us`
- Validasi desktop + mobile drawer behavior
- Validasi routing setelah klik tiap menu

### 3) Download menu
- Klik dropdown `Download`
- Klik App Store dan Play Store
- Validasi popup terbuka ke domain yang benar
- Validasi konten minimal halaman external (bukan sekadar URL)

### 4) Language switch
- Klik tombol bahasa `ID`
- Jika opsi language tersedia, lakukan switch
- Validasi halaman tetap valid setelah aksi

### 5) Home interactions
- CTA `See Details`
- Accordion `What’s Inside`:
  - `Itinerary Planning`
  - `Activity Creation`
  - `Invite and Join`
  - `Itinerary Recommendations`
- Partner links (`Join as Partner`, `Corporate outing`)
- Tombol `Back to top` (mobile viewport behavior)

### 6) Products interactions
- Validasi heading & section utama
- Validasi tombol `See More` dapat diinteraksikan

### 7) Contact Us
- Validasi field required (`Full Name`, `Phone Number`, `Email`, `Your Message`)
- Validasi negative submit (empty fields -> constraint validation)
- Validasi real submit (guarded):
  - Default **ON di CI** (kecuali `RUN_CONTACT_SUBMIT=false`)
  - Default **OFF di local** (aktifkan dengan `RUN_CONTACT_SUBMIT=true`)

### 8) Footer & social
- Validasi links footer: `Home`, `About`, `Products`, `Activities`, `Terms & Conditions`
- Validasi `WhatsApp` dan `mailto`
- Validasi social links (Instagram/TikTok/LinkedIn)
- Validasi popup + konten minimal social page

### 9) Activities banners/cards (semua item clickable)
- Validasi semua card:
  - Teks (judul/excerpt/author marker)
  - Visual screenshot per-card (strict)
  - Click behavior (navigate/popup/stay)
  - Jika navigate ke detail: heading detail diverifikasi sesuai judul card

### 10) Visual regression banner/hero
- Snapshot strict untuk:
  - Home
  - About
  - Products
  - Activities
  - Terms
  - Contact Us
- Menggunakan masking gambar untuk mengurangi flakiness rendering asset eksternal.

### 11) External pages content validation
- App Store
- Google Play
- Instagram
- TikTok
- LinkedIn

Setiap external page tidak hanya dicek URL, tapi juga konten minimal yang stabil.

## Struktur Project

- `playwright.config.ts`
- `tests/pages/*` (Page Object Model)
- `tests/specs/*` (test specs per fitur)

## Menjalankan Project

### Prasyarat
- Node.js

### Install dependency
```bash
npm i
npx playwright install
```

### Jalankan semua test
```bash
npm test
```

### Update visual baseline snapshots
```bash
npm run test:update
```

### Buka report
```bash
npm run report
```

### Menjalankan real submit Contact Us

#### Local (manual opt-in)
```powershell
$env:RUN_CONTACT_SUBMIT="true"
npm test -- tests/specs/contact-us.submit.spec.ts
```

#### CI default behavior
- Jika `CI=true`, test submit aktif otomatis
- Untuk menonaktifkan di CI: set `RUN_CONTACT_SUBMIT=false`

