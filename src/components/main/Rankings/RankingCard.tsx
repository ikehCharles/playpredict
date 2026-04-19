"use client";

import { Avatar } from "@common";
import { Badge } from "antd";
import { MdVerified } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LuTrophy } from "react-icons/lu";
import { formatCount } from "@constants";
import { Icon, Tag, Tooltip } from "@utilities";

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
  currentUser?: RankingUser;
  onFollowClick?: (id: string) => void;
}

const getRankSuffix = (rank: number): React.ReactNode => {
  if (rank === 1) return (<span className="bg-primary border border-primary/10 font-bold text-secondary rounded-md p-1 px-2.5 flex items-center">
    <span>1st</span>
    <Icon icon={'fi fi-sr-bullet mt-0.5'} />
    <span>$50,000</span>
  </span>);
  if (rank === 2) return (<span className="bg-primary/10 border font-bold border-primary/10 text-primary rounded-md p-1 px-2.5 flex items-center">
    <span>2nd</span>
    <Icon icon={'fi fi-sr-bullet mt-0.5'} />
    <span>$30,000</span>
  </span>);
  if (rank === 3) return (<span className="bg-primary/10 border font-bold border-primary/10 text-primary rounded-md p-1 px-2.5 flex items-center">
    <span>3rd</span>
    <Icon className="text-primary" icon={'fi fi-sr-bullet mt-0.5'} />
    <span>$20,000</span>
  </span>);
  return <span className="bg-tertiary/5 font-bold border border-tertiary/10 rounded-md text-tertiary p-1 px-2.5" >{rank}th</span>;
};


export default function RankingCard({ user, currentUser, onFollowClick }: RankingCardProps) {

  return (
    <div className={`px-2 py-1 ${user.id === currentUser?.id ? "bg-primary/5" : ""}`}>
    <div
      className={`flex  items-start gap-3 p-1 border-b border-tertiary/10 `}
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
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-tertiary truncate">{user.name}</span>
            {user.verified && (
              <MdVerified className="w-4 h-4 text-blue-500 shrink-0" />
            )}
          </div>
          <span
            className={`inline-flex items-center gap-1 py-0.5 text-xs font-semibold rounded-full`}
          >
            {getRankSuffix(user.rank)}
          </span>

        </div>
        <p className="text-sm text-tertiary/60">@{user.username}</p>
        <div className="flex items-center gap-2 mt-1">

          {/* ROI badges */}
          <Tag colorbycount={user.roi || 0} variant="solid" className="font-semibold rounded-full">
            {user.roi}% ROI
          </Tag>
          {/* Stats badges */}
          <Tag colorbycount={user.winRate} variant="solid" className="font-semibold rounded-full">
            {user.winRate}% W.R
          </Tag>

          <Tooltip title={`${user.tipsCount.toLocaleString()} Tips`}>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-tertiary/10 text-tertiary cursor-default">
              {formatCount(user.tipsCount)} Tips
            </span>
          </Tooltip>
        </div>
        {/* Rank badge */}
        <div className="flex items-center py-1 text-sm text-tertiary gap-1 mt-1">
          Active 16/30 days this month
        </div>
      </div>
    </div>
    </div>
  );
}
