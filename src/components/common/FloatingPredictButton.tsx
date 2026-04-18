"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../utilities";

export default function FloatingPredictButton() {
  const pathname = usePathname();

  if (pathname === "/predict") {
    return null;
  }

  return (
    <Link
      href="/predict"
      aria-label="Start prediction flow"
      className="fixed right-4 bottom-25 md:bottom-6 md:right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-secondary shadow-md shadow-tertiary/40 transition-transform hover:scale-[1.03] active:scale-95"
    >
      <Icon icon="fi fi-rr-edit" className="scale-160 leading-none" />
    </Link>
  );
}
