"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home } from "@main";
import { SplashScreen } from "@common";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited");
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");

    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      if (!hasVisited || !onboardingCompleted) {
        // First time user - navigate to onboarding page
        localStorage.setItem("hasVisited", "true");
        router.push("/onboarding");
      } else {
        // Returning user - hide splash and show home
        setShowSplash(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      {!showSplash && <Home />}
    </>
  );
}
