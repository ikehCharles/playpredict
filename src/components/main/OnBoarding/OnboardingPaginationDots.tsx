"use client";

interface OnboardingPaginationDotsProps {
  totalSteps: number;
  currentStep: number;
  onDotClick?: (index: number) => void;
}

const OnboardingPaginationDots: React.FC<OnboardingPaginationDotsProps> = ({
  totalSteps,
  currentStep,
  onDotClick,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={`
            rounded-full transition-all duration-300 cursor-pointer hover:scale-110
            ${
              index === currentStep
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-tertiary/20 hover:bg-tertiary/40"
            }
          `}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OnboardingPaginationDots;
