"use client";

import { useState } from "react";
import RankingsFilters, { RankingsFilterState } from "./RankingsFilters";
import RankingsList from "./RankingsList";
import RankingCard from "./RankingCard";
import { rankingsDummyData, currentUserProfile } from "@constants";
import { PageHeader } from "@common";
import { Badge, Button, Icon, Input } from "@utilities";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const defaultFilters: RankingsFilterState = {
  sport: "all",
  timeframe: "all-time",
  sortBy: "tips",
};



export default function Rankings() {
  const [filters, setFilters] = useState<RankingsFilterState>(defaultFilters);
  const [search, setSearch] = useState("");

  const handleFilterChange = (newFilters: RankingsFilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const onFilterClick = () => {
    console.log("Filter button clicked");
  }


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
      <PageHeader title="Rankings" rightContent={<button className="bg-primary/5 p-3 rounded-xl text-primary">
        <Icon icon="fi fi-rr-info" />
      </button>} />
      <div className="max-w-8xl  pb-2 mx-auto mt-2 px-2">
        <div className="bg-secondary rounded-lg space-y-2 py-4 ">
          <div className="flex items-center px-2 gap-4 justify-between">
            <Input
              placeholder="Search following"
              prefix={<HiOutlineMagnifyingGlass className="w-5 h-5 text-tertiary/50" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Badge size="small" className="text-xs!" style={{ padding: ' 0 3px', fontSize: 10, fontWeight: 500 }} count={2} color="var(--color-error)" offset={[-11, 11]}>
              <Button
                bgColorOpacity={0.05}
                borderColorOpacity={0.05}
                textColor="primary"
                icon={
                  <Icon className="fi-rr-settings-sliders" />
                }

                onClick={onFilterClick}
                aria-label="Filter"
              />
            </Badge>
          </div>
          {/* <RankingsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        /> */}
          <div className="bg-secondary pb-10">
            <RankingsList currentUser={currentUserProfile} users={sortedUsers} onFollowClick={handleFollowClick} />
          </div>
        </div>
      </div>

      {/* Fixed current user bar */}
      <div className="fixed md:bottom-0 left-0 md:left-27.5 right-0 z-10 bg-secondary border-t border-primary/20" style={{ bottom: 'calc(3.6rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className=" bg-primary/5 w-full">
          <div className="max-w-8xl  mx-auto">
            <RankingCard
              user={currentUserProfile}
              onFollowClick={handleFollowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
