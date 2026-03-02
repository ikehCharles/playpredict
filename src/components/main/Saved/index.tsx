"use client";

import SavedHeader from "./SavedHeader";
import SavedPredictionsList from "./SavedPredictionsList";

export default function Saved() {
  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <SavedHeader />
      <div className="max-w-8xl mx-auto px-2 py-4">
        <SavedPredictionsList />
      </div>
    </div>
  );
}
