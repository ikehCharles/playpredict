"use client";

import { PredictionCard, type PredictionCardProps } from "@utilities";
import { predictionsDummyData } from "@constants";

const likedPredictions: PredictionCardProps[] = predictionsDummyData.map((item) => ({
    ...item,
    isSaved: true,
}));

export default function ProfileLikes() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {likedPredictions.map((item, index) => (
                <PredictionCard key={index} {...item} />
            ))}
        </div>
    );
}
