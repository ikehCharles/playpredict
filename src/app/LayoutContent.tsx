"use client";

import { usePathname } from "next/navigation";
import { BottomNav, FloatingPredictButton, Sidebar } from "@common";

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
    <div className="flex min-h-screen">
      {!shouldHideNav && <Sidebar />}
      <div className="flex flex-col flex-1 min-w-0">
        <main className={!shouldHideNav ? "pb-20 md:pb-6" : ""}>
          {children}
        </main>
        {pathname === "/" && <FloatingPredictButton />}
        {!shouldHideNav && <BottomNav />}
      </div>
    </div>
  );
}
