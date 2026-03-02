"use client";

import { useState } from "react";
import { profileStatsDummyData } from "@constants";
import type { ProfileStatsType, FormResult } from "@models";
import {
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineMinusCircle,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { Button } from "../../utilities";

type TimeFilter = "all-time" | "today" | "this-week" | "this-month";

const timeFilters: { label: string; value: TimeFilter }[] = [
  { label: "All-Time", value: "all-time" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
];

const formIconMap: Record<FormResult, React.ReactNode> = {
  loss: <HiOutlineXCircle className="w-6 h-6 text-error" />,
  win: <HiOutlineCheckCircle className="w-6 h-6 text-green-500" />,
  draw: <HiOutlineMinusCircle className="w-6 h-6 text-tertiary/40" />,
  pending: <HiOutlineQuestionMarkCircle className="w-6 h-6 text-primary" />,
};

export default function ProfileStats() {
  const [filter, setFilter] = useState<TimeFilter>("all-time");
  const stats: ProfileStatsType = profileStatsDummyData;

  return (
    <div className="space-y-4 p-2 mt-2 bg-secondary">
      {/* ── Time Filters ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {timeFilters.map((f) => (
          <Button
            key={f.value}
            size="middle"
            onClick={() => setFilter(f.value)}
            transparent={filter !== f.value}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* ── Summary Row ── */}
      <div className="grid grid-cols-4 gap-3 bg-background rounded-xl p-4">
        <div>
          <p className="text-xs text-tertiary/60">Total Tips</p>
          <p className="text-lg font-bold text-tertiary">{stats.totalTips.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-tertiary/60">Won</p>
          <p className="text-lg font-bold text-green-500">{stats.won.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-tertiary/60">Lost</p>
          <p className="text-lg font-bold text-error">{stats.lost.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-tertiary/60">Voided</p>
          <p className="text-lg font-bold text-tertiary">{stats.voided.toLocaleString()}</p>
        </div>
      </div>

      {/* ── Win Rate ── */}
      <div className="bg-background rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-tertiary">Win Rate</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {/* Total Win Rate card */}
          <WinRateCard
            label="Total Win Rate"
            winRate={stats.totalWinRate}
            tips={stats.totalWinRateTips}
            color="bg-tertiary"
          />
          {/* Per-sport cards */}
          {stats.sportWinRates.map((s) => (
            <WinRateCard
              key={s.sport}
              label={s.sport}
              icon={s.icon}
              winRate={s.winRate}
              tips={s.tips}
              color={s.color}
            />
          ))}
        </div>
      </div>

      {/* ── Average Odds / Streaks ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-background rounded-xl p-4">
          <p className="text-xs text-tertiary/60">Average Odds</p>
          <p className="text-lg font-bold text-primary">{stats.averageOdds.toFixed(2)}</p>
        </div>
        <div className="bg-background rounded-xl p-4">
          <p className="text-xs text-tertiary/60">Win Streak</p>
          <p className="text-lg font-bold text-primary">{stats.winStreak}</p>
        </div>
        <div className="bg-background rounded-xl p-4">
          <p className="text-xs text-tertiary/60">Lose Streak</p>
          <p className="text-lg font-bold text-tertiary">{stats.loseStreak}</p>
        </div>
      </div>

      {/* ── Form + Achievements ── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Form */}
        <div className="bg-background rounded-xl p-4">
          <h3 className="text-sm font-semibold text-tertiary mb-3">Form</h3>
          <div className="flex flex-wrap gap-2">
            {stats.form.map((result, i) => (
              <span key={i}>{formIconMap[result]}</span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-background rounded-xl p-4">
          <h3 className="text-sm font-semibold text-tertiary mb-3">Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {stats.achievements.map((_, i) => (
              <span
                key={i}
                className="w-8 h-8 rounded-full bg-tertiary/10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Win Rate Card sub-component ── */

function WinRateCard({
  label,
  icon,
  winRate,
  tips,
  color,
}: {
  label: string;
  icon?: string;
  winRate: number;
  tips: number;
  color: string;
}) {
  return (
    <div className="bg-secondary shrink-0 flex flex-col items-center gap-2 border border-tertiary/10 rounded-xl px-4 py-3 min-w-30">
      <span className="text-xs text-tertiary/70 flex items-center gap-1">
        {icon && <span className="text-sm">{icon}</span>}
        {label}
      </span>
      <span className={`${color} text-secondary text-xs font-semibold rounded-full px-3 py-0.5`}>
        {winRate}% W.R
      </span>
      <span className="bg-tertiary text-secondary text-xs font-medium rounded-full px-3 py-0.5">
        {tips} Tips
      </span>
    </div>
  );
}
