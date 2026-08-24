import Image from "next/image";
import Link from "next/link";
import { Flame, Gem, Heart } from "lucide-react";

type Props = {
  activeCourse: { title: string; imageSrc: string };
  hearts: number;
  points: number;
  gems: number;
  streak: number;
  hasActiveSubscription: boolean;
};

export const UserProgressBar = ({
  activeCourse,
  hearts,
  gems,
  streak,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Image
          src={activeCourse.imageSrc}
          alt={activeCourse.title}
          className="rounded-md border"
          width={32}
          height={32}
        />
      </Link>

      <Link href="/quests" className="flex items-center gap-1.5 text-sun-deep font-bold">
        <Flame className="h-5 w-5 fill-sun text-sun-deep" />
        {streak}
      </Link>

      <Link href="/shop" className="flex items-center gap-1.5 text-trail font-bold">
        <Gem className="h-5 w-5 fill-trail-light text-trail" />
        {gems}
      </Link>

      <Link href="/shop" className="flex items-center gap-1.5 text-coral-deep font-bold">
        <Heart className="h-5 w-5 fill-coral text-coral-deep" />
        {hasActiveSubscription ? "\u221e" : hearts}
      </Link>
    </div>
  );
};
