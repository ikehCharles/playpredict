"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Auth } from "@main";

/**
 * Authentication page for email verification flow
 *
 * Navigate to: /account/auth?from=onboarding
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

  const fromOnboarding = searchParams.get("from") === "onboarding";

  const handleSuccess = () => {
    // Mark onboarding as completed if coming from onboarding
    if (fromOnboarding) {
      localStorage.setItem("onboardingCompleted", "true");
    }

    // Navigate to home page
    router.push("/");
  };

  const handleClose = () => {
    // Navigate back to onboarding or home
    if (fromOnboarding) {
      router.push("/onboarding");
    } else {
      router.back();
    }
  };

  return (
    <div className="pt-5 bg-secondary h-screen flex items-center justify-center py-2 px-2">
      <Auth onClose={handleClose} onSuccess={handleSuccess} />
    </div>
  );
}
