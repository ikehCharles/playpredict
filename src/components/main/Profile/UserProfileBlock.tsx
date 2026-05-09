"use client";

import { useState, useCallback } from "react";
import { Avatar } from "@common";
import { Button, Icon } from "@utilities";
import { MdVerified } from "react-icons/md";
import {
  HiOutlineCalendar,
  HiOutlineFlag,
  HiOutlineBell,
  HiOutlineBellSlash,
  HiOutlineNoSymbol,
  HiBell,
} from "react-icons/hi2";
import type { viewedUserProfile as ViewedUserProfileType } from "@constants";

type ViewedUser = typeof ViewedUserProfileType;

interface UserProfileBlockProps {
  user: ViewedUser;
}

export default function UserProfileBlock({ user }: UserProfileBlockProps) {
  const [isFollowing, setIsFollowing] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isNotified, setIsNotified] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  const toggleFollow = useCallback(() => setIsFollowing((v) => !v), []);
  const toggleMute = useCallback(() => setIsMuted((v) => !v), []);
  const toggleNotify = useCallback(() => setIsNotified((v) => !v), []);
  const toggleBlock = useCallback(() => setIsBlocked((v) => !v), []);

  const handleShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${user.displayName} on PlayPredict`,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
    }
  }, [user.displayName]);

  return (
    <div className="p-2 rounded-lg bg-secondary">
      <div className="flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Avatar src={user.avatar} size={60} className="shrink-0" />
          <div className="flex items-center gap-2 mt-1 ml-auto flex-wrap justify-end">
            <Button
              type={isFollowing ? "default" : "primary"}
              bgColor={isFollowing ? "secondary" : "primary"}
              bgColorOpacity={isFollowing ? 1 : 1}
              borderColor={isFollowing ? "tertiary" : "primary"}
              borderColorOpacity={isFollowing ? 0.15 : 1}
              textColor={isFollowing ? "primary" : "secondary"}
              onClick={toggleFollow}
              className="rounded-lg px-4!"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>

            <Button
              bgColorOpacity={0.08}
              borderColorOpacity={0}
              bgColor={isBlocked ? "primary" : "error"}
              textColor={isBlocked ? "primary" : "error"}
              icon={<Icon icon={isBlocked ? "fi-rs-user-forbidden-alt" : "fi-rr-user-forbidden"} />}
              onClick={toggleBlock}
              aria-label={isBlocked ? "Unblock user" : "Block user"}
            />

            {isFollowing && (
              <>
                <Button
                  bgColorOpacity={isMuted ? 0.1 : 1}
                  borderColorOpacity={0}
                  bgColor={isMuted ? "primary" : "primary"}
                  textColor={isMuted ? "primary" : "secondary"}
                  icon={<Icon icon={isMuted ? "fi-rs-bell-slash" : "fi-rs-bell-notification-social-media"} />}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute notifications" : "Mute notifications"}
                />
                
              </>
            )}

            <Button
              bgColorOpacity={0.05}
              borderColorOpacity={0}
              textColor="primary"
              icon={<Icon icon="fi fi-rr-redo" />}
              onClick={handleShare}
              aria-label="Share profile"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-tertiary flex items-center gap-1.5">
          {user.displayName}
          {user.verified && <MdVerified className="text-blue-600 w-5 h-5" />}
        </h2>
        <p className="text-sm text-tertiary/70 mb-2">@{user.username}</p>
        <p className="text-sm text-tertiary/90 mb-3 whitespace-pre-line">{user.bio}</p>

        {/* Tags: Country, Join date, Verified */}
        <div className="flex flex-wrap gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary">
            <HiOutlineFlag className="w-3.5 h-3.5 text-error" />
            {user.country}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            {user.joinDate}
          </span>
          {user.verified && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary">
              <MdVerified className="w-3.5 h-3.5 text-blue-600" />
              Verified
            </span>
          )}
        </div>

        {/* Following / Followers */}
        <div className="flex mb-2 gap-4">
          <span className="text-sm">
            <span className="font-semibold text-primary">{user.followingCount}</span>
            <span className="text-tertiary/70 ml-1">Following</span>
          </span>
          <span className="text-sm">
            <span className="font-semibold text-primary">{user.followersCount}</span>
            <span className="text-tertiary/70 ml-1">Followers</span>
          </span>
        </div>
      </div>
    </div>
  );
}
