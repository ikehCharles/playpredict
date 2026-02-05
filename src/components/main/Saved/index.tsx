"use client";

import SavedHeader from "./SavedHeader";
import SavedPredictionsList from "./SavedPredictionsList";

export default function Saved() {
  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <SavedHeader />
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">
        <SavedPredictionsList />
      </div>
    </div>
  );
}
