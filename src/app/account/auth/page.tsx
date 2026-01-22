"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Auth } from "@main";
import { AuthBottomSheet } from "@common";

/**
 * Authentication page for Sign In and Sign Up
 * 
 * Navigate to: /account/auth?tab=signin or /account/auth?tab=signup
 */
export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as "signin" | "signup" || "signin";
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleSuccess = () => {
    // Mark onboarding as completed if coming from onboarding
    const from = searchParams.get("from");
    if (from === "onboarding") {
      localStorage.setItem("onboardingCompleted", "true");
    }
    
    // Navigate to home page
    router.push("/");
  };

  const handleClose = () => {
    // Show AuthBottomSheet instead of navigating away
    setShowAuthOptions(true);
  };

  const handleCloseAuthOptions = () => {
    setShowAuthOptions(false);
  };

  const handleAuthAction = () => {
    // Mark onboarding as completed when user selects any auth method
    const from = searchParams.get("from");
    if (from === "onboarding") {
      localStorage.setItem("onboardingCompleted", "true");
    }
    // Navigate to home page
    router.push("/");
  };

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center py-2 px-2">
        <Auth
          defaultTab={tab}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      </div>

      {/* Auth Options Bottom Sheet */}
      <AuthBottomSheet
        isOpen={showAuthOptions}
        onClose={handleCloseAuthOptions}
        onAuthAction={handleAuthAction}
      />
    </>
  );
}
