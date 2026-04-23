import { Suspense } from "react";
import { Predict } from "@main";

export default function PredictPage() {
  return (
    <Suspense>
      <Predict />
    </Suspense>
  );
}
