"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Trophy, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/learn", label: "Belajar", icon: Map },
  { href: "/leaderboard", label: "Klasemen", icon: Trophy },
  { href: "/shop", label: "Toko", icon: ShoppingBag },
  { href: "/profile", label: "Profil", icon: User },
];

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t-2 border-line flex items-center justify-around z-40">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 text-xs font-semibold text-ink/50",
              active && "text-trail-deep"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
