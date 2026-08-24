-- ============================================================
-- LingoTrail — Database Schema
-- Copy-paste seluruh isi file ini ke Neon SQL Editor lalu Run.
-- ============================================================

-- --- ENUMS ---
CREATE TYPE "challenge_type" AS ENUM ('SELECT', 'ASSIST', 'MATCH', 'TRANSLATE', 'LISTEN', 'FILL_BLANK');
CREATE TYPE "skill_type" AS ENUM ('PERSONAL', 'FREEMIUM');

-- --- USERS ---
CREATE TABLE "users" (
  "id" text PRIMARY KEY NOT NULL,
  "name" varchar(100) NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "hashed_password" text,
  "image_src" text NOT NULL DEFAULT '/mascot/avatar-1.svg',
  "created_at" timestamp NOT NULL DEFAULT now()
);

-- --- COURSES ---
CREATE TABLE "courses" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(100) NOT NULL,
  "image_src" text NOT NULL,
  "language_code" varchar(10) NOT NULL,
  "color" varchar(20) NOT NULL DEFAULT '#0F7A72'
);

-- --- UNITS ---
CREATE TABLE "units" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(100) NOT NULL,
  "description" text NOT NULL,
  "course_id" integer NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
  "order" integer NOT NULL
);

-- --- LESSONS ---
CREATE TABLE "lessons" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(100) NOT NULL,
  "unit_id" integer NOT NULL REFERENCES "units"("id") ON DELETE CASCADE,
  "order" integer NOT NULL
);

-- --- CHALLENGES ---
CREATE TABLE "challenges" (
  "id" serial PRIMARY KEY NOT NULL,
  "lesson_id" integer NOT NULL REFERENCES "lessons"("id") ON DELETE CASCADE,
  "type" "challenge_type" NOT NULL,
  "question" text NOT NULL,
  "order" integer NOT NULL,
  "audio_src" text
);

-- --- CHALLENGE OPTIONS ---
CREATE TABLE "challenge_options" (
  "id" serial PRIMARY KEY NOT NULL,
  "challenge_id" integer NOT NULL REFERENCES "challenges"("id") ON DELETE CASCADE,
  "text" text NOT NULL,
  "correct" boolean NOT NULL,
  "image_src" text,
  "audio_src" text
);

-- --- CHALLENGE PROGRESS (per user) ---
CREATE TABLE "challenge_progress" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "challenge_id" integer NOT NULL REFERENCES "challenges"("id") ON DELETE CASCADE,
  "completed" boolean NOT NULL DEFAULT false
);

-- --- USER PROGRESS (state global per user) ---
CREATE TABLE "user_progress" (
  "user_id" text PRIMARY KEY NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "active_course_id" integer REFERENCES "courses"("id") ON DELETE CASCADE,
  "hearts" integer NOT NULL DEFAULT 5,
  "points" integer NOT NULL DEFAULT 0,
  "gems" integer NOT NULL DEFAULT 500,
  "streak" integer NOT NULL DEFAULT 0,
  "last_activity_date" date
);

-- --- USER SUBSCRIPTION ---
CREATE TABLE "user_subscription" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
  "is_active" boolean NOT NULL DEFAULT false
);

-- --- LEAGUES (leaderboard mingguan) ---
CREATE TABLE "leagues" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(50) NOT NULL,
  "tier" integer NOT NULL
);

CREATE TABLE "league_members" (
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "league_id" integer NOT NULL REFERENCES "leagues"("id"),
  "weekly_xp" integer NOT NULL DEFAULT 0,
  "week_start" date NOT NULL,
  PRIMARY KEY ("user_id", "week_start")
);

-- ============================================================
-- SEED DATA — jalankan setelah tabel di atas berhasil dibuat
-- ============================================================

-- --- 6 bahasa (courses) ---
INSERT INTO "courses" ("id", "title", "image_src", "language_code", "color") VALUES
  (1, 'Bahasa Inggris', '/flags/gb.svg', 'en', '#0F7A72'),
  (2, 'Bahasa Spanyol', '/flags/es.svg', 'es', '#AA151B'),
  (3, 'Bahasa Prancis', '/flags/fr.svg', 'fr', '#002395'),
  (4, 'Bahasa Jepang', '/flags/jp.svg', 'ja', '#BC002D'),
  (5, 'Bahasa Jerman', '/flags/de.svg', 'de', '#FFCE00'),
  (6, 'Bahasa Korea', '/flags/kr.svg', 'ko', '#003478');
SELECT setval(pg_get_serial_sequence('"courses"', 'id'), (SELECT MAX(id) FROM "courses"));

-- --- Unit untuk kursus Bahasa Inggris (course_id = 1) ---
INSERT INTO "units" ("id", "course_id", "title", "description", "order") VALUES
  (1, 1, 'Unit 1: Dasar', 'Sapaan dan kata dasar', 1),
  (2, 1, 'Unit 2: Keluarga', 'Kenali anggota keluarga', 2),
  (3, 1, 'Unit 3: Makanan', 'Bicara tentang makanan', 3);
SELECT setval(pg_get_serial_sequence('"units"', 'id'), (SELECT MAX(id) FROM "units"));

-- --- Lessons ---
INSERT INTO "lessons" ("id", "unit_id", "title", "order") VALUES
  (1, 1, 'Sapaan', 1),
  (2, 1, 'Kata ganti', 2),
  (3, 1, 'Angka', 3),
  (4, 2, 'Anggota keluarga', 1),
  (5, 2, 'Kata sifat', 2),
  (6, 3, 'Buah & sayur', 1);
