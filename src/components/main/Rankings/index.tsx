"use client";

import { useState } from "react";
import RankingsHeader from "./RankingsHeader";
import RankingsFilters, { RankingsFilterState } from "./RankingsFilters";
import RankingsList from "./RankingsList";
import { rankingsDummyData } from "@constants";

const defaultFilters: RankingsFilterState = {
  sport: "all",
  timeframe: "all-time",
  sortBy: "tips",
};

export default function Rankings() {
  const [filters, setFilters] = useState<RankingsFilterState>(defaultFilters);

  const handleFilterChange = (newFilters: RankingsFilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const handleFollowClick = (userId: string) => {
    console.log("Follow user:", userId);
    // TODO: Implement follow logic
  };

  // Sort users based on selected sort option
  const sortedUsers = [...rankingsDummyData].sort((a, b) => {
    if (filters.sortBy === "winrate") {
      return b.winRate - a.winRate;
    }
    if (filters.sortBy === "tips") {
      return b.tipsCount - a.tipsCount;
    }
    // Default: by rank
    return a.rank - b.rank;
  });

  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <RankingsHeader />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 py-4 space-y-4">
        <RankingsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        <RankingsList users={sortedUsers} onFollowClick={handleFollowClick} />
      </div>
    </div>
  );
}
