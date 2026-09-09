# Naquth — Portfolio Landing Page

Landing page portofolio dengan brand **Naquth**. Desain ini original — dibangun dari nol dengan sistem grid 12-kolom, monokrom hitam-putih, dan gaya editorial/teknis (bukan meniru layout situs manapun).

## Arah desain
- **Layout**: grid 12-kolom eksplisit, rata kiri, garis pembatas (rule) sebagai elemen struktural utama — bukan card, shadow, atau bentuk melengkung
- **Warna**: monokrom murni (hitam/putih/abu), tanpa aksen warna — kontras datang dari value, bukan hue
- **Tipografi**: satu keluarga font (Inter), dibedakan lewat ukuran dan weight
- **Layanan** ditampilkan sebagai daftar bernomor dengan deskripsi, bukan kartu
- **Karya** ditampilkan sebagai daftar baris bernomor dengan meta dan tahun, bukan grid gambar
- **Alur kerja** sebagai timeline horizontal dengan garis penghubung
- **Motion**: reveal-on-scroll halus per section, tanpa efek melayang/glow/bubble

## Fitur
- Dua tema: **dark** (default, hitam pekat) dan **light** (putih), toggle di navbar, tersimpan di localStorage
- Navbar sticky sederhana (bukan pill mengambang)
- Reveal-on-scroll per section
- Responsif penuh + menu mobile

## Cara deploy ke Vercel
1. Upload folder ini ke GitHub repo, ATAU
2. Jalankan `vercel --prod` dari dalam folder ini via Vercel CLI, ATAU
3. Drag & drop folder ini ke dashboard Vercel (New Project → Deploy).

Statis penuh (HTML/CSS/JS vanilla), tanpa build step. Root langsung berisi `index.html`.

## Struktur
```
naquth-v3/
├── index.html
├── vercel.json
├── assets/
│   ├── style.css
│   └── main.js
└── images/
    ├── naquth-logo.png        (logo putih; di-invert via CSS filter otomatis untuk light mode)
    └── favicon-*.png
```

## Yang perlu diisi/disesuaikan sebelum publish
- Email kontak masih placeholder: `hello@naquth.dev`
- Link Discord & GitHub di footer masih `#`
- 4 baris "Karya" masih data contoh — ganti dengan proyek nyata dan tahun sebenarnya
- Font Inter dimuat dari Google Fonts (CDN publik) — pastikan koneksi internet tersedia saat live
