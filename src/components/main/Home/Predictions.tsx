"use client";

import { useState } from "react";
import { PredictionCard, PredictionCardProps } from "../../utilities";
import { predictionsDummyData } from "@/src/constants/dummyData";

export default function Predictions() {
  const [predictions] = useState<PredictionCardProps[]>(predictionsDummyData);

  return (
    <div className="space-y-4">
      {predictions.map((item, index) => (
        <PredictionCard key={index} {...item} />
      ))}
    </div>
  );
}
