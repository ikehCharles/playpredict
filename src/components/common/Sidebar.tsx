"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "antd";
import { navItems, currentUserProfile } from "@constants";
import { Icon } from "../utilities";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-35 shrink-0 sticky top-0 h-screen bg-secondary border-r border-tertiary/10 z-40">
      {/* Logo */}
      <div className="flex items-center justify-center py-5 border-b border-tertiary/10 px-3">
        <Link href="/">
          <Image
            src="/icons/PlayPredictLogoBlue.svg"
            alt="PlayPredict"
            width={106}
            height={36}
            priority
          />
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-5 py-4 flex-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 w-full py-3 px-2 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary text-secondary"
                  : "text-tertiary/75 hover:bg-primary/5 hover:text-tertiary"
              }`}
            >
              <Icon className={` text-lg ${isActive ? `${item.activeIcon} text-secondary` : `${item.icon} text-tertiary/75`}`}></Icon>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Current user */}
      <div className="border-t border-tertiary/10 px-2 py-4">
        <Link
          href="/profile"
          className="flex flex-col items-center gap-1.5 w-full rounded-xl py-2 px-1 hover:bg-primary/5 transition-colors"
        >
          <Avatar size={38} src={currentUserProfile.avatar} />
          <span className="text-xs font-medium text-tertiary truncate max-w-full text-center leading-tight">
            {currentUserProfile.displayName}
          </span>
        </Link>
      </div>
    </aside>
  );
}
