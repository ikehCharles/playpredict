"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@constants";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-tertiary"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "scale-110" : ""}`} />
              <span
                className={`text-xs font-medium ${
                  isActive ? "border-b-2 border-primary pb-0.5" : ""
                }`}
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
