"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "./OnboardingLayout";
import { AuthBottomSheet } from "@common";
import { onboardingScreensData } from "@constants";

/**
 * Complete onboarding flow component
 * Users can either progress through steps or continue without signing up
 */
const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();


  const isLastStep = currentStep === onboardingScreensData.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      // Move to next screen
      setCurrentStep(currentStep + 1);
    } else {
      // Last screen - navigate to signup/account creation
      handleCreateAccount();
    }
  };

  const handleDotClick = (index: number) => {
    // Allow navigation to any screen by clicking dots
    setCurrentStep(index);
  };

  const handleContinueWithoutSignup = () => {
    // Mark onboarding as completed without signup
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("signupSkipped", "true");
    // Navigate to home page
    router.push("/");
    router.refresh(); // Refresh to trigger state update
  };

  const handleCreateAccount = () => {
    // Show authentication modal
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthAction = () => {
    // Mark onboarding as completed when user chooses an auth method
    localStorage.setItem("onboardingCompleted", "true");
    // Navigate to home page (auth flow will handle the actual signup/login)
    router.push("/");
    router.refresh();
  };

  const currentScreen = onboardingScreensData[currentStep];

  // Determine button text based on current step
  const getNextButtonText = () => {
    if (isLastStep) {
      return "Create an account";
    }
    return "Next";
  };

  return (
    <>
      <OnboardingLayout
        currentStep={currentStep}
        totalSteps={onboardingScreensData.length}
        title={currentScreen.title}
        description={currentScreen.description}
        imageSrc={currentScreen.imageSrc}
        imageAlt={currentScreen.imageAlt}
        onNext={handleNext}
        onContinueWithoutSignup={handleContinueWithoutSignup}
        onDotClick={handleDotClick}
        nextButtonText={getNextButtonText()}
      />

      {/* Authentication Bottom Sheet */}
      <AuthBottomSheet
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onAuthAction={handleAuthAction}
      />
    </>
  );
};

export default OnboardingFlow;
