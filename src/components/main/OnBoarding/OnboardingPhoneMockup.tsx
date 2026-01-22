"use client";

import Image from "next/image";

interface OnboardingPhoneMockupProps {
  imageSrc: string;
  imageAlt?: string;
  showDecorations?: boolean;
}

const OnboardingPhoneMockup: React.FC<OnboardingPhoneMockupProps> = ({
  imageSrc,
  imageAlt = "App preview",
  showDecorations = true,
}) => {
  return (
    <div className="relative flex items-center justify-center py-8 px-4">
      {/* Decorative Background Elements */}
      {showDecorations && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-x-1/3 translate-y-1/4" />
        </>
      )}

      {/* Phone Frame with Image */}
      <div className="relative z-10 w-full max-w-[320px] mx-auto">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={320}
          height={640}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
};

export default OnboardingPhoneMockup;
