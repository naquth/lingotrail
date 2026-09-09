# AxzyCreative — Static Portfolio Snapshot

Hasil ekstraksi dari file `.mht` (web archive) yang di-upload, siap deploy ke Vercel sebagai portofolio.

## Cara deploy ke Vercel
1. Upload folder ini (isi `site/`) ke GitHub repo, ATAU
2. Jalankan `vercel` / `vercel --prod` langsung dari dalam folder ini via Vercel CLI, ATAU
3. Drag & drop folder ini ke dashboard Vercel (New Project → Deploy).

Tidak perlu build step — ini murni HTML/CSS statis, root directory langsung berisi `index.html`.

## Yang identik 100% dengan sumber
- Struktur HTML lengkap (semua teks, heading, deskripsi produk, layout section)
- CSS asli situs (134KB, file `assets/index-DiOmUwh_.css`) — byte-for-byte sama
- Bootstrap Icons CSS + font (diambil dari paket npm resmi versi yang sama: 1.11.3)
- Google Fonts (Figtree, Plus Jakarta Sans) via CSS asli yang tersimpan, font file tetap dimuat dari fonts.gstatic.com (CDN publik resmi)
- 3 gambar produk (WebP) dan logo (SVG) — byte-for-byte sama, disalin dari file .mht

## Keterbatasan (perlu diketahui — tidak bisa 100% identik)
File `.mht` adalah *snapshot* halaman setelah dirender browser ("Save Page As" di Chrome/Blink). Ini artinya:

1. **Tidak ada interaktivitas JavaScript.** Situs asli adalah aplikasi React (terlihat dari referensi ke banyak file `.js` di HTML), tapi Blink tidak menyimpan source JS saat snapshot — hanya HTML hasil akhir render. Akibatnya:
   - Menu mobile (hamburger), toggle tema, toggle bahasa **tidak berfungsi** (tombolnya ada secara visual, tapi tidak ada logic di baliknya)
   - Animasi scroll/reveal (elemen sudah dalam state "visible" karena disimpan pasca-animasi, jadi tampil statis, bukan animasi berjalan)
   - Bagian "Read more..." pada deskripsi produk tidak bisa expand/collapse

2. **Hanya 1 halaman (beranda `/`).** Halaman lain yang direferensikan di menu (`/store`, `/updates`, `/sales`, `/contact`, `/company`, `/terms`, `/donate`) **tidak tersimpan** di file .mht — hanya linknya saja. Mengklik menu tersebut akan mengarah ke situs asli (axzyhub.com) karena link masih pakai URL absolut, atau 404 jika domain diubah.

3. **Font "Moderniz" (custom/berlisensi)** yang dipakai di beberapa heading tidak tersimpan di file .mht dan tidak tersedia di sumber publik (npm/Google Fonts). CSS asli sudah punya fallback ke `"Arial Black", "Plus Jakarta Sans", Figtree, sans-serif` sehingga tampilan tetap sangat mendekati, hanya bentuk hurufnya sedikit berbeda dari aslinya.

4. **favicon.svg** tidak tersimpan di file .mht — saya gunakan `AxzyLogo.svg` sebagai pengganti sementara.

## Struktur folder
```
site/
├── index.html
├── vercel.json
├── assets/
│   ├── index-DiOmUwh_.css       (CSS utama situs, asli)
│   ├── bootstrap-icons.min.css
│   ├── google-fonts.css
│   └── fonts/
│       ├── bootstrap-icons.woff2
│       └── bootstrap-icons.woff
└── images/
    ├── AxzyLogo.svg
    ├── thumb-1174927-card.webp
    ├── thumb-1175260-full.webp
    └── thumb-1179408-card.webp
```
