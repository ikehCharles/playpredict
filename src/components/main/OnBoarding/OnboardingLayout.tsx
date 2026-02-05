"use client";

import OnboardingPaginationDots from "./OnboardingPaginationDots";
import OnboardingContentBlock from "./OnboardingContentBlock";
import OnboardingPhoneMockup from "./OnboardingPhoneMockup";
import OnboardingActions from "./OnboardingActions";
import { PageHeader } from "@common";

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
    <div className="relative h-[70vh] lg:h-[90vh] pb-[100px] overflow-auto bg-secondary flex flex-col">
      {/* Header */}
      <PageHeader centered />

      {/* Desktop Layout - Side by Side */}
      <div className="hidden bg-secondary md:flex flex-1 max-w-7xl mx-auto px-2 pt-10 lg:px-8 items-center justify-center gap-12">
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
        <div className="">
          <div className="flex items-center justify-center min-h-full pb-8">
            <OnboardingPhoneMockup
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              showDecorations={showDecorations}
            />
          </div>
        </div>

        {/* Fixed Bottom Sheet */}
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-primary/5 backdrop-blur-md shadow-2xl ">
          <div className="pb-4 pt-3 px-2">
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
