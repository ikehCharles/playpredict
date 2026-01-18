"use client";

import { useState, useEffect } from "react";
import { Home } from "@/src/components/main";
import { SplashScreen } from "@/src/components/common";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      <Home />
    </>
  );
}
