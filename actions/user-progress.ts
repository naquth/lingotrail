"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { courses, userProgress } from "@/db/schema";
import { getUserProgress, getUserSubscription } from "@/db/queries";

const POINTS_TO_REFILL = 10;

export const upsertUserProgress = async (courseId: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  const userName = session?.user?.name;
  const userImageSrc = session?.user?.image;

  if (!userId) throw new Error("Unauthorized.");

  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  if (!course) throw new Error("Kursus tidak ditemukan.");

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    hearts: 5,
    points: 0,
    gems: 500,
    streak: 0,
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!currentUserProgress) throw new Error("Progres user tidak ditemukan.");

  if (userSubscription?.isActive) return { error: "subscription" };

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/lesson");
  revalidatePath("/learn");
  revalidatePath("/quests");

  return { error: null };
};

export const refillHearts = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("Progres user tidak ditemukan.");

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts sudah penuh.");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Poin tidak cukup.");
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
};
