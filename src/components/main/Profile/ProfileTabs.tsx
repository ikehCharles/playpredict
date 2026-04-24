"use client";

import { useMemo, useState } from "react";
import { Segmented, Button, DatePicker, Select } from "@utilities";
import { PredictionCard, type PredictionCardProps } from "@utilities";
import { predictionsDummyData } from "@constants";
import { MdInsertChartOutlined } from "react-icons/md";
import ProfileStats from "./ProfileStats";
import ProfileLikes from "./ProfileLikes";

import type { Dayjs } from "dayjs";

type TabKey = "tips" | "likes" | "stats";

export default function ProfileTabs() {
  const [tab, setTab] = useState<TabKey>("tips");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [tips] = useState<PredictionCardProps[]>(predictionsDummyData);
  const [filterOption, setFilterOption] = useState<string>("matchDate");
const filterOptions = [
  { value: "matchDate", label: "By Match Date" },
  { value: "predictionDate", label: "By Prediction Date" }
]

  
  return (
    <div className="">
      <Segmented
        block
        options={[
          { label: "Tips", value: "tips" },
          { label: "Likes", value: "likes" },
          { label: "Stats", value: "stats" },
        ]}
        classNames={{
          root: "!bg-secondary !py-1",


        }}
        className="border border-tertiary/10 rounded-xl"
        value={tab}
        onChange={(v) => setTab((v as TabKey) ?? "tips")}
      />


      {/* Date row + Insights (only for Tips) */}
      {tab === "tips" && (
        <div className="flex items-center p-2 bg-secondary  justify-between gap-3 mb-3">
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

      {/* Content by tab */}
      {tab === "tips" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((item, index) => (
            <PredictionCard key={index} {...item} />
          ))}
        </div>
      )}
      {tab === "likes" && (
        <ProfileLikes />
      )}
      {tab === "stats" && <ProfileStats />}
    </div>

  );
}
