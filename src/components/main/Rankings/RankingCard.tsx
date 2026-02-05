"use client";

import { Avatar } from "@common";
import { Badge } from "antd";
import { MdVerified } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LuTrophy } from "react-icons/lu";

export interface RankingUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  winRate: number;
  tipsCount: number;
  rank: number;
}

interface RankingCardProps {
  user: RankingUser;
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

export default function RankingCard({ user, onFollowClick }: RankingCardProps) {
  const rankStyle = getRankStyle(user.rank);

  return (
    <div className="flex items-center gap-3 p-4 border-b border-tertiary/10 last:border-b-0">
      {/* Avatar with follow button */}
      <div className="relative shrink-0">
        <Badge
          count={
            <button
              onClick={() => onFollowClick?.(user.id)}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 border-2 border-secondary cursor-pointer hover:bg-red-600 transition-colors"
            >
              <FaPlus className="w-2.5 h-2.5 text-white" />
            </button>
          }
          offset={[-2, 32]}
        >
          <Avatar src={user.avatar} size={48} />
        </Badge>
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-tertiary truncate">{user.name}</span>
          {user.verified && (
            <MdVerified className="w-4 h-4 text-blue-500 shrink-0" />
          )}
          {/* Stats badges */}
          <span className="ml-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500 text-white">
            {user.winRate}% W.R
          </span>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-tertiary/10 text-tertiary">
            {user.tipsCount} Tips
          </span>
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
