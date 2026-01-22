"use client";

import { usePathname } from "next/navigation";
import { Header, BottomNav } from "@common";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";

  return (
    <div className="min-h-screen bg-background">
      {!isOnboarding && <Header />}
      <main className={!isOnboarding ? "pb-20 md:pb-6" : ""}>
        {children}
      </main>
      {!isOnboarding && <BottomNav />}
    </div>
  );
}
