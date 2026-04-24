"use client";

import { useMemo, useState } from "react";
import type { DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker2 } from "@utilities";
import { OddButton } from "@common";

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

function fromFixtureDate(date: string): Dayjs {
    const [day, month, year] = date.split("/").map(Number);
    return dayjs(new Date(year, month - 1, day));
}


function FixtureCard({ fixture, onFixtureSelect }: { fixture: Fixture; onFixtureSelect: (f: Fixture) => void }) {
    const [selected, setSelected] = useState<string | null>(null);

    const toggle = (key: string) => setSelected(prev => prev === key ? null : key);

    return (
        <article className="rounded-2xl bg-secondary p-3 shadow-small">
            <div className="mb-3 flex items-center justify-between border-b border-tertiary/10 pb-2 text-xs text-tertiary/70">
                <span className="line-clamp-1 font-medium">⚽ {fixture.leaguePath}</span>
                <span className="font-semibold">{fixture.kickoffTime}</span>
            </div>

            <div onClick={() => onFixtureSelect(fixture)} className="mb-3 flex items-center justify-center gap-2 font-medium text-tertiary">
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

export default function Flow2({ selectedLeague, onFixtureSelect }: Flow2Props) {
    const [activeMarket, setActiveMarket] = useState(marketTabs[0]);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
        fixtures.length ? fromFixtureDate(fixtures[0].date) : dayjs()
    );

    const selectedDateKey = selectedDate.format("DD/MM/YYYY");

    const selectedDateFixtures = useMemo(
        () => fixtures.filter((fixture) => fixture.date === selectedDateKey),
        [selectedDateKey]
    );

    const handleDateChange: DatePickerProps["onChange"] = (value) => {
        if (!value) {
            return;
        }
        setSelectedDate(value as Dayjs);
    };

    return (
        <div className="mx-auto w-full max-w-8xl bg-background ">
            <div className="">
                <div className="flex items-center justify-between bg-secondary px-3 py-3 border-b border-tertiary/10">
                    <div className="flex items-center gap-2 text-sm font-medium text-tertiary">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">⚽</span>
                        <span>{selectedLeague}</span>
                    </div>
                    <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-background px-2 py-1 text-xs text-tertiary/80">
                        4
                    </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto bg-secondary p-2 border-b border-tertiary/10">
                    {marketTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
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
                <div className="mb-4 shadow-sm font-medium shadow-tertiary/5">
                    <DatePicker2 value={selectedDate} onChange={handleDateChange} />
                </div>


                <div className="space-y-3 px-2 pt-1">
                    {selectedDateFixtures.length === 0 ? (
                        <div className="rounded-2xl bg-secondary p-4 text-center text-sm text-tertiary/70">
                            No fixtures available for this date.
                        </div>
                    ) : (
                        selectedDateFixtures.map((fixture) => (
                            <FixtureCard key={fixture.id} fixture={fixture} onFixtureSelect={onFixtureSelect} />
                        ))
                    )}
                </div>
            </div>

           
        </div>
    );
}
