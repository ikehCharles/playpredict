"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, RightDrawer } from "@common";
import { Button, Icon } from "@utilities";
import { currentUserProfile, GetBreakpoint } from "@constants";
import { MdVerified } from "react-icons/md";
import { HiOutlineFlag, HiOutlineCalendar, HiOutlinePencil, HiOutlineShare, HiOutlineCog6Tooth } from "react-icons/hi2";
import EditProfileForm from "./EditProfileForm";
import SettingsList from "./SettingsList";

export default function ProfileBlock() {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { displayName, username, bio, country, joinDate, verified, followingCount, followersCount, avatar } =
    currentUserProfile;

  const handleEditClick = useCallback(() => {
    // Desktop: open drawer, Mobile: navigate
    if (GetBreakpoint("md")) {
      setIsEditOpen(true);
    } else {
      router.push("/profile/edit");
    }
  }, [router]);

  const handleSettingsClick = useCallback(() => {
    if (GetBreakpoint("md")) {
      setIsSettingsOpen(true);
    } else {
      router.push("/profile/settings");
    }
  }, [router]);

  return (
    <>
      <div className="p-2 rounded-lg bg-secondary">
        <div className="flex flex-col">
          <div className="flex items-start gap-3 mb-3">
            <Avatar src={avatar} size={80} className="shrink-0" />
            <div className="flex items-center gap-3 mt-1 ml-auto">
              <Button
                bgColorOpacity={0.05}
                borderColorOpacity={0.05}
                textColor="primary"
                size="small"
                icon={
                  <Icon className="fi-rr-user-pen" />
                }
                onClick={handleEditClick}
                aria-label="Edit profile"
              />
              <Button
                bgColorOpacity={0.05}
                borderColorOpacity={0.05}
                textColor="primary"
                size="small"
                icon={ <Icon className="fi fi-rr-redo" /> }
                onClick={() => { }}
                aria-label="Share profile"
              />
              <Button
                bgColorOpacity={0.05}
                borderColorOpacity={0.05}
                textColor="primary"
                size="small"
                icon={<Icon className="fi fi-rr-settings" />}
                onClick={handleSettingsClick}
                aria-label="Settings"
              />
            </div>
          </div>
          <h2 className="text-lg font-bold text-tertiary">{displayName}</h2>
          <p className="text-sm text-tertiary/70 mb-2">@{username}</p>
          <p className="text-sm text-tertiary/90 mb-3 whitespace-pre-line">{bio}</p>

          {/* Tags: Country, Join date, Verify */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary">
              <HiOutlineFlag className="w-3.5 h-3.5" />
              {country}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary">
              <HiOutlineCalendar className="w-3.5 h-3.5" />
              {joinDate}
            </span>
            {!verified && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary">
                <MdVerified className="w-3.5 h-3.5" />
                Get verified
              </span>
            )}
          </div>

          {/* Following | Followers */}
          <div className="flex gap-4">
            <Link href="/profile/following" className="text-sm">
              <span className="font-semibold text-primary">{followingCount}</span>
              <span className="text-tertiary/70 ml-1">Following</span>
            </Link>
            <span className="text-sm">
              <span className="font-semibold text-primary">{followersCount}</span>
              <span className="text-tertiary/70 ml-1">Followers</span>
            </span>
          </div>
        </div>
      </div>

      <RightDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile"
      >
        <EditProfileForm />
      </RightDrawer>

      <RightDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Settings"
      >
        <SettingsList />
      </RightDrawer>
    </>
  );
}

