import Image from "next/image";
import { redirect } from "next/navigation";
import { Trophy } from "lucide-react";
import { auth } from "@/auth";
import {
  getTopUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgressBar } from "@/components/layout/user-progress-bar";
import { PromoCard } from "@/components/layout/promo-card";

export default async function LeaderboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [userProgress, topUsers, userSubscription] = await Promise.all([
    getUserProgress(),
    getTopUsers(),
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
        <div className="flex flex-col items-center gap-2 pb-4">
          <Image src="/mascot/compa.svg" alt="" width={90} height={90} />
          <h1 className="font-display text-2xl font-bold text-center">
            Klasemen
          </h1>
          <p className="text-ink/60 text-center">
            Lihat posisimu di antara pembelajar lain minggu ini.
          </p>
        </div>

        <div className="w-full rounded-2xl border-2 border-line bg-white divide-y-2 divide-line">
          {topUsers.length === 0 && (
            <p className="p-6 text-center text-ink/50 text-sm">
              Belum ada data klasemen.
            </p>
          )}
          {topUsers.map((item, index) => (
            <div
              key={item.userId}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <p className="font-bold text-ink/40 w-6 text-center">{index + 1}</p>
              <Image
                src={item.user.imageSrc}
                alt={item.user.name}
                width={36}
                height={36}
                className="rounded-full border border-line"
              />
              <p className="flex-1 font-semibold text-ink truncate">
                {item.user.name}
              </p>
              <div className="flex items-center gap-1.5 text-trail font-bold text-sm">
                <Trophy className="h-4 w-4" />
                {item.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
