"use client";

import Link from "next/link";
import { PageHeader } from "@common";
import SettingsList from "@/src/components/main/Profile/SettingsList";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function SettingsPage() {
  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        title="Settings"
        leftContent={
          <Link
            href="/profile"
            className="p-2 -ml-1 rounded-full hover:bg-tertiary/5 transition-colors"
            aria-label="Back to profile"
          >
            <HiOutlineArrowLeft className="w-6 h-6 text-tertiary" />
          </Link>
        }
      />
      <SettingsList />
    </div>
  );
}
