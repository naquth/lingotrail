import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCourses, getUserProgress } from "@/db/queries";
import { CourseList } from "@/components/course/course-card";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [courses, userProgress] = await Promise.all([
    getCourses(),
    getUserProgress(),
  ]);

  if (userProgress?.activeCourseId) redirect("/learn");

  return (
    <div className="min-h-full flex flex-col items-center px-6 py-12 gap-8 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-center">
        Bahasa apa yang mau kamu pelajari?
      </h1>
      <p className="text-ink/60 text-center -mt-4">
        Kamu bisa ganti kapan saja lewat halaman profil.
      </p>
      <CourseList courses={courses} activeCourseId={userProgress?.activeCourseId ?? undefined} />
    </div>
  );
}
