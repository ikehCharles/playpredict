"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EnterEmail from "./EnterEmail";
import VerifyEmail from "./VerifyEmail";
import EmailVerified from "./EmailVerified";

interface AuthProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

type AuthStep = "enter-email" | "verify-email" | "email-verified";

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<AuthStep>("enter-email");
  const [email, setEmail] = useState<string>("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setCurrentStep("verify-email");
  };

  const handleVerified = () => {
    setCurrentStep("email-verified");
  };

  const handleBack = () => {
    setCurrentStep("enter-email");
  };

  const handleComplete = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-secondary p-6 px-3">
        {currentStep === "enter-email" && (
          <EnterEmail onNext={handleEmailSubmit} />
        )}

        {currentStep === "verify-email" && (
          <VerifyEmail
            email={email}
            onBack={handleBack}
            onVerify={handleVerified}
          />
        )}

        {currentStep === "email-verified" && (
          <EmailVerified onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
};

export default Auth;
