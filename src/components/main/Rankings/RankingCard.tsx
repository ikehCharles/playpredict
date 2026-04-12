"use client";

import { Avatar } from "@common";
import { Badge } from "antd";
import { MdVerified } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LuTrophy } from "react-icons/lu";
import { formatCount } from "@constants";
import { Tag, Tooltip } from "@utilities";

export interface RankingUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  winRate: number;
  tipsCount: number;
  rank: number;
  roi: number;
}

interface RankingCardProps {
  user: RankingUser;
  currentUser: RankingUser;
  onFollowClick?: (id: string) => void;
}

const getRankSuffix = (rank: number): string => {
  if (rank === 1) return "1st";
  if (rank === 2) return "2nd";
  if (rank === 3) return "3rd";
  return `${rank}th`;
};

const getRankStyle = (rank: number) => {
  if (rank === 1) {
    return {
      bg: "bg-yellow-500",
      text: "text-white",
    };
  }
  if (rank === 2) {
    return {
      bg: "bg-gray-400",
      text: "text-white",
    };
  }
  if (rank === 3) {
    return {
      bg: "bg-amber-600",
      text: "text-white",
    };
  }
  return {
    bg: "bg-tertiary/10",
    text: "text-tertiary/70",
  };
};

export default function RankingCard({ user, currentUser, onFollowClick }: RankingCardProps) {
  const rankStyle = getRankStyle(user.rank);

  return (
    <div
      className={`flex rounded-lg items-start gap-3 p-4 px-3 border-b border-tertiary/10 last:border-b-0 ${user.id === currentUser.id ? "bg-primary/5" : "bg-background"
        }`}
    >
      {/* Avatar with follow button */}
      <div className="relative shrink-0">
        <Badge

          offset={[-2, 32]}
        >
          <Avatar src={user.avatar} size={38} />
        </Badge>
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-tertiary truncate">{user.name}</span>
          {user.verified && (
            <MdVerified className="w-4 h-4 text-blue-500 shrink-0" />
          )}
          {/* ROI badges */}
          <Tag colorbycount={user.roi || 0} variant="solid" className="font-semibold rounded-full">
            {user.roi} ROI
          </Tag>
          {/* Stats badges */}
          <Tag colorbycount={user.winRate} variant="solid" className="font-semibold rounded-full">
            {user.winRate} W.R
          </Tag>
          
          <Tooltip title={`${user.tipsCount.toLocaleString()} Tips`}>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-tertiary/10 text-tertiary cursor-default">
              {formatCount(user.tipsCount)} Tips
            </span>
          </Tooltip>
        </div>
        <p className="text-sm text-tertiary/60">@{user.username}</p>
        {/* Rank badge */}
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${rankStyle.bg} ${rankStyle.text}`}
          >
            <LuTrophy className="w-3 h-3" />
            {getRankSuffix(user.rank)}
          </span>
        </div>
      </div>
    </div>
  );
}
