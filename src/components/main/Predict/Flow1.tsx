"use client";

import { useState } from "react";
import { Collapsible, Icon, Input, XSlidingButtons } from "@utilities";
import { IdNameIconType } from "@/src/models";
import { IoSearch } from "react-icons/io5";

type Competition = {
    name: string;
    count: number;
};

type CountryGroup = {
    id: number;
    country: string;
    count: number;
    leagues: string[];
};

const sports: IdNameIconType[] = [
    { id: '1', name: "Football", icon: "fi fi-rr-football" },
    { id: '2', name: "Basketball", icon: "fi fi-rr-basketball" },
    { id: '3', name: "Tennis", icon: "fi fi-rr-tennis" },
    { id: '4', name: "American Football", icon: "fi fi-rr-football-helmet" },
];

const popularCompetitions: Competition[] = [
    { name: "Premier League", count: 4 },
    { name: "Championship", count: 3 },
    { name: "Champions League", count: 3 },
    { name: "Europa League", count: 3 },
    { name: "Copa Libertadores", count: 1 },
    { name: "Brasileiro Serie A", count: 1 },
];

const countryGroups: CountryGroup[] = [
    { id: 1, country: "England", count: 8, leagues: ["Premier League", "Championship"] },
    { id: 2, country: "France", count: 8, leagues: ["Ligue 1"] },
    { id: 3, country: "Italy", count: 3, leagues: [] },
    { id: 4, country: "Germany", count: 3, leagues: [] },
    { id: 5, country: "Spain", count: 3, leagues: [] },
];

function CountPill({ value }: { value: number }) {
    return (
        <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-background px-2 py-1 text-xs font-bold text-tertiary/80">
            {value}
        </span>
    );
}

type Flow1Props = {
    onLeagueSelect: (league: string) => void;
};

export default function Flow1({ onLeagueSelect }: Flow1Props) {
    const [selectedButton, setSelectedButton] = useState(sports[0]);

    const byCountryGroups = countryGroups.map((group) => ({
        key: group.id,
        label: (
            <div className="flex w-full justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-tertiary/10" />
                <span className="text-sm text-tertiary">{group.country}</span>
                </div>
                <CountPill value={group.count} />
            </div>
        ),
        children: (
            <ul className={`list-none ${group.leagues.length > 0 ? "border-t border-tertiary/10" : ""}`}>
                {group.leagues.map((league, index) => (
                    <li
                        key={`${group.id}-${index}`}
                        className="border-b border-tertiary/10 last:border-b-0"
                    >
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 py-4 text-left"
                            onClick={() => onLeagueSelect(`${group.country} / ${league}`)}
                        >
                            <span className="h-6 w-6 rounded-full bg-tertiary/10" />
                            <span className="text-sm text-tertiary">{league}</span>
                        </button>
                    </li>
                ))}
            </ul>
        ),
    }));


    return (
        <div className="mx-auto w-full px-2 max-w-8xl bg-background pb-24">

            <div className="space-y-2 mt-4" >
                <XSlidingButtons
                    buttonList={sports}
                    selectedButton={selectedButton}
                    setSelectedButton={setSelectedButton}
                />


                <Input
                    prefix={<IoSearch className="w-5 h-5" />}
                    placeholder="Search competitions"

                />

                <section className="space-y-3 mt-3">
                    <h2 className="text-sm text-tertiary">Popular Competitions</h2>
                    <div className="space-y-2">
                        {popularCompetitions.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                className="flex w-full items-center gap-3 rounded-xl shadow-sm shadow-tertiary/5 bg-secondary px-3 py-2 text-left"
                                onClick={() => onLeagueSelect(`England / ${item.name}`)}
                            >
                                <span className="h-7 w-7 rounded-full bg-primary/10" />
                                <span className="flex-1  font-medium text-tertiary">{item.name}</span>
                                <CountPill value={item.count} />
                                <Icon icon="fi fi-rr-angle-small-right" className="text-tertiary/60" />
                            </button>
                        ))}
                    </div>
                </section>

                <section className="space-y-3 mt-4">
                    <h2 className="text-sm text-tertiary">By Country (A-Z)</h2>
                    <div className="flex gap-3 flex-col">
                        {byCountryGroups.map((group) => (
                            <Collapsible
                            className="shadow-xs"
                                key={group.key}
                                items={[{
                                    label:group.label,
                                    key:group.key,
                                    children: group.children
                                }]}
                            />
                        ))}

                    </div>
                </section>
            </div>

            <div className="fixed inset-x-2 bottom-25 z-30 md:hidden">
                <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-2xl bg-[#180533] px-3 py-3 text-secondary shadow-lg"
                >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-lg font-bold">
                        4
                    </span>
                    <span className="line-clamp-2 flex-1 text-left text-sm font-semibold">
                        Lens v PSG - 1X; Sinner v Medvedev - 1st set winner
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xl font-bold text-primary">
                        20.53
                    </span>
                </button>
            </div>
        </div>
    );
}

{/* {group.leagues.map((league) => (
                                        <button
                                            key={league}
                                            type="button"
                                            className="flex w-full items-center gap-3 border-b border-tertiary/10 py-4 text-left last:border-b-0"
                                        >
                                            <span className="h-6 w-6 rounded-full bg-tertiary/10" />
                                            <span className="text-sm text-tertiary">{league}</span>
                                        </button>
                                    ))} */}