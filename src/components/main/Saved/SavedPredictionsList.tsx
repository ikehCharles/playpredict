"use client";

import { PredictionCard, PredictionCardProps } from "@utilities";
import { savedPredictionsDummyData } from "@constants";

export default function SavedPredictionsList() {
  const predictions: PredictionCardProps[] = savedPredictionsDummyData;

  if (predictions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <p className="text-tertiary/70 text-center">
          You haven&apos;t saved any predictions yet.
        </p>
        <p className="text-tertiary/50 text-sm mt-1">
          Save tips from Home to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {predictions.map((item, index) => (
        <PredictionCard key={index} {...item} isSaved />
      ))}
    </div>
  );
}
