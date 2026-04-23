"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageHeaderProps {
  // Title for simple headers (Saved, Rankings, Profile)
  title?: string | ReactNode;
noShadow?: boolean;
  // Full navigation header (Home)
  showNavigation?: boolean;
  showAuth?: boolean;
  isAuthenticated?: boolean;
  onSignInClick?: () => void;
  showMobileHeader?: boolean;
  // Centered logo (Onboarding, Auth)
  centered?: boolean;

  // Custom content
  leftContent?: ReactNode;
  rightContent?: ReactNode;

  // Styling
  className?: string;
}

export default function PageHeader({
  title,
  noShadow = false,
  showAuth = false,
  isAuthenticated = false,
  showMobileHeader = false,
  onSignInClick,
  centered = false,
  leftContent,
  rightContent,
  className = "",
}: PageHeaderProps) {
  const pathname = usePathname();


  // Centered logo header (Onboarding, Auth)
  if (centered) {
    return (
      <header className={`bg-secondary border-b border-tertiary/10 sticky top-0 z-50 ${className}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/PlayPredictLogoBlue.svg"
                alt="PlayPredict"
                width={140}
                height={40}
                priority
              // className="dark:hidden"
              />
              {/* <Image
                src="/icons/PlayPredictLogoWhite.svg"
                alt="PlayPredict"
                width={140}
                height={40}
                priority
                className="hidden dark:block"
              /> */}
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Full navigation header 
  return (
    <>

      {/* Mobile: Logo + Navigation */}
      <header className={` ${noShadow ? "" : "shadow-small"} ${showMobileHeader ? "" : " "} sticky bg-secondary top-0 z-50 ${className}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>

        <div className="  mx-auto px-2 ">
          <div className=" pl-2 pr-2 py-5 flex items-center justify-between gap-2">
            {leftContent ?? null}
            {title ? typeof title === 'string' ? (
              <h1 className={`text-[16px] font-bold text-tertiary flex-1 min-w-0 truncate`}>
                {title}
              </h1>
            )
              : title
              : !leftContent && !rightContent ? (
                <Link href="/" className="flex items-center gap-2 flex-1">
                  <Image
                    src="/icons/PlayPredictLogoBlue.svg"
                    alt="PlayPredict"
                    width={140}
                    height={34}
                    priority
                  // className="dark:hidden"
                  />
                  {/* <Image
                src="/icons/PlayPredictLogoWhite.svg"
                alt="PlayPredict"
                width={120}
                height={34}
                priority
                className="hidden dark:block"
              /> */}
                </Link>
              ) : (
                <span className="flex-1" />
              )}
            {rightContent ?? null}
          </div>

        </div>


      </header>

    </>
  );
}
