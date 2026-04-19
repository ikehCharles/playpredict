"use client";

import { useState } from "react";
import { PageHeader } from "@common";
import { Icon } from "@utilities";
import Flow1 from "./Flow1";
import Flow2 from "./Flow2";
import Flow3 from "./Flow3";
import type { Fixture } from "./Flow2";
import SelectedPrediction from "./SelectedPrediction";

export default function Predict() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);

  const isFlow2 = Boolean(selectedLeague);
  const isFlow3 = Boolean(selectedFixture);

  const handleBack = () => {
    if (isFlow3) {
      setSelectedFixture(null);
      return;
    }

    setSelectedLeague(null);
  };

  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        title="Predict"
        leftContent={
          isFlow2 ? (
            <button
              type="button"
              aria-label="Back to leagues"
              onClick={handleBack}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary"
            >
              <Icon icon="fi fi-rr-arrow-small-left" className="text-xl" />
            </button>
          ) : undefined
        }
      />
      <div className="max-w-8xl mx-auto">
        {isFlow3 ? (
          <Flow3
            fixture={selectedFixture as Fixture}
            selectedLeague={selectedLeague ?? "England / Premier League"}
          />
        ) : isFlow2 ? (
          <Flow2
            selectedLeague={selectedLeague ?? "England / Premier League"}
            onFixtureSelect={setSelectedFixture}
          />
        ) : (
          <Flow1 onLeagueSelect={setSelectedLeague} />
        )}
      </div>
      <div className="fixed z-30 md:hidden px-2" style={{ bottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}>
        <SelectedPrediction />
      </div>
    </div>
  );
}
