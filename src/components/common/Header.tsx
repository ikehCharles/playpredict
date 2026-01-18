"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { navItems } from "@/src/constants/common";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="bg-secondary border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-tertiary hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
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
              <button
                onClick={() => setIsAuthenticated(true)}
                className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
