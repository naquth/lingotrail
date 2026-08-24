import { redirect } from "next/navigation";
import {
  getLesson,
  getLessonPercentage,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { Quiz } from "@/components/lesson/quiz";

export default async function LessonPage() {
  const [lesson, userProgress, lessonPercentage, userSubscription] =
    await Promise.all([
      getLesson(),
      getUserProgress(),
      getLessonPercentage(),
      getUserSubscription(),
    ]);

  if (!lesson || !userProgress) redirect("/learn");

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialHearts={userProgress.hearts}
      initialPercentage={lessonPercentage}
      challenges={lesson.challenges}
      hasActiveSubscription={!!userSubscription?.isActive}
    />
  );
}
