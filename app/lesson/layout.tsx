import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function LessonLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <div className="flex flex-col min-h-full">{children}</div>;
}
