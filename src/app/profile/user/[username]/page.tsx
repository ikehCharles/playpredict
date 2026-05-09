"use client";

import Link from "next/link";
import { PageHeader } from "@common";
import UserProfileBlock from "@/src/components/main/Profile/UserProfileBlock";
import UserProfileTabs from "@/src/components/main/Profile/UserProfileTabs";
import { viewedUserProfile } from "@constants";
import { MdKeyboardBackspace } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export default function UserProfilePage() {
  const searchParams = useSearchParams();
  const showPastResults = searchParams.get("history") === "1";

  return (
    <>
      <PageHeader
        title="User Profile"
        showMobileHeader
        leftContent={
          <Link
            href="/"
            className="px-2 -ml-1 rounded-full hover:bg-tertiary/5 transition-colors"
            aria-label="Back"
          >
            <MdKeyboardBackspace className="w-6 h-6 text-primary" />
          </Link>
        }
      />
      <div className="max-w-8xl mx-auto lg:px-2 min-h-[50vh]">
        <div className="lg:mt-4">
          <UserProfileBlock user={viewedUserProfile} />
          <UserProfileTabs showPastResults={showPastResults} />
        </div>
      </div>
    </>
  );
}
