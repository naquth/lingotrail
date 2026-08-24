import { redirect } from "next/navigation";
import Image from "next/image";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgressBar } from "@/components/layout/user-progress-bar";
import { PromoCard } from "@/components/layout/promo-card";
import { UnitBanner } from "@/components/course/unit-banner";
import { LessonButton } from "@/components/course/lesson-button";

export default async function LearnPage() {
  const [userProgress, units, courseProgress, lessonPercentage, userSubscription] =
    await Promise.all([
      getUserProgress(),
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
      getUserSubscription(),
    ]);

  if (!userProgress?.activeCourse) redirect("/onboarding");

  return (
    <div className="flex flex-row-reverse gap-6 py-6">
      <StickyWrapper>
        <UserProgressBar
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          gems={userProgress.gems}
          streak={userProgress.streak}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        <PromoCard />
      </StickyWrapper>

      <div className="flex-1 flex flex-col items-center gap-4 max-w-xl mx-auto">
        <div className="lg:hidden w-full mb-2">
          <UserProgressBar
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            gems={userProgress.gems}
            streak={userProgress.streak}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>

        {units.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <Image src="/mascot/compa.svg" alt="" width={140} height={140} />
            <h2 className="font-display text-xl font-bold">
              Jalur belum tersedia
            </h2>
            <p className="text-ink/60 max-w-sm">
              Kursus ini belum punya materi. Coba lagi nanti atau pilih bahasa
              lain di halaman kursus.
            </p>
          </div>
        )}

        {units.map((unit) => (
          <div key={unit.id} className="w-full flex flex-col items-center gap-8">
            <UnitBanner title={unit.title} description={unit.description} />

            <div className="flex flex-col items-center gap-4 relative">
              {unit.lessons.map((lesson, index) => {
                const isCurrent =
                  lesson.id === courseProgress?.activeLessonId;
                const isLocked = !lesson.completed && !isCurrent;

                return (
                  <LessonButton
                    key={lesson.id}
                    id={lesson.id}
                    index={index}
                    totalCount={unit.lessons.length - 1}
                    current={isCurrent}
                    locked={isLocked}
                    completed={lesson.completed}
                    percentage={isCurrent ? lessonPercentage : 0}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
