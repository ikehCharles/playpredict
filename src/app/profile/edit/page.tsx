"use client";

import Link from "next/link";
import { PageHeader } from "@common";
import EditProfileForm from "@/src/components/main/Profile/EditProfileForm";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function EditProfilePage() {
  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        title="Edit Profile"
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
      <EditProfileForm />
    </div>
  );
}
