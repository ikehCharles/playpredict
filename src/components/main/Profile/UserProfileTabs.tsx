"use client";

import { useState } from "react";
import { Segmented, DatePicker, Select } from "@playpredict/ui";
import { PredictionCard, type PredictionCardProps } from "@common";
import { viewedUserTipsDummyData, viewedUserPastTipsDummyData } from "@constants";
import ProfileStats from "./ProfileStats";
import ProfileLikes from "./ProfileLikes";
import dayjs, { type Dayjs } from "dayjs";

type TabKey = "tips" | "likes" | "stats";

const filterOptions = [
  { value: "matchDate", label: "By Match Date" },
  { value: "predictionDate", label: "By Prediction Date" },
];

interface UserProfileTabsProps {
  showPastResults?: boolean;
}

export default function UserProfileTabs({ showPastResults = false }: UserProfileTabsProps) {
  const [tab, setTab] = useState<TabKey>("tips");
  const [date, setDate] = useState<Dayjs | null>(
    showPastResults ? dayjs("2025-03-08") : dayjs("2025-03-16"),
  );
  const [filterOption, setFilterOption] = useState<string>("predictionDate");

  const tips: PredictionCardProps[] = showPastResults
    ? viewedUserPastTipsDummyData
    : viewedUserTipsDummyData;

  return (
    <div>
      <Segmented
        block
        options={[
          { label: "Tips", value: "tips" },
          { label: "Likes", value: "likes" },
          { label: "Stats", value: "stats" },
        ]}
        classNames={{ root: "!bg-secondary !py-1" }}
        className="border border-tertiary/10 rounded-xl"
        value={tab}
        onChange={(v) => setTab((v as TabKey) ?? "tips")}
      />

      {tab === "tips" && (
        <div className="flex items-center p-2 bg-secondary justify-between gap-3 mb-3">
          <DatePicker value={date} onChange={(d) => setDate(d as Dayjs | null)} />
          <Select
            showSearch={false}
            placeholder="Select filter"
            options={filterOptions}
            value={filterOption}
            onChange={(value) => setFilterOption(value)}
            className="w-40 font-medium"
          />
        </div>
      )}

      {tab === "tips" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((item, index) => (
            <PredictionCard key={index} {...item} />
          ))}
        </div>
      )}
      {tab === "likes" && <ProfileLikes />}
      {tab === "stats" && <ProfileStats />}
    </div>
  );
}
