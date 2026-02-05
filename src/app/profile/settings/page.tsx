"use client";

import Link from "next/link";
import { PageHeader } from "@common";
import SettingsList from "@/src/components/main/Profile/SettingsList";
import { MdKeyboardBackspace } from "react-icons/md";

export default function SettingsPage() {
  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        title="Settings"
        showMobileHeader
        leftContent={
          <Link
            href="/profile"
            className="pl-2 -ml-1 rounded-full hover:bg-tertiary/5 transition-colors"
            aria-label="Back to profile"
          >
            <MdKeyboardBackspace className="w-6 h-6 text-primary" />
          </Link>
        }
      />
      <SettingsList />
    </div>
  );
}
