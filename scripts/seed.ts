import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Bahasa Inggris", imageSrc: "/flags/gb.svg", languageCode: "en", color: "#0F7A72" },
      { id: 2, title: "Bahasa Spanyol", imageSrc: "/flags/es.svg", languageCode: "es", color: "#AA151B" },
      { id: 3, title: "Bahasa Prancis", imageSrc: "/flags/fr.svg", languageCode: "fr", color: "#002395" },
      { id: 4, title: "Bahasa Jepang", imageSrc: "/flags/jp.svg", languageCode: "ja", color: "#BC002D" },
      { id: 5, title: "Bahasa Jerman", imageSrc: "/flags/de.svg", languageCode: "de", color: "#FFCE00" },
      { id: 6, title: "Bahasa Korea", imageSrc: "/flags/kr.svg", languageCode: "ko", color: "#003478" },
    ]);

    // ---------- Unit 1: Basics ----------
    await db.insert(schema.units).values([
      { id: 1, courseId: 1, title: "Unit 1: Dasar", description: "Sapaan dan kata dasar", order: 1 },
      { id: 2, courseId: 1, title: "Unit 2: Keluarga", description: "Kenali anggota keluarga", order: 2 },
      { id: 3, courseId: 1, title: "Unit 3: Makanan", description: "Bicara tentang makanan", order: 3 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, title: "Sapaan", order: 1 },
      { id: 2, unitId: 1, title: "Kata ganti", order: 2 },
      { id: 3, unitId: 1, title: "Angka", order: 3 },
      { id: 4, unitId: 2, title: "Anggota keluarga", order: 1 },
      { id: 5, unitId: 2, title: "Kata sifat", order: 2 },
      { id: 6, unitId: 3, title: "Buah & sayur", order: 1 },
    ]);

    // ---------- Lesson 1 challenges: Sapaan ----------
    await db.insert(schema.challenges).values([
      { id: 1, lessonId: 1, type: "SELECT", question: 'Apa arti "Hello"?', order: 1 },
      { id: 2, lessonId: 1, type: "SELECT", question: 'Bagaimana cara mengatakan "Selamat pagi"?', order: 2 },
      { id: 3, lessonId: 1, type: "ASSIST", question: '"Terima kasih" dalam Bahasa Inggris', order: 3 },
      { id: 4, lessonId: 1, type: "SELECT", question: 'Apa arti "Goodbye"?', order: 4 },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Challenge 1
      { challengeId: 1, text: "Halo", correct: true },
      { challengeId: 1, text: "Selamat tinggal", correct: false },
      { challengeId: 1, text: "Terima kasih", correct: false },
      // Challenge 2
      { challengeId: 2, text: "Good morning", correct: true },
      { challengeId: 2, text: "Good night", correct: false },
      { challengeId: 2, text: "Good bye", correct: false },
      // Challenge 3
      { challengeId: 3, text: "Thank you", correct: true },
      { challengeId: 3, text: "Please", correct: false },
      { challengeId: 3, text: "Sorry", correct: false },
      // Challenge 4
      { challengeId: 4, text: "Selamat tinggal", correct: true },
      { challengeId: 4, text: "Halo", correct: false },
      { challengeId: 4, text: "Tolong", correct: false },
    ]);

    // ---------- Lesson 2 challenges: Kata ganti ----------
    await db.insert(schema.challenges).values([
      { id: 5, lessonId: 2, type: "SELECT", question: 'Apa arti "I"?', order: 1 },
      { id: 6, lessonId: 2, type: "SELECT", question: 'Apa arti "You"?', order: 2 },
      { id: 7, lessonId: 2, type: "SELECT", question: 'Apa arti "They"?', order: 3 },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 5, text: "Saya", correct: true },
      { challengeId: 5, text: "Kamu", correct: false },
      { challengeId: 5, text: "Mereka", correct: false },
      { challengeId: 6, text: "Kamu", correct: true },
      { challengeId: 6, text: "Kami", correct: false },
      { challengeId: 6, text: "Dia", correct: false },
      { challengeId: 7, text: "Mereka", correct: true },
      { challengeId: 7, text: "Kita", correct: false },
      { challengeId: 7, text: "Saya", correct: false },
    ]);

    // ---------- Lesson 3 challenges: Angka ----------
    await db.insert(schema.challenges).values([
      { id: 8, lessonId: 3, type: "SELECT", question: 'Apa arti "Three"?', order: 1 },
      { id: 9, lessonId: 3, type: "SELECT", question: 'Apa arti "Seven"?', order: 2 },
      { id: 10, lessonId: 3, type: "SELECT", question: 'Bagaimana cara mengatakan angka "10"?', order: 3 },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 8, text: "Tiga", correct: true },
      { challengeId: 8, text: "Delapan", correct: false },
      { challengeId: 8, text: "Lima", correct: false },
      { challengeId: 9, text: "Tujuh", correct: true },
      { challengeId: 9, text: "Enam", correct: false },
      { challengeId: 9, text: "Sembilan", correct: false },
      { challengeId: 10, text: "Ten", correct: true },
      { challengeId: 10, text: "Nine", correct: false },
      { challengeId: 10, text: "Eleven", correct: false },
    ]);

    // ---------- Lesson 4 challenges: Keluarga ----------
    await db.insert(schema.challenges).values([
      { id: 11, lessonId: 4, type: "SELECT", question: 'Apa arti "Mother"?', order: 1 },
      { id: 12, lessonId: 4, type: "SELECT", question: 'Apa arti "Father"?', order: 2 },
      { id: 13, lessonId: 4, type: "SELECT", question: 'Apa arti "Sister"?', order: 3 },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 11, text: "Ibu", correct: true },
      { challengeId: 11, text: "Ayah", correct: false },
      { challengeId: 11, text: "Adik", correct: false },
      { challengeId: 12, text: "Ayah", correct: true },
      { challengeId: 12, text: "Kakak", correct: false },
      { challengeId: 12, text: "Ibu", correct: false },
      { challengeId: 13, text: "Saudara perempuan", correct: true },
      { challengeId: 13, text: "Saudara laki-laki", correct: false },
      { challengeId: 13, text: "Bibi", correct: false },
    ]);

    // ---------- Lesson 5 challenges: Kata sifat ----------
    await db.insert(schema.challenges).values([
      { id: 14, lessonId: 5, type: "SELECT", question: 'Apa arti "Happy"?', order: 1 },
      { id: 15, lessonId: 5, type: "SELECT", question: 'Apa arti "Big"?', order: 2 },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 14, text: "Bahagia", correct: true },
      { challengeId: 14, text: "Sedih", correct: false },
      { challengeId: 14, text: "Marah", correct: false },
      { challengeId: 15, text: "Besar", correct: true },
      { challengeId: 15, text: "Kecil", correct: false },
      { challengeId: 15, text: "Sedang", correct: false },
    ]);

    // ---------- Lesson 6 challenges: Buah & sayur ----------
    await db.insert(schema.challenges).values([
      { id: 16, lessonId: 6, type: "SELECT", question: 'Apa arti "Apple"?', order: 1 },
      { id: 17, lessonId: 6, type: "SELECT", question: 'Apa arti "Carrot"?', order: 2 },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 16, text: "Apel", correct: true },
      { challengeId: 16, text: "Jeruk", correct: false },
      { challengeId: 16, text: "Pisang", correct: false },
      { challengeId: 17, text: "Wortel", correct: true },
      { challengeId: 17, text: "Kentang", correct: false },
      { challengeId: 17, text: "Bawang", correct: false },
    ]);

    console.log("Seeding selesai.");
  } catch (error) {
    console.error(error);
    throw new Error("Gagal seeding database.");
  }
};

main();
