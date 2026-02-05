"use client";

import { useState } from "react";
import { Segmented, Button, DatePicker } from "@utilities";
import { PredictionCard, type PredictionCardProps } from "@utilities";
import { predictionsDummyData } from "@constants";
import { HiOutlineChartBar } from "react-icons/hi2";
import { MdInsertChartOutlined } from "react-icons/md";

import type { Dayjs } from "dayjs";

type TabKey = "tips" | "likes" | "stats";

export default function ProfileTabs() {
  const [tab, setTab] = useState<TabKey>("tips");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [tips] = useState<PredictionCardProps[]>(predictionsDummyData);

  return (
    <div className="max-w-7xl mx-auto">
      <Segmented
        block
        options={[
          { label: "Tips", value: "tips" },
          { label: "Likes", value: "likes" },
          { label: "Stats", value: "stats" },
        ]}
        classNames={{
          root: "!bg-secondary !py-2",
         
        
        }}
        className="border border-tertiary/10 rounded-xl"
        value={tab}
        onChange={(v) => setTab((v as TabKey) ?? "tips")}
      />

      {/* Date row + Insights (only for Tips) */}
      {tab === "tips" && (
        <div className="flex items-center bg-secondary py-2 px-1  justify-between gap-3 mb-4">
          <DatePicker value={date} onChange={(d) => setDate(d as Dayjs | null)} />
          
          <Button size="lg" >
          <MdInsertChartOutlined />
                    <span>Insights</span>
                </Button>
         
        </div>
      )}

      {/* Content by tab */}
      {tab === "tips" && (
        <div className="space-y-4">
          {tips.map((item, index) => (
            <PredictionCard key={index} {...item} />
          ))}
        </div>
      )}
      {tab === "likes" && (
        <p className="py-8 text-center text-tertiary/70 text-sm">Likes content coming soon.</p>
      )}
      {tab === "stats" && (
        <p className="py-8 text-center text-tertiary/70 text-sm">Stats content coming soon.</p>
      )}
    </div>
  );
}
