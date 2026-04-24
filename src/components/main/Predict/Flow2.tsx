"use client";

import { useEffect, useRef, useState } from "react";
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

const marketTabs = ["1X2", "DC", "O/U", "BTTS", "Home O/U", "Away O/U", "1st Half 1X2", "1st Half DC", "1st Half O/U"];

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

const groupedByDate = (() => {
    const map = new Map<string, Fixture[]>();
    for (const f of fixtures) {
        if (!map.has(f.date)) map.set(f.date, []);
        map.get(f.date)!.push(f);
    }
    return Array.from(map.entries()).map(([date, items]) => ({ date, items }));
})();

export default function Flow2({ selectedLeague, onFixtureSelect }: Flow2Props) {
    const [activeMarket, setActiveMarket] = useState(marketTabs[0]);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
        fixtures.length ? fromFixtureDate(fixtures[0].date) : dayjs()
    );

    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
    const isScrollingRef = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return;
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    const date = (visible[0].target as HTMLElement).dataset.date;
                    if (date) {
                        setSelectedDate((prev) => {
                            const next = fromFixtureDate(date);
                            return prev.isSame(next, "day") ? prev : next;
                        });
                    }
                }
            },
            { rootMargin: "-180px 0px -50% 0px", threshold: 0 }
        );

        sectionRefs.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleDateChange: DatePickerProps["onChange"] = (value) => {
        if (!value) return;
        const d = value as Dayjs;
        setSelectedDate(d);
        const key = d.format("DD/MM/YYYY");
        const el = sectionRefs.current.get(key);
        if (el) {
            isScrollingRef.current = true;
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => { isScrollingRef.current = false; }, 800);
        }
    };

    return (
        <div className="mx-auto w-full max-w-8xl bg-background">
            <div className="fixed top-16 left-0 right-0 z-20 bg-secondary shadow-sm">
                <div className="flex items-center justify-between px-3 py-3 border-b border-tertiary/10">
                    <div className="flex items-center gap-2 text-sm font-medium text-tertiary">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">⚽</span>
                        <span>{selectedLeague}</span>
                    </div>
                    <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-background px-2 py-1 text-xs text-tertiary/80">
                        {fixtures.length}
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
                <div className="font-medium">
                    <DatePicker2 value={selectedDate} onChange={handleDateChange} />
                </div>
            </div>

            <div className="px-2 pt-37 pb-6 space-y-1">
                {groupedByDate.map(({ date, items }) => (
                    <div
                        key={date}
                        ref={(el) => {
                            if (el) sectionRefs.current.set(date, el);
                            else sectionRefs.current.delete(date);
                        }}
                        data-date={date}
                    >
                        <div className="py-2 px-1 text-xs font-semibold text-tertiary/40">
                            {fromFixtureDate(date).format("dddd, D MMM YYYY")}
                        </div>
                        <div className="space-y-3">
                            {items.map((fixture) => (
                                <FixtureCard key={fixture.id} fixture={fixture} onFixtureSelect={onFixtureSelect} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
