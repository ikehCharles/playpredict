"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Auth } from "@main";
import { AuthBottomSheet } from "@common";

/**
 * Authentication page for Sign In and Sign Up
 *
 * Navigate to: /account/auth?tab=signin or /account/auth?tab=signup
 */
export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageContent />
    </Suspense>
  );
}

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab =
    (searchParams.get("tab") as "signin" | "signup" | null) ?? "signin";
  const fromOnboarding = searchParams.get("from") === "onboarding";

  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleSuccess = () => {
    // Mark onboarding as completed if coming from onboarding
    if (fromOnboarding) {
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
    if (fromOnboarding) {
      localStorage.setItem("onboardingCompleted", "true");
    }
    // Navigate to home page
    router.push("/");
  };

  return (
    <>
      <div className="pt-5 bg-background flex items-center justify-center py-2 px-2">
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
