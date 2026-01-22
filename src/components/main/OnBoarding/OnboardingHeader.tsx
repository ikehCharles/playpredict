"use client";

import Image from "next/image";
import Link from "next/link";

export default function OnboardingHeader() {
  return (
    <header className="bg-secondary border-b border-tertiary/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* Logo - Centered */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/PlayPredictLogoBlue.svg"
              alt="PlayPredict"
              width={140}
              height={40}
              priority
              className="dark:hidden"
            />
            <Image
              src="/icons/PlayPredictLogoWhite.svg"
              alt="PlayPredict"
              width={140}
              height={40}
              priority
              className="hidden dark:block"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
