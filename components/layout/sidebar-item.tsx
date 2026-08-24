"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const SidebarItem = ({ label, href, icon }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-ink/70 hover:bg-mist transition-colors",
          active && "bg-mist text-trail-deep"
        )}
      >
        {icon}
        {label}
      </div>
    </Link>
  );
};
