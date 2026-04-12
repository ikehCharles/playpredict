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
import { Button, Tag } from "@utilities";

type TimeFilter = "all-time" | "today" | "this-week" | "this-month" | "custom";

const timeFilters: { label: string; value: TimeFilter }[] = [
  { label: "All-Time", value: "all-time" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "Custom", value: "custom" },
];

const formIconMap: Record<FormResult, React.ReactNode> = {
  loss: <div className="p-2 rounded-xl bg-error/10">
    <HiOutlineXCircle className="w-6 h-6 text-error" />
  </div>
  ,
  win: <div className="p-2 w-full h-full rounded-xl bg-success/10">
  <HiOutlineCheckCircle className="w-6 h-6 text-success" />
  </div> ,
  draw: <div className="p-2 rounded-xl bg-tertiary/10">
  <HiOutlineMinusCircle className="w-6 h-6 text-tertiary/40" />
  </div>,
  pending: <div className="p-2 rounded-xl bg-primary/10">
  <HiOutlineQuestionMarkCircle className="w-6 h-6 text-primary" />
  </div>,
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
            bgColor={filter === f.value ? "primary" : "secondary"}
            bgColorOpacity={filter === f.value ? 0.05 : 1}
            borderColor={filter === f.value ? "primary" : "tertiary"}
            borderColorOpacity={0}
            textColor={filter === f.value ? "primary" : "tertiary"

            }
          // transparent={filter !== f.value}
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
          />
          {/* Per-sport cards */}
          {stats.sportWinRates.map((s) => (
            <WinRateCard
              key={s.sport}
              label={s.sport}
              icon={s.icon}
              winRate={s.winRate}
              tips={s.tips}
            />
          ))}
        </div>
      </div>

      {/* ── Average Odds / Streaks ── */}
      <div className="grid grid-cols-2 gap-2">
        <StatsCard
          label="Average Odds"
          value={stats.averageOdds.toFixed(2)}
          valueClassName="text-primary"
        />
        <StatsCard
          label="ROI"
          value={`${stats.roi}%`}
          valueClassName="text-primary"
        />
        <StatsCard
          label="Win Streak"
          value={stats.winStreak}
          valueClassName="text-primary"
        />
        <StatsCard
          label="Lose Streak"
          value={stats.loseStreak}
          valueClassName="text-tertiary"
        />
      </div>

      {/* ── Form + Achievements ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Form */}
        <div className="bg-background rounded-xl p-4">
          <h3 className="text-sm font-semibold text-tertiary mb-3">Form</h3>
          <div className="flex flex-wrap gap-2">
            {stats.form.map((result, i) => (
              <div key={i}>{formIconMap[result]}</div>
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

/* ── Stats Card sub-component ── */

function StatsCard({
  label,
  value,
  valueClassName = "text-primary",
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="bg-background rounded-xl p-4">
      <p className="text-xs text-tertiary">{label}</p>
      <p className={`text-lg font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

/* ── Win Rate Card sub-component ── */

function WinRateCard({
  label,
  icon,
  winRate,
  tips,
}: {
  label: string;
  icon?: string;
  winRate: number;
  tips: number;
}) {
  return (
    <div className="bg-secondary shrink-0 flex flex-col items-center gap-2 border border-tertiary/10 rounded-xl px-4 py-3 min-w-30">
      <span className="text-xs text-tertiary flex items-center gap-1">
        {icon && <span className="text-sm">{icon}</span>}
        {label}
      </span>
      <Tag colorbycount={winRate} variant="solid" rootClassName="rounded-full text-center! w-[100px]">
        {winRate}% W.R
      </Tag>
      <Tag color={"tertiary"} variant="solid" rootClassName="rounded-full text-center! w-[100px]">
        {tips} Tips
      </Tag>

    </div>
  );
}
