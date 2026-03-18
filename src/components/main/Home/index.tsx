"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { XSlidingButtons } from "@utilities";
import HomeFilters, { Filter } from "./Filters";
import { buttonListDummyData } from "@constants";
import Predictions from "./Predictions";
import { PageHeader } from "@common";

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
      {/* Header */}
      <PageHeader
        leftContent={
          <>
            <h1 className="text-md hidden lg:flex font-bold text-tertiary flex-1 min-w-0 truncate">
              Home
            </h1>

            <Link href="/" className="flex lg:hidden items-center gap-2 flex-1">
              <Image
                src="/icons/PlayPredictLogoBlue.svg"
                alt="PlayPredict"
                width={120}
                height={34}
                priority
              />
            </Link>
          </>
        }
        isAuthenticated={false} />


      {/* Sticky Filter Bar */}
      <div className="sticky lg:px-2 border-t border-tertiary/5 z-40" style={{ top: 'calc(3.5rem + env(safe-area-inset-top, 0px))' }}>
        <div className="max-w-8xl mx-auto p-2 lg:rounded-xl  bg-secondary">
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
      <div className="py-2 max-w-8xl mx-auto ">
        <XSlidingButtons
          buttonList={buttonList}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </div>

      {/* Predictions List */}
      <div className="max-w-8xl mx-auto px-2 ">
        <Predictions />
      </div>
    </div>
  );
}
