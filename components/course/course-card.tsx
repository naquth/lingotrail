"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { upsertUserProgress } from "@/actions/user-progress";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const CourseCard = ({
  id,
  title,
  imageSrc,
  onClick,
  disabled,
  active,
}: Props) => {
  return (
    <button
      onClick={() => onClick(id)}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border-2 border-line bg-white p-5 hover:bg-mist transition-colors cursor-pointer active:scale-95 min-h-40 min-w-40 disabled:opacity-50 disabled:cursor-not-allowed",
        active && "border-trail bg-mist"
      )}
    >
      <div className="min-h-9 w-full flex items-center justify-end">
        {active && (
          <div className="rounded-full bg-trail flex items-center justify-center p-1.5">
            <Check className="text-white h-4 w-4" strokeWidth={4} />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={48}
        width={48}
        className="rounded-md drop-shadow-md"
      />
      <p className="text-ink text-center font-semibold mt-1">{title}</p>
    </button>
  );
};

export const CourseList = ({
  courses,
  activeCourseId,
}: {
  courses: { id: number; title: string; imageSrc: string }[];
  activeCourseId?: number;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;
    if (id === activeCourseId) return router.push("/learn");

    startTransition(() => {
      upsertUserProgress(id).catch(() => {});
    });
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
