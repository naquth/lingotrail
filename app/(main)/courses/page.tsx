import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCourses, getUserProgress } from "@/db/queries";
import { CourseList } from "@/components/course/course-card";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgressBar } from "@/components/layout/user-progress-bar";
import { getUserSubscription } from "@/db/queries";

export default async function CoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [courses, userProgress, userSubscription] = await Promise.all([
    getCourses(),
    getUserProgress(),
    getUserSubscription(),
  ]);

  return (
    <div className="flex flex-row-reverse gap-6 py-6">
      {userProgress?.activeCourse && (
        <StickyWrapper>
          <UserProgressBar
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            gems={userProgress.gems}
            streak={userProgress.streak}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </StickyWrapper>
      )}

      <div className="flex-1 flex flex-col gap-6 max-w-2xl mx-auto">
        <h1 className="font-display text-2xl font-bold text-center pt-2">
          Pilih bahasa
        </h1>
        <CourseList
          courses={courses}
          activeCourseId={userProgress?.activeCourseId ?? undefined}
        />
      </div>
    </div>
  );
}
