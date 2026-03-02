"use client";

import { PageHeader } from "@common";
import ProfileBlock from "@/src/components/main/Profile/ProfileBlock";
import ProfileTabs from "@/src/components/main/Profile/ProfileTabs";

export default function ProfilePage() {
  return (
    <>
    <PageHeader title="Profile" />
    <div className="max-w-8xl mx-auto lg:px-2 min-h-[50vh]">
      <div className="lg:mt-4 ">

      <ProfileBlock />
      <ProfileTabs />
      </div>
    </div>
    </>
  );
}
