"use client";

import { useState } from "react";
import { XSlidingButtons } from "@utilities";
import HomeFilters, { Filter } from "./Filters";
import { buttonListDummyData } from "@constants";
import Predictions from "./Predictions";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState(buttonListDummyData[0]);
  const [buttonList] = useState(buttonListDummyData);

  const onFilterChange = (filter: Filter) => {
    console.log("Filter changed:", filter);
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  return (
    <div className="w-full mx-auto">
      {/* Sticky Filter Bar */}
      <div className="sticky top-16 border-t border-tertiary/5 z-40 bg-secondary">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3">
          <HomeFilters
            onFilterChange={onFilterChange}
            onNotificationClick={handleNotificationClick}
            onSearchClick={handleSearchClick}
            onFilterClick={handleFilterClick}
            hasNotifications={true}
          />
        </div>
      </div>

      {/* Sports Category Tabs */}
      <div className="py-2 max-w-7xl mx-auto lg:px-8">
        <XSlidingButtons
          buttonList={buttonList}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </div>

      {/* Predictions List */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Predictions />
      </div>
    </div>
  );
}
