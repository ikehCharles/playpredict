"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { OddButton } from "@common";
import { useInfiniteGames } from "@api";
import type { Game } from "@models";

type Flow2Props = {
    selectedLeague: string;
    tournamentId?: number;
    onFixtureSelect: (fixture: Fixture) => void;
};

export type Fixture = {
    id: string;
    leaguePath: string;
    kickoffTime: string;
    home: string;
    away: string;
    odds: {
        w1: number;
        x: number;
        w2: number;
    };
    date: string;
};

const marketTabs = ["1X2", "DC", "O/U", "BTTS", "Home O/U", "Away O/U", "1st Half 1X2", "1st Half DC", "1st Half O/U"];

function TeamBadge({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
            {initials}
        </span>
    );
}

function gameToFixture(game: Game, leaguePath: string): Fixture {
    const start = dayjs(game.startTime);
    return {
        id: String(game.fixtureId ?? game._id),
        leaguePath,
        kickoffTime: start.isValid() ? start.format("hh:mm A") : "",
        home: game.homeTeam?.name ?? "Home",
        away: game.awayTeam?.name ?? "Away",
        odds: {
            w1: game.odds?.w1 ?? 0,
            x: game.odds?.x ?? 0,
            w2: game.odds?.w2 ?? 0,
        },
        date: start.isValid() ? start.format("DD/MM/YYYY") : "",
    };
}

function FixtureCard({ fixture, onFixtureSelect }: { fixture: Fixture; onFixtureSelect: (f: Fixture) => void }) {
    const [selected, setSelected] = useState<string | null>(null);
    const toggle = (key: string) => setSelected((prev) => (prev === key ? null : key));

    return (
        <article className="rounded-xl bg-secondary p-3 shadow-small">
            <div className="mb-3 flex items-center justify-between border-b border-tertiary/10 pb-2 text-xs text-tertiary/70">
                <span className="line-clamp-1 font-medium">⚽ {fixture.leaguePath}</span>
                <span className="font-semibold">{fixture.kickoffTime}</span>
            </div>

            <div onClick={() => onFixtureSelect(fixture)} className="mb-3 cursor-pointer flex items-center justify-center gap-2 font-medium text-tertiary">
                <span className="inline-flex items-center gap-2">
                    <span>{fixture.home}</span>
                    <TeamBadge name={fixture.home} />
                </span>
                <span>-</span>
                <span className="inline-flex items-center gap-2">
                    <TeamBadge name={fixture.away} />
                    <span>{fixture.away}</span>
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <OddButton label="W1" odd={fixture.odds.w1} highlighted={selected === "w1"} onClick={() => toggle("w1")} />
                <OddButton label="X" odd={fixture.odds.x} highlighted={selected === "x"} onClick={() => toggle("x")} />
                <OddButton label="W2" odd={fixture.odds.w2} highlighted={selected === "w2"} onClick={() => toggle("w2")} />
            </div>
        </article>
    );
}

export default function Flow2({ selectedLeague, tournamentId, onFixtureSelect }: Flow2Props) {
    const [activeMarket, setActiveMarket] = useState(marketTabs[0]);

    const gamesQuery = useInfiniteGames(tournamentId);

    const allGames = useMemo(
        () => gamesQuery.data?.pages.flatMap((p) => p.data) ?? [],
        [gamesQuery.data],
    );
    const fixtures = useMemo(
        () => allGames.map((g) => gameToFixture(g, selectedLeague)),
        [allGames, selectedLeague],
    );
    const total = gamesQuery.data?.pages[0]?.total ?? 0;

    const groupedByDate = useMemo(() => {
        const map = new Map<string, Fixture[]>();
        for (const f of fixtures) {
            const key = f.date || "Unknown";
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(f);
        }
        return Array.from(map.entries()).map(([date, items]) => ({ date, items }));
    }, [fixtures]);

    // Infinite scroll — when the sentinel scrolls into view, request the next page.
    const sentinelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0]?.isIntersecting &&
                    gamesQuery.hasNextPage &&
                    !gamesQuery.isFetchingNextPage
                ) {
                    gamesQuery.fetchNextPage();
                }
            },
            { rootMargin: "200px 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [gamesQuery]);

    return (
        <div className="mx-auto w-full max-w-8xl bg-background">
            <div className="sticky z-20 bg-secondary shadow-sm top-[calc(4rem+env(safe-area-inset-top,0px))] md:top-0">
                <div className="flex items-center justify-between px-3 py-3 border-b border-tertiary/10">
                    <div className="flex items-center gap-2 text-sm font-medium text-tertiary">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">⚽</span>
                        <span>{selectedLeague}</span>
                    </div>
                    <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-background px-2 py-1 text-xs text-tertiary/80">
                        {total}
                    </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto p-2 border-b border-tertiary/10">
                    {marketTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
                                activeMarket === tab ? "bg-primary/10 text-primary" : "text-tertiary/80"
                            }`}
                            onClick={() => setActiveMarket(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-2 pt-2 pb-6 space-y-1">
                {tournamentId === undefined ? (
                    <div className="py-12 text-center text-sm text-tertiary/60">
                        No tournament selected.
                    </div>
                ) : gamesQuery.isLoading ? (
                    <div className="space-y-3 pt-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-28 rounded-xl bg-tertiary/5 animate-pulse" />
                        ))}
                    </div>
                ) : gamesQuery.isError ? (
                    <div className="rounded-lg bg-error/10 border border-error/20 px-3 py-3 text-sm text-error">
                        Couldn&apos;t load fixtures: {gamesQuery.error.message}
                    </div>
                ) : fixtures.length === 0 ? (
                    <div className="py-12 text-center text-sm text-tertiary/60">
                        No fixtures for this competition.
                    </div>
                ) : (
                    <>
                        {groupedByDate.map(({ date, items }) => (
                            <div key={date}>
                                <div className="py-2 px-1 text-xs font-semibold text-tertiary/40">
                                    {date && dayjs(date, "DD/MM/YYYY").isValid()
                                        ? dayjs(date, "DD/MM/YYYY").format("dddd, D MMM YYYY")
                                        : date}
                                </div>
                                <div className="space-y-3">
                                    {items.map((fixture) => (
                                        <FixtureCard key={fixture.id} fixture={fixture} onFixtureSelect={onFixtureSelect} />
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div ref={sentinelRef} className="h-10" />

                        {gamesQuery.isFetchingNextPage && (
                            <div className="py-4 text-center text-xs text-tertiary/60">
                                Loading more…
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
