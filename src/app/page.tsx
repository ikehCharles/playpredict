"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Home } from "@main";
import { SplashScreen } from "@common";

type PageStatus = "pending" | "redirect" | "splash" | "home";

export default function HomePage() {
  const [status, setStatus] = useState<PageStatus>("pending");
  const router = useRouter();
  const splashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    const splashShown = localStorage.getItem("splashShown");

    if (!hasVisited || !onboardingCompleted) {
      localStorage.setItem("hasVisited", "true");
      router.push("/onboarding");
      return;
    }

    // Returning user: show splash only once
    if (splashShown === "true") {
      const id = setTimeout(() => setStatus("home"), 0);
      return () => clearTimeout(id);
    }

    const deferId = setTimeout(() => {
      setStatus("splash");
      splashTimerRef.current = setTimeout(() => {
        localStorage.setItem("splashShown", "true");
        setStatus("home");
      }, 2000);
    }, 0);

    return () => {
      clearTimeout(deferId);
      if (splashTimerRef.current) clearTimeout(splashTimerRef.current);
    };
  }, [router]);

  if (status === "pending" || status === "redirect") {
    return null;
  }

  return (
    <>
      <SplashScreen isVisible={status === "splash"} />
      {status === "home" && <Home />}
    </>
  );
}
