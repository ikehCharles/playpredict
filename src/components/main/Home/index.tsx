import { useState } from "react";
import { XSlidingButtons } from "../../utilities";
import HomeFilters, { Filter } from "./Filters";
import { buttonListDummyData } from "@/src/constants/dummyData";
import Predictions from "./Predictions";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState(buttonListDummyData[0])
  const [buttonList] = useState(buttonListDummyData)
  const onFilterChange = (filter: Filter) => {
    console.log(filter);
  };

  return (
    <div className=" w-full  mx-auto">
      <div className="sticky top-16 border-t border-tertiary/5 z-50 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <HomeFilters onFilterChange={onFilterChange} />
        </div>
      </div>
      <div className="py-2 max-w-7xl mx-auto lg:px-8">
        <XSlidingButtons buttonList={buttonList} selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Predictions />
      </div>


    </div>
  );
}
