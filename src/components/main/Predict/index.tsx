"use client";

import { useMemo } from "react";
import { PageHeader } from "@common";
import { Button, Drawer } from "@utilities";
import Flow1 from "./Flow1";
import Flow2 from "./Flow2";
import Flow3 from "./Flow3";
import type { Fixture } from "./Flow2";
import SelectedPrediction from "./SelectedPrediction";
import Link from "next/link";
import { MdKeyboardBackspace, MdOutlineCancel } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

export default function Predict({ drawerMode }: { drawerMode?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedLeague = searchParams.get("league");
  const selectedFixture = useMemo(() => {
    const param = searchParams.get("fixture");
    if (!param) return null;
    try { return JSON.parse(param) as Fixture; } catch { return null; }
  }, [searchParams]);

  const isFlow2 = Boolean(selectedLeague);
  const isFlow3 = Boolean(selectedLeague && selectedFixture);

  const buildHref = (league: string | null, fixture: Fixture | null) => {
    const params = new URLSearchParams();
    if (league) params.set("league", league);
    if (fixture) params.set("fixture", JSON.stringify(fixture));
    const query = params.toString();
    return query ? `/predict?${query}` : "/predict";
  };

  const backHref = isFlow3 ? buildHref(selectedLeague, null) : "/predict";

  const handleLeagueSelect = (league: string) => router.push(buildHref(league, null));
  const handleFixtureSelect = (fixture: Fixture) => router.push(buildHref(selectedLeague, fixture));
  const handleClose = () => router.push("/");
  const handleBack = () => router.push(backHref);

  const flows = isFlow3 ? (
    <Flow3 fixture={selectedFixture as Fixture} selectedLeague={selectedLeague ?? ""} />
  ) : isFlow2 ? (
    <Flow2 selectedLeague={selectedLeague ?? ""} onFixtureSelect={handleFixtureSelect} />
  ) : (
    <Flow1 onLeagueSelect={handleLeagueSelect} />
  );

  if (drawerMode) {
    const drawerTitle = (
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          {isFlow2 && (
            <MdKeyboardBackspace  onClick={handleBack} className="w-5 h-5 text-primary" />
          )}
          <span className="text-[16px] font-bold text-tertiary">
           Predict
          </span>
        </div>
        <Button
          onClick={handleClose}
          bgColor="error"
          bgColorOpacity={0.05}
          borderColorOpacity={0}
          textColor="error"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <MdOutlineCancel className="w-4 h-4" />
            Close
          </span>
        </Button>
      </div>
    );

    return (
      <Drawer
        title={drawerTitle}
        placement="right"
        closable={false}
        maskClosable={false}
        mask={true}
        onClose={handleClose}
        open
        styles={{ wrapper: { width: 440 }, body: { padding: 0 }, header: { background: 'var(--color-secondary)' } }}
      >
        {flows}
        <div className="fixed z-30 hidden md:block px-2" style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}>
        <SelectedPrediction />
      </div>
      </Drawer>
    );
  }

  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        noShadow={isFlow3}
        leftContent={
          isFlow2 ? (
            <Link href={backHref} className="px-1 pl-0 rounded-full hover:bg-tertiary/5 transition-colors" aria-label="Back">
              <MdKeyboardBackspace className="w-6 h-6 text-primary" />
            </Link>
          ) : undefined
        }
        title={
          isFlow3 ? (
            <Link href={backHref} className="underline font-medium text-primary hover:text-primary/80 transition-colors">
              {selectedLeague}
            </Link>
          ) : "Predict"
        }
        rightContent={<MdKeyboardBackspace className="w-6 h-6 text-primary opacity-0" />}
      />
      <div className="max-w-8xl mx-auto">{flows}</div>
      <div className="fixed z-30 md:hidden px-2" style={{ bottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }}>
        <SelectedPrediction />
      </div>
    </div>
  );
}
