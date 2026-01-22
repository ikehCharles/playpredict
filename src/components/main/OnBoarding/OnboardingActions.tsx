"use client";

import { Button } from "@utilities";

interface OnboardingActionsProps {
  primaryText: string;
  onPrimary: () => void;
  onSecondary: () => void;
  secondaryText?: string;
}

const OnboardingActions: React.FC<OnboardingActionsProps> = ({
  primaryText,
  onPrimary,
  onSecondary,
  secondaryText = "Continue without sign up",
}) => {
  return (
    <div className="px-2 md:px-0 space-y-3">
      {/* Primary Action Button */}
      <Button
        type="primary"
        onClick={onPrimary}
        className="w-full"
        block
      >
        {primaryText}
      </Button>

      {/* Secondary Action - Continue Without Signup */}
      <Button
        type="text"
        onClick={onSecondary}
        className="w-full underline"
       block
      >
        {secondaryText}
      </Button>
    </div>
  );
};

export default OnboardingActions;
