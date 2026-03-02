"use client";

import { useState } from "react";
import RankingsHeader from "./RankingsHeader";
import RankingsFilters, { RankingsFilterState } from "./RankingsFilters";
import RankingsList from "./RankingsList";
import RankingCard from "./RankingCard";
import { rankingsDummyData, currentUserProfile } from "@constants";

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
  };

  const sortedUsers = [...rankingsDummyData].sort((a, b) => {
    if (filters.sortBy === "winrate") return b.winRate - a.winRate;
    if (filters.sortBy === "tips") return b.tipsCount - a.tipsCount;
    return a.rank - b.rank;
  });

  return (
    <div className="w-full mx-auto min-h-[50vh] pb-20 md:pb-24">
      <RankingsHeader />
      <div className="max-w-8xl mx-auto mt-2 px-2">
        <RankingsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        <div className="p-4 bg-secondary">
          <RankingsList currentUser={currentUserProfile} users={sortedUsers} onFollowClick={handleFollowClick} />
        </div>
      </div>

      {/* Fixed current user bar */}
      <div className="fixed md:bottom-0 left-0 md:left-27.5 right-0 z-40 bg-secondary border-t border-primary/20" style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="bg-primary/10 w-full">
        <div className="max-w-8xl mx-auto px-6">
          <RankingCard
            user={currentUserProfile}
            currentUser={currentUserProfile}
            onFollowClick={handleFollowClick}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
