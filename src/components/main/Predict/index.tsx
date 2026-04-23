"use client";

import { useMemo } from "react";
import { PageHeader } from "@common";
import Flow1 from "./Flow1";
import Flow2 from "./Flow2";
import Flow3 from "./Flow3";
import type { Fixture } from "./Flow2";
import SelectedPrediction from "./SelectedPrediction";
import Link from "next/link";
import { MdKeyboardBackspace } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Predict() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const leagueParam = searchParams.get("league");
  const fixtureParam = searchParams.get("fixture");

  const selectedLeague = leagueParam ?? null;
  const selectedFixture = useMemo(() => {
    if (!fixtureParam) {
      return null;
    }

    try {
      return JSON.parse(fixtureParam) as Fixture;
    } catch {
      return null;
    }
  }, [fixtureParam]);

  const buildHref = (league: string | null, fixture: Fixture | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (league) {
      params.set("league", league);
    } else {
      params.delete("league");
    }

    if (fixture) {
      params.set("fixture", JSON.stringify(fixture));
    } else {
      params.delete("fixture");
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const isFlow2 = Boolean(selectedLeague);
  const isFlow3 = Boolean(selectedLeague && selectedFixture);

  const backHref = isFlow3 ? buildHref(selectedLeague, null) : buildHref(null, null);

  const handleLeagueSelect = (league: string) => {
    router.push(buildHref(league, null));
  };

  const handleFixtureSelect = (fixture: Fixture) => {
    router.push(buildHref(selectedLeague, fixture));
  };

  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        noShadow={isFlow3}
        leftContent={
          isFlow2 ? (
            <Link
              href={backHref}
              className="px-1 pl-0 rounded-full hover:bg-tertiary/5 transition-colors"
              aria-label="Back to previous step"
            >
              <MdKeyboardBackspace className="w-6 h-6 text-primary" />
            </Link>
          )
            : undefined
        }
        title={isFlow3 ?
          <Link
            href={backHref}
            className="underline font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label="Back to previous step"
          >
            {selectedLeague}
          </Link>
          : "Predict"}
        rightContent={<MdKeyboardBackspace className="w-6 h-6 text-primary opacity-0" />}

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
            onFixtureSelect={handleFixtureSelect}
          />
        ) : (
          <Flow1 onLeagueSelect={handleLeagueSelect} />
        )}
      </div>
      <div
        className="fixed z-30 md:hidden px-2"
        style={{ bottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <SelectedPrediction />
      </div>
    </div>
  );
}
