import Image from "next/image";
import { redirect } from "next/navigation";
import { Crown, Gem } from "lucide-react";
import { auth } from "@/auth";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgressBar } from "@/components/layout/user-progress-bar";
import { RefillHeartsButton } from "@/components/shop/refill-hearts-button";
import { Button } from "@/components/ui/button";

export default async function ShopPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
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
      </StickyWrapper>

      <div className="flex-1 flex flex-col items-center gap-4 max-w-xl mx-auto">
        <div className="flex flex-col items-center gap-2 pb-4">
          <Image src="/mascot/compa.svg" alt="" width={90} height={90} />
          <h1 className="font-display text-2xl font-bold text-center">Toko</h1>
          <p className="text-ink/60 text-center">
            Tukar gems untuk terus jalan tanpa jeda.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <RefillHeartsButton hearts={userProgress.hearts} points={userProgress.gems} />

          <div className="rounded-2xl border-2 border-line bg-white p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Crown className="h-9 w-9 fill-sun text-sun-deep shrink-0" />
              <div>
                <p className="font-display font-bold">Trail+</p>
                <p className="text-ink/50 text-sm">
                  Hearts tanpa batas, selamanya belajar tanpa jeda
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              Segera hadir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
