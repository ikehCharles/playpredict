"use client";

interface OnboardingContentBlockProps {
  title: string;
  description: string;
}

const OnboardingContentBlock: React.FC<OnboardingContentBlockProps> = ({
  title,
  description,
}) => {
  return (
    <div className="px-2 md:px-0 py-4 md:py-0 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-tertiary mb-3">{title}</h2>
      <p className="text-tertiary/70 text-base md:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default OnboardingContentBlock;