SELECT setval(pg_get_serial_sequence('"lessons"', 'id'), (SELECT MAX(id) FROM "lessons"));

-- --- Challenges: Lesson 1 (Sapaan) ---
INSERT INTO "challenges" ("id", "lesson_id", "type", "question", "order") VALUES
  (1, 1, 'SELECT', 'Apa arti "Hello"?', 1),
  (2, 1, 'SELECT', 'Bagaimana cara mengatakan "Selamat pagi"?', 2),
  (3, 1, 'ASSIST', '"Terima kasih" dalam Bahasa Inggris', 3),
  (4, 1, 'SELECT', 'Apa arti "Goodbye"?', 4);

INSERT INTO "challenge_options" ("challenge_id", "text", "correct") VALUES
  (1, 'Halo', true), (1, 'Selamat tinggal', false), (1, 'Terima kasih', false),
  (2, 'Good morning', true), (2, 'Good night', false), (2, 'Good bye', false),
  (3, 'Thank you', true), (3, 'Please', false), (3, 'Sorry', false),
  (4, 'Selamat tinggal', true), (4, 'Halo', false), (4, 'Tolong', false);

-- --- Challenges: Lesson 2 (Kata ganti) ---
INSERT INTO "challenges" ("id", "lesson_id", "type", "question", "order") VALUES
  (5, 2, 'SELECT', 'Apa arti "I"?', 1),
  (6, 2, 'SELECT', 'Apa arti "You"?', 2),
  (7, 2, 'SELECT', 'Apa arti "They"?', 3);

INSERT INTO "challenge_options" ("challenge_id", "text", "correct") VALUES
  (5, 'Saya', true), (5, 'Kamu', false), (5, 'Mereka', false),
  (6, 'Kamu', true), (6, 'Kami', false), (6, 'Dia', false),
  (7, 'Mereka', true), (7, 'Kita', false), (7, 'Saya', false);

-- --- Challenges: Lesson 3 (Angka) ---
INSERT INTO "challenges" ("id", "lesson_id", "type", "question", "order") VALUES
  (8, 3, 'SELECT', 'Apa arti "Three"?', 1),
  (9, 3, 'SELECT', 'Apa arti "Seven"?', 2),
  (10, 3, 'SELECT', 'Bagaimana cara mengatakan angka "10"?', 3);

INSERT INTO "challenge_options" ("challenge_id", "text", "correct") VALUES
  (8, 'Tiga', true), (8, 'Delapan', false), (8, 'Lima', false),
  (9, 'Tujuh', true), (9, 'Enam', false), (9, 'Sembilan', false),
  (10, 'Ten', true), (10, 'Nine', false), (10, 'Eleven', false);

-- --- Challenges: Lesson 4 (Anggota keluarga) ---
INSERT INTO "challenges" ("id", "lesson_id", "type", "question", "order") VALUES
  (11, 4, 'SELECT', 'Apa arti "Mother"?', 1),
  (12, 4, 'SELECT', 'Apa arti "Father"?', 2),
  (13, 4, 'SELECT', 'Apa arti "Sister"?', 3);

INSERT INTO "challenge_options" ("challenge_id", "text", "correct") VALUES
  (11, 'Ibu', true), (11, 'Ayah', false), (11, 'Adik', false),
  (12, 'Ayah', true), (12, 'Kakak', false), (12, 'Ibu', false),
  (13, 'Saudara perempuan', true), (13, 'Saudara laki-laki', false), (13, 'Bibi', false);

-- --- Challenges: Lesson 5 (Kata sifat) ---
INSERT INTO "challenges" ("id", "lesson_id", "type", "question", "order") VALUES
  (14, 5, 'SELECT', 'Apa arti "Happy"?', 1),
  (15, 5, 'SELECT', 'Apa arti "Big"?', 2);

INSERT INTO "challenge_options" ("challenge_id", "text", "correct") VALUES
  (14, 'Bahagia', true), (14, 'Sedih', false), (14, 'Marah', false),
  (15, 'Besar', true), (15, 'Kecil', false), (15, 'Sedang', false);

-- --- Challenges: Lesson 6 (Buah & sayur) ---
INSERT INTO "challenges" ("id", "lesson_id", "type", "question", "order") VALUES
  (16, 6, 'SELECT', 'Apa arti "Apple"?', 1),
  (17, 6, 'SELECT', 'Apa arti "Carrot"?', 2);

INSERT INTO "challenge_options" ("challenge_id", "text", "correct") VALUES
  (16, 'Apel', true), (16, 'Jeruk', false), (16, 'Pisang', false),
  (17, 'Wortel', true), (17, 'Kentang', false), (17, 'Bawang', false);

SELECT setval(pg_get_serial_sequence('"challenges"', 'id'), (SELECT MAX(id) FROM "challenges"));
SELECT setval(pg_get_serial_sequence('"challenge_options"', 'id'), (SELECT MAX(id) FROM "challenge_options"));

-- --- Leagues (opsional, untuk fitur liga mingguan) ---
INSERT INTO "leagues" ("name", "tier") VALUES
  ('Bronze', 1), ('Silver', 2), ('Gold', 3), ('Sapphire', 4), ('Diamond', 5);

-- ============================================================
-- Selesai. Lanjut ke README.md untuk langkah deploy ke Vercel.
-- ============================================================
