import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserProgress } from "@/db/queries";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userProgress = await getUserProgress();
  if (!userProgress?.activeCourseId) redirect("/onboarding");

  return (
    <>
      <Sidebar />
      <main className="lg:pl-64 h-full pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4">{children}</div>
      </main>
      <MobileNav />
    </>
  );
}
