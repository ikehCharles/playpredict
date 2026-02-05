"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IoNotificationsOutline } from "react-icons/io5";
import { navItems } from "@constants";
import { Button } from "@utilities";

interface PageHeaderProps {
  // Title for simple headers (Saved, Rankings, Profile)
  title?: string;

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
      <header className={`bg-secondary border-b border-tertiary/10 sticky top-0 z-50 ${className}`}>
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
    {/* Desktop: Logo + Navigation */}
    <header className={`border-b border-tertiary/5 sticky top-0 z-50 ${className}`}>
      
      <div className=" hidden md:block bg-secondary mx-auto px-2 sm:px-6 md:px-8 lg:px-8">

        
        <div className=" md:flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/PlayPredictLogoBlue.svg"
              alt="PlayPredict"
              width={140}
              height={40}
              priority
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

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors font-medium ${isActive
                      ? "text-primary"
                      : "text-tertiary hover:text-primary"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          {showAuth && (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <IoNotificationsOutline className="w-6 h-6 text-tertiary" />
                  </button>
                  <Link href="/profile">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity">
                      JD
                    </div>
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={onSignInClick}
                  type="primary"
                  className="rounded-full"
                >
                  Sign In
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Left content, title/logo, right content */}



      </div>
      

    </header>
    {/* Mobile: Logo + Navigation */}
    <header className={`border-b  border-tertiary/5 ${showMobileHeader ? "" : "md:hidden "}  lg:px-10 sticky md:relative bg-secondary md:bg-transparent top-0 z-50 md:z-0  ${className}`}>
      
    <div className="  mx-auto px-2 sm:px-6 md:px-8 lg:px-8">
        <div className=" py-4 pl-2 pr-2 pt-4 flex items-center justify-between gap-2">
          {leftContent ?? null}
          {title ? (
            <h1 className="text-md font-bold text-tertiary flex-1 min-w-0 truncate">
              {title}
            </h1>
          ) : !leftContent && !rightContent ? (
            <Link href="/" className="flex items-center gap-2 flex-1">
              <Image
                src="/icons/PlayPredictLogoBlue.svg"
                alt="PlayPredict"
                width={120}
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
