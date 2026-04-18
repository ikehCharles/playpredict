"use client";

import { useState } from "react";
import { Icon } from "@utilities";
import type { Fixture } from "./Flow2";

type Flow3Props = {
    fixture: Fixture;
    selectedLeague: string;
};

type MarketSection = {
    id: string;
    title: string;
    expanded?: boolean;
    rows: Array<Array<{ label: string; odd: string; active?: boolean }>>;
};

const topTabs = ["Main", "Goals", "1st Half", "Double", "Corners", "Props", "Player", "More"];

const marketSections: MarketSection[] = [
    {
        id: "dc",
        title: "Double Chance",
        expanded: true,
        rows: [[
            { label: "1X", odd: "1.05", active: true },
            { label: "12", odd: "1.88" },
            { label: "X2", odd: "2.25" },
        ]],
    },
    {
        id: "goals-over-under",
        title: "Goals Over/Under",
        expanded: true,
        rows: [
            [
                { label: "Over 0.5", odd: "1.05" },
                { label: "Under 0.5", odd: "9.50" },
            ],
            [
                { label: "Over 1.5", odd: "1.35" },
                { label: "Under 1.5", odd: "4.24" },
            ],
            [
                { label: "Over 2.5", odd: "1.90" },
                { label: "Under 2.5", odd: "3.30" },
            ],
            [
                { label: "Over 3.5", odd: "3.55" },
                { label: "Under 3.5", odd: "2.25" },
            ],
        ],
    },
    {
        id: "home-over-under",
        title: "Home Over/Under",
        expanded: true,
        rows: [
            [
                { label: "Over 1", odd: "1.35" },
                { label: "Under 1", odd: "4.24" },
            ],
            [
                { label: "Over 2", odd: "1.90" },
                { label: "Under 2", odd: "3.30" },
            ],
            [
                { label: "Over 3", odd: "3.55" },
                { label: "Under 3", odd: "2.25" },
            ],
        ],
    },
    {
        id: "away-over-under",
        title: "Away Over/Under",
        expanded: true,
        rows: [
            [
                { label: "Over 1", odd: "1.05" },
                { label: "Under 1", odd: "9.50" },
            ],
            [
                { label: "Over 2", odd: "2.70" },
                { label: "Under 2", odd: "2.40" },
            ],
        ],
    },
    {
        id: "both-score",
        title: "Both Teams To Score",
        expanded: true,
        rows: [[
            { label: "Yes", odd: "2.15" },
            { label: "No", odd: "1.47" },
        ]],
    },
    {
        id: "corners",
        title: "Corners",
        expanded: true,
        rows: [
            [
                { label: "Over 8.5", odd: "1.40" },
                { label: "Under 8.5", odd: "2.80" },
            ],
            [
                { label: "Over 10.5", odd: "2.05" },
                { label: "Under 10.5", odd: "1.66" },
            ],
        ],
    },
    {
        id: "correct-score",
        title: "Correct Score",
        expanded: true,
        rows: [
            [
                { label: "1:0", odd: "7.20" },
                { label: "2:0", odd: "9.30" },
                { label: "3:0", odd: "15.0" },
            ],
            [
                { label: "2:1", odd: "4.35" },
                { label: "1:1", odd: "4.35" },
                { label: "0:1", odd: "4.60" },
            ],
        ],
    },
    {
        id: "half-time",
        title: "Half Time / Full Time",
        expanded: true,
        rows: [
            [
                { label: "1/1", odd: "1.70" },
                { label: "X/1", odd: "4.45" },
                { label: "1/X", odd: "4.05" },
            ],
            [
                { label: "X/1", odd: "3.41" },
                { label: "X/X", odd: "2.94" },
                { label: "1/2", odd: "7.2" },
            ],
        ],
    },
    {
        id: "cards",
        title: "Cards",
        expanded: true,
        rows: [[
            { label: "Odd", odd: "1.88" },
            { label: "Even", odd: "2.09" },
        ]],
    },
];

function TeamBadge({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {initials}
        </span>
    );
}

function MarketButton({ label, odd, active = false }: { label: string; odd: string; active?: boolean }) {
    return (
        <button
            type="button"
            className={`flex flex-1 items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold ${
                active ? "bg-primary text-secondary" : "bg-primary/5 text-primary"
            }`}
        >
            <span>{label}</span>
            <span>{odd}</span>
        </button>
    );
}

export default function Flow3({ fixture, selectedLeague }: Flow3Props) {
    const [activeTopTab, setActiveTopTab] = useState(topTabs[0]);

    return (
        <div className="mx-auto w-full max-w-8xl bg-background pb-24">
            <div className="space-y-3">
                <div className="rounded-xl bg-secondary px-3 py-3 shadow-small">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
                        <span>{selectedLeague}</span>
                        <span>/</span>
                        <span className="line-clamp-1">{fixture.home} vs {fixture.away}</span>
                    </div>

                    <div className="mb-2 flex items-center justify-between text-xs text-tertiary/70">
                        <span>Today</span>
                        <span>{fixture.kickoffTime}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 border-t border-tertiary/10 pt-3">
                        <div className="flex items-center gap-2 text-base font-semibold text-tertiary">
                            <TeamBadge name={fixture.home} />
                            <span>{fixture.home}</span>
                        </div>
                        <span className="text-xl text-tertiary">-</span>
                        <div className="flex items-center gap-2 text-base font-semibold text-tertiary">
                            <span>{fixture.away}</span>
                            <TeamBadge name={fixture.away} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto rounded-xl bg-secondary p-2 shadow-small">
                    {topTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTopTab(tab)}
                            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${
                                activeTopTab === tab ? "bg-primary text-secondary" : "bg-primary/5 text-primary"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-2">
                    {marketSections.map((section) => (
                        <section key={section.id} className="rounded-xl bg-secondary p-3 shadow-small">
                            <div className="mb-3 flex items-center justify-between border-b border-tertiary/10 pb-2">
                                <div className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary">
                                    <span>{section.title}</span>
                                    <Icon icon="fi fi-rr-info" className="text-xs text-tertiary/50" />
                                </div>
                                <Icon
                                    icon="fi fi-rr-angle-small-down"
                                    className={`text-base text-tertiary/60 ${section.expanded ? "" : "-rotate-90"}`}
                                />
                            </div>

                            {section.expanded ? (
                                <div className="space-y-2">
                                    {section.rows.map((row, index) => (
                                        <div
                                            key={`${section.id}-${index}`}
                                            className={`grid gap-2 ${row.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}
                                        >
                                            {row.map((item) => (
                                                <MarketButton
                                                    key={`${section.id}-${item.label}-${item.odd}`}
                                                    label={item.label}
                                                    odd={item.odd}
                                                    active={item.active}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </section>
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
