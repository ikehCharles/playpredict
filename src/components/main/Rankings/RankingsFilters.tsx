"use client";

import { Select } from "@utilities";
import { rankingsFilterOptions } from "@constants";

export interface RankingsFilterState {
  sport: string;
  timeframe: string;
  sortBy: string;
}

interface RankingsFiltersProps {
  filters: RankingsFilterState;
  onFilterChange: (filters: RankingsFilterState) => void;
  onClearFilters: () => void;
}

export default function RankingsFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: RankingsFiltersProps) {
  const hasActiveFilters =
    filters.sport !== "all" ||
    filters.timeframe !== "all-time" ||
    filters.sortBy !== "tips";

  return (
    <div className="bg-secondary rounded-xl p-4 border border-tertiary/10">
      {/* Filter dropdowns */}
      <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide pb-1">
        <Select
          value={filters.sport}
          onChange={(value) => onFilterChange({ ...filters, sport: value })}
          options={rankingsFilterOptions.sports}
          style={{ minWidth: 120 }}
          variant="outlined"
          className="shrink-0"
        />
        <Select
          value={filters.timeframe}
          onChange={(value) => onFilterChange({ ...filters, timeframe: value })}
          options={rankingsFilterOptions.timeframe}
          style={{ minWidth: 120 }}
          variant="outlined"
          className="shrink-0"
        />
        <Select
          value={filters.sortBy}
          onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
          options={rankingsFilterOptions.sortBy}
          style={{ minWidth: 120 }}
          variant="outlined"
          className="shrink-0"
        />
      </div>

      {/* Clear filters */}
      <div className="flex justify-end mt-2">
        <button
          onClick={onClearFilters}
          className="text-sm text-primary underline font-medium hover:underline"
        >
          Clear filters
        </button>
      </div>

      {/* Info text */}
      <p className="text-sm text-tertiary/60 mt-4 text-center">
        Only verified tipster will appear on the leaderboard
      </p>
    </div>
  );
}
