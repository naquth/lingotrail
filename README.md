# Naquth — Portfolio Landing Page

Landing page portofolio pribadi dengan brand **Naquth**, tema dark, struktur dan pola motion mengacu pada referensi UI/UX sebelumnya (axzyhub), dengan seluruh konten dan identitas visual dibuat baru untuk Naquth.

## Layanan yang ditampilkan
- Web Development
- UI/UX Design
- Graphic Design

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
    ├── naquth-logo.png       (logo utama, transparan)
    └── favicon-*.png         (favicon berbagai ukuran, di-crop dari icon logo)
```

## Yang perlu diisi/disesuaikan sebelum publish
- Email kontak masih placeholder: `hello@naquth.dev` — ganti ke email asli
- Link Discord & GitHub di footer masih `#` — isi dengan link asli
- Konten portofolio (3 contoh proyek) masih contoh/placeholder — ganti dengan proyek nyata + screenshot asli sebagai gambar thumbnail kalau ada
- Font "Space Grotesk" + "Inter" dimuat dari Google Fonts (CDN publik, tidak perlu self-host)

## Catatan desain
- Reveal-on-scroll pakai IntersectionObserver — elemen baru muncul begitu discroll ke viewport (perilaku ini normal, bukan bug)
- Palet: background nyaris hitam (#0a0a0f), aksen ungu (#8b7bff) selaras dengan warna api pada logo, aksen oranye (#ff8a4c) untuk highlight kecil (status dot)
- Ikon pakai inline SVG (gaya lucide), tidak bergantung font-icon eksternal
