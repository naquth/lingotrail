# Naquth — Portfolio Landing Page

Landing page portofolio dengan brand **Naquth**. Struktur, layout, motion, dan sistem warna (light + dark theme dengan toggle) dibangun mengikuti referensi UI/UX axzyhub.com secara persis — konten dan identitas visual sepenuhnya milik Naquth.

## Layanan yang ditampilkan
- Web Development
- UI/UX Design
- Graphic Design

## Fitur
- **Dua tema**: light (default, putih + aksen ungu pastel) dan dark (hitam + aksen putih), dengan tombol toggle di navbar — pilihan tersimpan di localStorage
- **Navbar mengambang**: transparan lebar di posisi awal, menyusut jadi pill solid saat discroll
- Animasi reveal per-karakter di headline hero
- Reveal-on-scroll untuk semua section
- Floating decorative chips di section layanan
- Kartu produk dengan harga miring (price tag), mengikuti gaya kartu toko di referensi
- Responsif penuh + menu mobile dengan hamburger toggle

## Cara deploy ke Vercel
1. Upload folder ini ke GitHub repo, ATAU
2. Jalankan `vercel --prod` dari dalam folder ini via Vercel CLI, ATAU
3. Drag & drop folder ini ke dashboard Vercel (New Project → Deploy).

Statis penuh (HTML/CSS/JS vanilla), tanpa build step. Root langsung berisi `index.html`.

## Struktur
```
naquth-site/
├── index.html
├── vercel.json
├── assets/
│   ├── style.css
│   └── main.js
└── images/
    ├── naquth-logo.png        (logo putih, dipakai di dark mode)
    ├── naquth-logo-dark.png   (logo gelap, dipakai di light mode / default)
    └── favicon-*.png
```

## Yang perlu diisi/disesuaikan sebelum publish
- Email kontak masih placeholder: `hello@naquth.dev`
- Link Discord & GitHub di footer masih `#`
- 3 contoh portofolio (kartu produk) masih placeholder — ganti dengan proyek nyata, dan tambahkan gambar thumbnail asli (saat ini `.work-thumb` polos tanpa gambar — ganti `<div class="work-thumb">` jadi `<img class="work-thumb" src="...">` jika sudah ada gambarnya)
- Font Space Grotesk + Plus Jakarta Sans dimuat dari Google Fonts (CDN publik) — pastikan koneksi internet tersedia saat live, tidak perlu self-host

## Catatan desain
- Logo otomatis berganti versi (dark↔light) mengikuti tema aktif lewat CSS `filter: invert()`
- Palet: light mode putih dengan radial-glow ungu pastel; dark mode hitam pekat `rgb(5,5,5)` dengan glow putih halus — sama seperti referensi
- Ikon pakai inline SVG (gaya lucide), tidak bergantung font-icon eksternal
