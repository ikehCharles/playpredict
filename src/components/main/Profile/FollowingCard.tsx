"use client";

import { Avatar } from "@common";
import { Button } from "@utilities";
import { MdVerified } from "react-icons/md";
import { Tag } from "antd";

export interface FollowingUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio: string;
  winRate: string;
  winRateColor: "green" | "red" | "yellow";
  tipsCount: number;
  isFollowing: boolean;
}

interface FollowingCardProps {
  user: FollowingUser;
  onFollowToggle?: (id: string, isFollowing: boolean) => void;
}

export default function FollowingCard({ user, onFollowToggle }: FollowingCardProps) {
  const tagColor = user.winRateColor === "green" ? "success" : user.winRateColor === "red" ? "error" : "warning";

  return (
    <div className="flex gap-3 p-4 rounded-xl bg-secondary border border-tertiary/10">
      <Avatar src={user.avatar} size={48} className="flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-tertiary">
              {user.name}
              {user.verified && <MdVerified className="w-4 h-4 text-blue-600 flex-shrink-0" />}
            </div>
            <p className="text-sm text-tertiary/70">@{user.username}</p>
          </div>
          <Button
            type={user.isFollowing ? "default" : "primary"}
            className="rounded-lg flex-shrink-0"
            onClick={() => onFollowToggle?.(user.id, user.isFollowing)}
          >
            {user.isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
        <p className="text-sm text-tertiary/80 mt-2 line-clamp-2">{user.bio}</p>
        <div className="flex gap-2 mt-2">
          <Tag color={tagColor} className="!m-0 font-semibold">
            {user.winRate} W.R
          </Tag>
          <Tag color="default" className="!m-0 font-semibold">
            {user.tipsCount} Tips
          </Tag>
        </div>
      </div>
    </div>
  );
}
