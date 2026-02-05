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
    <div className="relative flex items-center justify-center py-4 px-4">
     
      {/* Phone Frame with Image */}
      <div className="relative z-10 w-full mx-auto">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={520}
          height={640}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default OnboardingPhoneMockup;
