"use client";

import { useMemo, useState } from "react";
import { Icon } from "@utilities";

type Flow2Props = {
    selectedLeague: string;
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

const marketTabs = ["1X2", "DC", "O/U", "BTTS", "Home O/U"];

const fixtures: Fixture[] = [
    { id: "1", leaguePath: "Football / England / Premier League", kickoffTime: "02:00 PM", home: "Man. City", away: "Man. United", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "17/12/2025" },
    { id: "2", leaguePath: "Football / England / Premier League", kickoffTime: "04:30 PM", home: "Everton", away: "Brentford", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "17/12/2025" },
    { id: "3", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Wolves", away: "West Ham", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "17/12/2025" },
    { id: "4", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Chelsea", away: "Liverpool", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "18/12/2025" },
    { id: "5", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Arsenal", away: "Tottenham", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "18/12/2025" },
    { id: "6", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Brighton", away: "Crystal Palace", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "18/12/2025" },
    { id: "7", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Newcastle", away: "Bournemouth", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "18/12/2025" },
    { id: "8", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Leeds", away: "Fulham", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "18/12/2025" },
    { id: "9", leaguePath: "Football / England / Premier League", kickoffTime: "06:00 PM", home: "Burnley", away: "Sunderland", odds: { w1: 1.25, x: 2.45, w2: 4.56 }, date: "18/12/2025" },
];

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

function DateDivider({ date }: { date: string }) {
    return (
        <div className="flex items-center gap-3 text-sm font-semibold text-tertiary/75">
            <span className="h-px flex-1 bg-tertiary/15" />
            <span className="inline-flex items-center gap-2">
                <Icon icon="fi fi-rr-calendar" className="text-sm text-tertiary/70" />
                {date}
            </span>
            <span className="h-px flex-1 bg-tertiary/15" />
        </div>
    );
}

function OddButton({
    label,
    odd,
    highlighted = false,
    onClick,
}: {
    label: string;
    odd: number;
    highlighted?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className={`flex flex-1 items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold ${
                highlighted
                    ? "bg-primary text-secondary"
                    : "bg-primary/5 text-primary"
            }`}
            onClick={onClick}
        >
            <span>{label}</span>
            <span>{odd.toFixed(2)}</span>
        </button>
    );
}

export default function Flow2({ selectedLeague, onFixtureSelect }: Flow2Props) {
    const [activeMarket, setActiveMarket] = useState(marketTabs[0]);

    const groupedFixtures = useMemo(() => {
        return fixtures.reduce<Record<string, Fixture[]>>((acc, fixture) => {
            if (!acc[fixture.date]) {
                acc[fixture.date] = [];
            }
            acc[fixture.date].push(fixture);
            return acc;
        }, {});
    }, []);

    return (
        <div className="mx-auto w-full max-w-8xl bg-background ">
            <div className="">
                <div className="flex items-center justify-between bg-secondary px-3 py-3 shadow-small">
                    <div className="flex items-center gap-2 text-sm font-medium text-tertiary">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">⚽</span>
                        <span>{selectedLeague}</span>
                    </div>
                    <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-background px-2 py-1 text-xs font-bold text-tertiary/80">
                        4
                    </span>
                </div>

                <div className="flex items-center gap-2 mb-4 overflow-x-auto bg-secondary p-2 shadow-small">
                    {marketTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                activeMarket === tab
                                    ? "bg-primary/10 text-primary"
                                    : "text-tertiary/80"
                            }`}
                            onClick={() => setActiveMarket(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-3 pt-1">
                    {Object.entries(groupedFixtures).map(([date, dateFixtures]) => (
                        <div key={date} className="space-y-3">
                            <DateDivider date={date} />
                            {dateFixtures.map((fixture) => (
                                <article
                                    key={fixture.id}
                                    className="rounded-2xl bg-secondary p-3 shadow-small"
                                    onClick={() => onFixtureSelect(fixture)}
                                >
                                    <div className="mb-3 flex items-center justify-between border-b border-tertiary/10 pb-2 text-xs text-tertiary/70">
                                        <span className="line-clamp-1 font-medium">⚽ {fixture.leaguePath}</span>
                                        <span className="font-semibold">{fixture.kickoffTime}</span>
                                    </div>

                                    <div className="mb-3 flex items-center justify-center gap-2 text-[26px] font-medium text-tertiary">
                                        <span className="inline-flex items-center gap-2">
                                            <span className="text-xl">{fixture.home}</span>
                                            <TeamBadge name={fixture.home} />
                                        </span>
                                        <span className="text-xl">-</span>
                                        <span className="inline-flex items-center gap-2">
                                            <TeamBadge name={fixture.away} />
                                            <span className="text-xl">{fixture.away}</span>
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <OddButton label="W1" odd={fixture.odds.w1} highlighted={fixture.id === "1"} onClick={() => onFixtureSelect(fixture)} />
                                        <OddButton label="X" odd={fixture.odds.x} onClick={() => onFixtureSelect(fixture)} />
                                        <OddButton label="W2" odd={fixture.odds.w2} onClick={() => onFixtureSelect(fixture)} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed inset-x-2 bottom-20 z-30 md:hidden">
                <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-2xl bg-[#180533] px-3 py-3 text-secondary shadow-lg"
                >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-lg font-bold">
                        4
                    </span>
                    <span className="line-clamp-2 flex-1 text-left text-sm font-semibold">
                        Lens v PSG - 1X; Sinner, Jannick v Medvedev, Danil - 1st set winner
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xl font-bold text-primary">
                        20.53
                    </span>
                </button>
            </div>
        </div>
    );
}
