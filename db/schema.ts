import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  varchar,
  primaryKey,
  pgEnum,
  date,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------- ENUMS ----------
export const challengeTypeEnum = pgEnum("challenge_type", [
  "SELECT",
  "ASSIST",
  "MATCH",
  "TRANSLATE",
  "LISTEN",
  "FILL_BLANK",
]);

export const skillTypeEnum = pgEnum("skill_type", [
  "PERSONAL",
  "FREEMIUM",
]);

// ---------- USERS ----------
export const users = pgTable("users", {
  id: text("id").primaryKey(), // uuid string
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: text("hashed_password"),
  imageSrc: text("image_src").default("/mascot/avatar-1.svg").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  userProgress: one(userProgress),
  challengeProgress: many(challengeProgress),
}));

// ---------- LANGUAGE COURSES ----------
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  imageSrc: text("image_src").notNull(),
  languageCode: varchar("language_code", { length: 10 }).notNull(), // en, es, fr, ja...
  color: varchar("color", { length: 20 }).notNull().default("#58CC02"),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

// ---------- UNITS (group of lessons, e.g. "Basics 1") ----------
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, { fields: [units.courseId], references: [courses.id] }),
  lessons: many(lessons),
}));

// ---------- LESSONS ----------
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ many, one }) => ({
  unit: one(units, { fields: [lessons.unitId], references: [units.id] }),
  challenges: many(challenges),
}));

// ---------- CHALLENGES (individual questions) ----------
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  type: challengeTypeEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
  audioSrc: text("audio_src"),
});

export const challengesRelations = relations(challenges, ({ many, one }) => ({
  lesson: one(lessons, { fields: [challenges.lessonId], references: [lessons.id] }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

// ---------- CHALLENGE OPTIONS ----------
export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}));

// ---------- CHALLENGE PROGRESS (per user, per challenge) ----------
export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
  user: one(users, { fields: [challengeProgress.userId], references: [users.id] }),
}));

// ---------- USER PROGRESS (global per-user state) ----------
export const userProgress = pgTable("user_progress", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
  gems: integer("gems").notNull().default(500),
  streak: integer("streak").notNull().default(0),
  lastActivityDate: date("last_activity_date"),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
  user: one(users, { fields: [userProgress.userId], references: [users.id] }),
}));

// ---------- SHOP / STORE ITEMS ----------
export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  isActive: boolean("is_active").notNull().default(false),
});

// ---------- LEADERBOARD SNAPSHOT (weekly league) ----------
export const leagues = pgTable("leagues", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(), // Bronze, Silver, Gold, Sapphire, Diamond...
  tier: integer("tier").notNull(),
});

export const leagueMembers = pgTable(
  "league_members",
  {
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    leagueId: integer("league_id").references(() => leagues.id).notNull(),
    weeklyXp: integer("weekly_xp").notNull().default(0),
    weekStart: date("week_start").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.weekStart] }),
  })
);
