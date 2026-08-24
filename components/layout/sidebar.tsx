import Image from "next/image";
import Link from "next/link";
import { Map, Trophy, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "hidden lg:flex flex-col h-full lg:w-64 lg:fixed left-0 top-0 px-4 border-r-2 border-line bg-paper",
        className
      )}
    >
      <Link href="/learn" className="flex items-center gap-2 pt-8 pl-4 pb-6">
        <Image src="/mascot/compa.svg" alt="" width={40} height={40} />
        <span className="font-display font-bold text-xl text-trail-deep">
          LingoTrail
        </span>
      </Link>

      <div className="flex flex-col gap-1 flex-1">
        <SidebarItem label="Belajar" href="/learn" icon={<Map className="h-5 w-5" />} />
        <SidebarItem
          label="Klasemen"
          href="/leaderboard"
          icon={<Trophy className="h-5 w-5" />}
        />
        <SidebarItem
          label="Toko"
          href="/shop"
          icon={<ShoppingBag className="h-5 w-5" />}
        />
        <SidebarItem label="Profil" href="/profile" icon={<User className="h-5 w-5" />} />
      </div>
    </div>
  );
};
