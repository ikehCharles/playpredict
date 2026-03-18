"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@constants";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-200 dark:border-gray-800 z-50 safe-area-bottom">
      <div className="flex  justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-primary border-t-2 border-primary"
                  : "text-tertiary hover:text-tertiary"
              }`}
            >
              <i className={`text-lg ${isActive ? item.activeIcon : item.icon}`}></i>
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
