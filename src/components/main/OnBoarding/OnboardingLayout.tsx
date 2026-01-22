"use client";

import OnboardingPaginationDots from "./OnboardingPaginationDots";
import OnboardingContentBlock from "./OnboardingContentBlock";
import OnboardingPhoneMockup from "./OnboardingPhoneMockup";
import OnboardingActions from "./OnboardingActions";
import OnboardingHeader from "./OnboardingHeader";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  onNext: () => void;
  onContinueWithoutSignup: () => void;
  onDotClick?: (index: number) => void;
  nextButtonText?: string;
  showDecorations?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  title,
  description,
  imageSrc,
  imageAlt,
  onNext,
  onContinueWithoutSignup,
  onDotClick,
  nextButtonText = "Next",
  showDecorations = true,
}) => {
  return (
    <div className="relative h-screen bg-background overflow-hidden flex flex-col">
      {/* Header - Desktop Only */}
      <div className="hidden md:block">
        <OnboardingHeader />
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden md:flex flex-1 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 items-center justify-center gap-12">
        {/* Image Container - Left Side */}
        <div className="flex-1 flex items-center justify-center">
          <OnboardingPhoneMockup
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            showDecorations={showDecorations}
          />
        </div>

        {/* Content Container - Right Side */}
        <div className="flex-1 flex flex-col justify-center space-y-8 max-w-xl">
          {/* Content Block */}
          <OnboardingContentBlock title={title} description={description} />

          {/* Action Buttons */}
          <OnboardingActions
            primaryText={nextButtonText}
            onPrimary={onNext}
            onSecondary={onContinueWithoutSignup}
          />

          {/* Pagination Dots - Bottom on Desktop */}
          <OnboardingPaginationDots
            currentStep={currentStep}
            totalSteps={totalSteps}
            onDotClick={onDotClick}
          />
        </div>
      </div>

      {/* Mobile Layout - Bottom Sheet */}
      <div className="md:hidden">
        {/* Image Container - Static with overflow scroll if needed */}
        <div className="absolute inset-0 overflow-y-auto pb-[400px]">
          <div className="flex items-center justify-center min-h-full py-8">
            <OnboardingPhoneMockup
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              showDecorations={showDecorations}
            />
          </div>
        </div>

        {/* Fixed Bottom Sheet */}
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-secondary/95 backdrop-blur-md rounded-t-3xl shadow-2xl border-t border-tertiary/10">
          <div className="pb-8 pt-6 px-2">
            {/* Content Block */}
            <OnboardingContentBlock title={title} description={description} />

            {/* Action Buttons */}
            <OnboardingActions
              primaryText={nextButtonText}
              onPrimary={onNext}
              onSecondary={onContinueWithoutSignup}
            />

            {/* Pagination Dots - At Bottom */}
            <OnboardingPaginationDots
              currentStep={currentStep}
              totalSteps={totalSteps}
              onDotClick={onDotClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
