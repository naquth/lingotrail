import { redirect } from "next/navigation";
import {
  getLesson,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { Quiz } from "@/components/lesson/quiz";

type Props = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonIdPage({ params }: Props) {
  const { lessonId } = await params;
  const id = Number(lessonId);

  const [lesson, userProgress, userSubscription] = await Promise.all([
    getLesson(id),
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!lesson || !userProgress) redirect("/learn");

  const completedChallenges = lesson.challenges.filter((c) => c.completed).length;
  const percentage = Math.round(
    (completedChallenges / lesson.challenges.length) * 100
  );

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialHearts={userProgress.hearts}
      initialPercentage={percentage}
      challenges={lesson.challenges}
      hasActiveSubscription={!!userSubscription?.isActive}
    />
  );
}
