"use client";

import { usePathname } from "next/navigation";
import { BottomNav, FloatingPredictButton, Sidebar } from "@common";
import { Suspense, useSyncExternalStore } from "react";
import { Predict, Home } from "../components/main";

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );
}

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const isOnboarding = pathname === "/onboarding";
  const isAuthPage = pathname === "/account/auth";
  const shouldHideNav = isOnboarding || isAuthPage;
  const isPredictPage = pathname === "/predict";
  const showDrawer = isPredictPage && isDesktop;

  return (
    <div className="flex min-h-screen">
      {!shouldHideNav && <Sidebar />}
      <div className="flex flex-col flex-1 min-w-0">
        <main className={!shouldHideNav ? "pb-20 md:pb-6" : ""}>
          {showDrawer ? <Home /> : children}
        </main>
        {pathname === "/" && <FloatingPredictButton />}
        {!shouldHideNav && <BottomNav />}
      </div>

      {showDrawer && (
        <Suspense>
          <Predict drawerMode />
        </Suspense>
      )}
    </div>
  );
}
