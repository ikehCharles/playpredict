"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@constants";
import { Icon } from "../utilities";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary shadow-sm shadow-secondary z-50 safe-area-bottom" style={{boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)"}}>
      <div className="flex  justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 justify-center transition-colors ${
                isActive
                  ? "text-primary border-t-2 border-primary"
                  : "text-tertiary hover:text-tertiary"
              }`}
            >
              <Icon className={`text-lg  ${isActive ? item.activeIcon : `${item.icon} opacity-75`}`}></Icon>
              <span
                className={`text-xs font-medium`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
