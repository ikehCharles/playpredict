"use client";

import { useState } from "react";
import EnterEmail from "./EnterEmail";
import VerifyEmail from "./VerifyEmail";
import EmailVerified from "./EmailVerified";

interface AuthProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

type AuthStep = "enter-email" | "verify-email" | "email-verified";

const Auth: React.FC<AuthProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>("enter-email");
  const [email, setEmail] = useState<string>("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setCurrentStep("verify-email");
  };

  const handleVerify = (otp: string) => {
    console.log("Verifying OTP:", otp, "for email:", email);
    // TODO: Implement actual OTP verification
    setCurrentStep("email-verified");
  };

  const handleBack = () => {
    setCurrentStep("enter-email");
  };

  const handleComplete = () => {
    onSuccess?.();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* White Background Wrapper */}
      <div className="bg-secondary p-6 px-3">
        {currentStep === "enter-email" && (
          <EnterEmail onNext={handleEmailSubmit} />
        )}

        {currentStep === "verify-email" && (
          <VerifyEmail
            email={email}
            onBack={handleBack}
            onVerify={handleVerify}
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
