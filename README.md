# LingoTrail

Platform belajar bahasa full-stack — jalur pembelajaran visual, sistem hearts/gems/streak, quiz interaktif, dan klasemen. Dibangun dengan Next.js, Neon Postgres (Drizzle ORM), dan NextAuth.

> **Catatan desain**: Aplikasi ini terinspirasi dari konsep gamifikasi belajar bahasa populer (unit -> lesson -> quiz, hearts, XP, streak, leaderboard), tapi menggunakan identitas visual, nama, maskot, dan branding orisinal (LingoTrail / Compa). Ini bukan replika dari produk manapun -- logo, warna, dan aset pihak ketiga tidak digunakan.

## Stack

- Next.js 15 (App Router, Turbopack)
- TypeScript + Tailwind CSS v4
- Neon Postgres + Drizzle ORM
- NextAuth v5 (credentials login)
- Radix UI, Lucide Icons, canvas-confetti

## Setup lokal

### 1. Install dependencies

```bash
npm install
```

### 2. Buat database Neon

1. Daftar di neon.tech (gratis).
2. Buat project baru -> salin connection string (format `postgresql://...`).

### 3. Environment variables

Salin `.env.example` menjadi `.env.local`, lalu isi:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://user:password@ep-xxxx.neon.tech/neondb?sslmode=require"
AUTH_SECRET="hasil-dari-openssl-rand-base64-32"
```

Generate AUTH_SECRET:

```bash
openssl rand -base64 32
```

### 4. Buat tabel + isi data awal lewat SQL Editor Neon

Cara paling gampang, tanpa perlu terminal:

1. Buka project Neon kamu -> menu **SQL Editor**.
2. Buka file `schema.sql` di root folder project ini.
3. Copy seluruh isinya, paste ke SQL Editor Neon.
4. Klik **Run**.

File ini sudah berisi 11 tabel + data awal (6 bahasa, 3 unit, 6 lesson, 17 soal untuk Bahasa Inggris). Setelah run, database kamu langsung siap dipakai -- tidak perlu langkah `db:push` atau `db:seed` lagi.

> Alternatif lewat terminal (kalau lebih suka Drizzle CLI): `npm run db:push` lalu `npm run db:seed`. Fungsinya sama persis dengan `schema.sql`, tinggal pilih salah satu.

### 5. Jalankan dev server

```bash
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel

### Opsi A -- lewat Vercel Dashboard (termudah)

1. Push kode ini ke repo GitHub/GitLab.
2. Buka vercel.com/new -> import repo.
3. Di bagian Environment Variables, tambahkan:
   - `DATABASE_URL` -- connection string Neon kamu
   - `AUTH_SECRET` -- secret yang sama dari langkah lokal
4. Klik Deploy.
5. Kalau tabel di Neon belum dibuat sebelumnya (langkah 4 di atas), jalankan `schema.sql` lewat SQL Editor Neon dulu -- itu sudah termasuk seed data, jadi tidak perlu langkah tambahan setelah deploy.

### Opsi B -- lewat Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# ikuti prompt, lalu set env vars:
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel --prod
```

## Struktur proyek

```
app/
  (main)/           -> halaman dengan sidebar: learn, leaderboard, shop, profile, courses
  lesson/            -> halaman quiz fullscreen
  login/ register/   -> autentikasi
  onboarding/        -> pilih bahasa pertama kali
  api/               -> route handler (auth, register)
actions/             -> server actions (progress, challenge, logout)
db/
  schema.ts          -> skema Drizzle lengkap
  queries.ts         -> query reusable (cached)
  drizzle.ts         -> koneksi Neon
components/
  ui/                -> Button, Progress (design system dasar)
  layout/            -> Sidebar, mobile nav, stats bar
  course/            -> trail path, lesson node, course card
  lesson/            -> quiz engine, challenge card
  shop/              -> refill hearts
scripts/seed.ts       -> data awal (6 bahasa, 3 unit, 6 lesson, 17 soal)
```

## Fitur yang sudah jalan

- [x] Register & login (credentials + bcrypt)
- [x] Onboarding pilih bahasa (multi-bahasa, aktif: Bahasa Inggris)
- [x] Trail path visual dengan node lesson zig-zag
- [x] Quiz engine: pilihan ganda, feedback benar/salah, confetti
- [x] Sistem hearts (berkurang saat salah, terisi ulang via gems)
- [x] Sistem gems & poin (XP)
- [x] Klasemen (leaderboard top 10 by poin)
- [x] Toko (refill hearts)
- [x] Profil user + ganti bahasa + logout
- [x] Responsive (sidebar desktop, bottom nav mobile)

## Yang bisa dikembangkan lanjut

- Streak harian otomatis (cron/edge function untuk reset harian)
- Audio pronunciation (TTS) untuk tipe soal LISTEN
- Challenge tipe MATCH, TRANSLATE, FILL_BLANK (schema sudah siap, UI belum)
- Sistem league mingguan (tabel leagues/leagueMembers sudah ada di schema)
- Admin panel untuk kelola course/lesson/challenge
- OAuth (Google/GitHub) selain credentials
