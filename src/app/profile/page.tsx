"use client";

import { PageHeader } from "@common";
import ProfileBlock from "@/src/components/main/Profile/ProfileBlock";
import ProfileTabs from "@/src/components/main/Profile/ProfileTabs";

export default function ProfilePage() {
  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader title="Profile" />
      <ProfileBlock />
      <ProfileTabs />
    </div>
  );
}
