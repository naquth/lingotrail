import Image from "next/image";
import { redirect } from "next/navigation";
import { Flame, Gem, Heart, LogOut } from "lucide-react";
import { auth } from "@/auth";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgressBar } from "@/components/layout/user-progress-bar";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
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

      <div className="flex-1 flex flex-col items-center gap-6 max-w-xl mx-auto">
        <div className="flex flex-col items-center gap-3 pb-2">
          <Image
            src={session.user.image || "/mascot/avatar-1.svg"}
            alt={session.user.name || "Profil"}
            width={96}
            height={96}
            className="rounded-full border-2 border-line"
          />
          <h1 className="font-display text-2xl font-bold text-center">
            {session.user.name}
          </h1>
          <p className="text-ink/50 text-sm">{session.user.email}</p>
        </div>

        <div className="w-full grid grid-cols-3 gap-3">
          <div className="rounded-2xl border-2 border-line bg-white p-4 flex flex-col items-center gap-1">
            <Flame className="h-6 w-6 fill-sun text-sun-deep" />
            <p className="font-bold">{userProgress.streak}</p>
            <p className="text-xs text-ink/50">streak</p>
          </div>
          <div className="rounded-2xl border-2 border-line bg-white p-4 flex flex-col items-center gap-1">
            <Gem className="h-6 w-6 fill-trail-light text-trail" />
            <p className="font-bold">{userProgress.gems}</p>
            <p className="text-xs text-ink/50">gems</p>
          </div>
          <div className="rounded-2xl border-2 border-line bg-white p-4 flex flex-col items-center gap-1">
            <Heart className="h-6 w-6 fill-coral text-coral-deep" />
            <p className="font-bold">{userProgress.hearts}</p>
            <p className="text-xs text-ink/50">hearts</p>
          </div>
        </div>

        <div className="w-full rounded-2xl border-2 border-line bg-white p-5 flex items-center justify-between">
          <div>
            <p className="font-display font-bold">Bahasa aktif</p>
            <p className="text-ink/50 text-sm">{userProgress.activeCourse.title}</p>
          </div>
          <a href="/courses">
            <Button variant="outline" size="sm">
              Ganti
            </Button>
          </a>
        </div>

        <form action={logoutAction} className="w-full">
          <Button type="submit" variant="danger" full size="lg" className="normal-case">
            <LogOut className="h-4 w-4 mr-1" />
            Keluar
          </Button>
        </form>
      </div>
    </div>
  );
}
