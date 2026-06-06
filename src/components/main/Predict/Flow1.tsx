"use client";

import { useMemo, useState } from "react";
import { Collapsible, Icon, Input, XSlidingButtons } from "@playpredict/ui";
import { IdNameIconType, Sport, Tournament } from "@/src/models";
import { IoSearch } from "react-icons/io5";
import { useSports, useTournaments } from "@api";

// Maps API sport slugs to flat-icon classes. Anything not listed falls back to a trophy.
const SPORT_ICON_BY_SLUG: Record<string, string> = {
    soccer: "fi fi-sr-football",
    basketball: "fi fi-sr-basketball",
    tennis: "fi fi-sr-tennis",
    "american-football": "fi fi-sr-rugby",
    baseball: "fi fi-sr-baseball",
    darts: "fi fi-sr-bullseye-pointer",
    boxing: "fi fi-sr-boxing-glove",
    mma: "fi fi-sr-boxing-glove",
    "esport-counter-strike": "fi fi-sr-gamepad",
    "esport-league-of-legends": "fi fi-sr-gamepad",
};
const DEFAULT_SPORT_ICON = "fi fi-sr-trophy";

// Only sports with these slugs are shown in the picker. Display order follows this array.
const ALLOWED_SPORT_SLUGS = ["soccer", "basketball", "tennis", "american-football"];

// Short display names — the API's `sportName` is fine for most, but we shorten "American Football".
const SPORT_NAME_OVERRIDES: Record<string, string> = {
    "american-football": "Am. Football",
    soccer: "Football",
};

function sportToButton(sport: Sport): IdNameIconType {
    return {
        id: String(sport.sportId),
        name: SPORT_NAME_OVERRIDES[sport.slug] ?? sport.sportName,
        icon: SPORT_ICON_BY_SLUG[sport.slug] ?? DEFAULT_SPORT_ICON,
    };
}

function CountPill({ value }: { value: number }) {
    return (
        <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-background px-2 py-1 text-xs font-bold text-tertiary/80">
            {value}
        </span>
    );
}

type Flow1Props = {
    onLeagueSelect: (league: string, tournamentId: number) => void;
};

