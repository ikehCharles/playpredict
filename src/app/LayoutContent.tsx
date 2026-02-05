"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@common";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";
  const isAuthPage = pathname === "/account/auth";
  const shouldHideNav = isOnboarding || isAuthPage;



  return (
    <div>
      <main className={!shouldHideNav ? "pb-20 md:pb-6" : ""}>
        {children}
      </main>
      {!shouldHideNav && <BottomNav />}
    </div>
  );
}