export default function Flow1({ onLeagueSelect }: Flow1Props) {
    const sportsQuery = useSports();
    const sportButtons = useMemo(() => {
        const bySlug = new Map((sportsQuery.data ?? []).map((s) => [s.slug, s]));
        return ALLOWED_SPORT_SLUGS
            .map((slug) => bySlug.get(slug))
            .filter((s): s is Sport => !!s)
            .map(sportToButton);
    }, [sportsQuery.data]);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    // Default to the first sport until the user picks one.
    const selectedButton =
        sportButtons.find((b) => b.id === selectedId) ?? sportButtons[0];
    const handleSelect = (button: IdNameIconType) => setSelectedId(button.id);

    const selectedSportId = selectedButton ? Number(selectedButton.id) : undefined;
    const tournamentsQuery = useTournaments(selectedSportId);

    const filteredTournaments = useMemo(() => {
        const list = tournamentsQuery.data ?? [];
        if (!search) return list;
        const q = search.toLowerCase();
        return list.filter(
            (t) =>
                t.name.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q),
        );
    }, [tournamentsQuery.data, search]);

    // "Popular" — lowest tournamentIds first (older entries tend to be top-flight competitions).
    const popular = useMemo(
        () => [...filteredTournaments].sort((a, b) => a.tournamentId - b.tournamentId).slice(0, 6),
        [filteredTournaments],
    );

    const byCountryGroups = useMemo(() => {
        const groups = new Map<string, Tournament[]>();
        for (const t of filteredTournaments) {
            const key = t.category || "Other";
            const arr = groups.get(key) ?? [];
            arr.push(t);
            groups.set(key, arr);
        }
        return [...groups.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([country, tournaments]) => ({
                key: country,
                country,
                count: tournaments.length,
                tournaments: tournaments.sort((a, b) => a.name.localeCompare(b.name)),
            }));
    }, [filteredTournaments]);

    const buildLeagueLabel = (country: string, tournamentName: string) =>
        `${country} / ${tournamentName}`;

    const collapsibleItems = byCountryGroups.map((group) => ({
        key: group.key,
        label: (
            <div className="flex w-full justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10" />
                    <span className="text-sm text-tertiary">{group.country}</span>
                </div>
                <CountPill value={group.count} />
            </div>
        ),
        children: (
            <ul className="list-none border-t border-tertiary/10">
                {group.tournaments.map((t) => (
                    <li
                        key={t._id}
                        className="border-b border-tertiary/10 last:border-b-0"
                    >
                        <button
                            type="button"
                            className="flex cursor-pointer w-full items-center gap-3 py-4 text-left"
                            onClick={() => onLeagueSelect(buildLeagueLabel(group.country, t.name), t.tournamentId)}
                        >
                            <span className="h-6 w-6 rounded-full bg-tertiary/10" />
                            <span className="text-sm text-tertiary">{t.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        ),
    }));

    return (
        <div className="mx-auto w-full px-2 max-w-8xl bg-background pb-24">
            <div className="space-y-2 mt-4">
                {sportsQuery.isLoading ? (
                    <div className="h-10 rounded-lg bg-tertiary/5 animate-pulse" />
                ) : sportsQuery.isError ? (
                    <div className="rounded-lg bg-error/10 border border-error/20 px-3 py-2 text-sm text-error">
                        Couldn&apos;t load sports: {sportsQuery.error.message}
                    </div>
                ) : (
                    selectedButton && (
                        <XSlidingButtons
                            buttonList={sportButtons}
                            selectedButton={selectedButton}
                            setSelectedButton={handleSelect}
                        />
                    )
                )}

                <Input
                    prefix={<IoSearch className="w-5 h-5" />}
                    placeholder="Search competitions"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {tournamentsQuery.isError && (
                    <div className="rounded-lg bg-error/10 border border-error/20 px-3 py-2 text-sm text-error">
                        Couldn&apos;t load tournaments: {tournamentsQuery.error.message}
                    </div>
                )}

                {tournamentsQuery.isLoading ? (
                    <div className="space-y-2 mt-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-12 rounded-xl bg-tertiary/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {popular.length > 0 && (
                            <section className="space-y-3 mt-3">
                                <h2 className="text-sm text-tertiary">Popular Competitions</h2>
                                <div className="space-y-2">
                                    {popular.map((t) => (
                                        <button
                                            key={t._id}
                                            type="button"
                                            className="flex cursor-pointer w-full items-center gap-3 rounded-xl shadow-sm shadow-tertiary/5 bg-secondary px-3 py-2 text-left"
                                            onClick={() => onLeagueSelect(buildLeagueLabel(t.category, t.name), t.tournamentId)}
                                        >
                                            <span className="h-7 w-7 rounded-full bg-primary/10" />
                                            <span className="flex-1 font-medium text-tertiary">{t.name}</span>
                                            <span className="text-xs text-tertiary/60">{t.category}</span>
                                            <Icon icon="fi fi-rr-angle-small-right" className="text-tertiary/60" />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {byCountryGroups.length > 0 ? (
                            <section className="space-y-3 mt-4">
                                <h2 className="text-sm text-tertiary">By Country (A-Z)</h2>
                                <div className="flex gap-3 flex-col">
                                    {collapsibleItems.map((item) => (
                                        <Collapsible
                                            className="shadow-xs"
                                            key={item.key}
                                            items={[item]}
                                        />
                                    ))}
                                </div>
                            </section>
                        ) : (
                            !tournamentsQuery.isLoading && (
                                <p className="text-sm text-tertiary/60 mt-6 text-center">
                                    No competitions for this sport yet.
                                </p>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
