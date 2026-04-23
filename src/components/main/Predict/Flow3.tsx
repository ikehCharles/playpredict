"use client";

import { useState } from "react";
import { Button, Collapsible, Icon, Input } from "@utilities";
import type { Fixture } from "./Flow2";
import { HiOutlineMagnifyingGlass, HiOutlineInformationCircle } from "react-icons/hi2";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoInformation } from "react-icons/io5";

type Flow3Props = {
    fixture: Fixture;
    selectedLeague: string;
};

type Odd = {
    label: string;
    odd?: string;
    active?: boolean;
};

type MarketSection = {
    id: string;
    title: string;
    info?: boolean;
    initiallyExpanded?: boolean;
    cols: number;
    colHeaders?: string[];
    rows: Odd[];
    showMoreAt?: number;
};

const topTabs = ["Popular", "Goals", "Half", "Bookings", "Corners", "Specials", "Players", "Minutes"];

const marketSections: MarketSection[] = [
    {
        id: "dc",
        title: "Double Chance",
        initiallyExpanded: true,
        info: true,
        cols: 3,
        rows: [
            { label: "1X", odd: "1.25", active: true },
            { label: "12", odd: "2.45" },
            { label: "X2", odd: "4.56" },
        ],
    },
    {
        id: "goals-ou",
        title: "Goals Over/Under",
        initiallyExpanded: true,
        info: true,
        cols: 2,
        showMoreAt: 4,
        rows: [
            { label: "Over 0.5", odd: "1.09" }, { label: "Under 0.5", odd: "8.20" },
            { label: "Over 1.5", odd: "1.28" }, { label: "Under 1.5", odd: "4.60" },
            { label: "Over 2.5", odd: "1.85" }, { label: "Under 2.5", odd: "2.30" },
            { label: "Over 3.5", odd: "2.90" }, { label: "Under 3.5", odd: "1.70" },
            { label: "Over 4.5", odd: "4.70" }, { label: "Under 4.5", odd: "1.26" },
            { label: "Over 5.5", odd: "8.20" }, { label: "Under 5.5", odd: "1.08" },
        ],
    },
    {
        id: "home-ou",
        title: "Home Over/Under",
        initiallyExpanded: true,
        info: true,
        cols: 2,
        showMoreAt: 4,
        rows: [
            { label: "Over 0.5", odd: "1.20" }, { label: "Under 0.5", odd: "3.00" },
            { label: "Over 1.5", odd: "1.88" }, { label: "Under 1.5", odd: "1.90" },
            { label: "Over 2.5", odd: "3.10" }, { label: "Under 2.5", odd: "1.28" },
            { label: "Over 3.5", odd: "8.50" }, { label: "Under 3.5", odd: "1.06" },
        ],
    },
    {
        id: "away-ou",
        title: "Away Over/Under",
        initiallyExpanded: true,
        info: true,
        cols: 2,
        showMoreAt: 4,
        rows: [
            { label: "Over 0.5", odd: "1.40" }, { label: "Under 0.5", odd: "2.55" },
            { label: "Over 1.5", odd: "2.80" }, { label: "Under 1.5", odd: "1.37" },
            { label: "Over 2.5", odd: "5.40" }, { label: "Under 2.5", odd: "1.15" },
            { label: "Over 3.5", odd: "13.0" }, { label: "Under 3.5", odd: "1.02" },
        ],
    },
    {
        id: "handicap",
        title: "Handicap",
        info: true,
        initiallyExpanded: true,
        cols: 3,
        colHeaders: ["Home", "Draw", "Away"],
        showMoreAt: 4,
        rows: [
            { label: "-1", odd: "5.40" }, { label: "-1", odd: "21.0" }, { label: "-1", odd: "1.70" },
            { label: "-0.5", odd: "3.60" }, { label: "-0.5", odd: "13.0" }, { label: "-0.5", odd: "2.25" },
            { label: "0", odd: "2.30" }, { label: "0", odd: "9.40" }, { label: "0", odd: "3.20" },
            { label: "+0.5", odd: "1.50" }, { label: "+0.5", odd: "6.60" }, { label: "+0.5", odd: "5.40" },
            { label: "+1", odd: "1.14" }, { label: "+1", odd: "6.00" }, { label: "+1", odd: "9.50" },
            { label: "+1.5", odd: "1.07" }, { label: "+1.5", odd: "5.00" }, { label: "+1.5", odd: "12.0" },
        ],
    },
    {
        id: "asian-hc",
        title: "Asian Handicap",
        initiallyExpanded: true,
        cols: 2,
        info: true,
        colHeaders: ["Home", "Away"],
        showMoreAt: 4,
        rows: [
            { label: "-1.5", odd: "3.80" }, { label: "+1.5", odd: "1.30" },
            { label: "-1.25", odd: "3.20" }, { label: "+1.25", odd: "1.38" },
            { label: "-1", odd: "2.90" }, { label: "+1", odd: "1.45" },
            { label: "-0.75", odd: "2.50" }, { label: "+0.75", odd: "1.55" },
            { label: "-0.5", odd: "2.10" }, { label: "+0.5", odd: "1.77" },
            { label: "-0.25", odd: "1.95" }, { label: "+0.25", odd: "1.90" },
            { label: "0", odd: "1.80" }, { label: "0", odd: "2.00" },
        ],
    },
    {
        id: "btts",
        title: "Both Teams To Score",
        initiallyExpanded: true,
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "1.81" }, { label: "No", odd: "1.95" }],
    },
    {
        id: "btts-2",
        title: "Both Teams To Score 2+",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "3.50" }, { label: "No", odd: "1.30" }],
    },
    {
        id: "any-team-2-row",
        title: "Any Team to Score 2 or More Goals in a Row",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "2.18" }, { label: "No", odd: "1.57" }],
    },
    {
        id: "any-team-5-row",
        title: "Any Team to Score 5 or More Goals in a Row",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "5.00" }, { label: "No", odd: "1.15" }],
    },
    {
        id: "home-team-2-row",
        title: "Home Team to Score 2 or More Goals in a Row",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "2.40" }, { label: "No", odd: "1.50" }],
    },
    {
        id: "home-team-3-row",
        title: "Home Team to Score 3 or More Goals in a Row",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "3.80" }, { label: "No", odd: "1.25" }],
    },
    {
        id: "away-team-2-row",
        title: "Away Team to Score 2 or More Goals in a Row",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "2.12" }, { label: "No", odd: "1.62" }],
    },
    {
        id: "away-team-3-row",
        title: "Away Team to Score 3 or More Goals in a Row",
        info: true,
        cols: 2,
        rows: [{ label: "Yes", odd: "4.20" }, { label: "No", odd: "1.20" }],
    },
    {
        id: "correct-score",
        title: "Correct Score",
        initiallyExpanded: true,
        cols: 4,
        showMoreAt: 3,
        rows: [
            { label: "1:0", odd: "12.0" }, { label: "2:0", odd: "9.90" }, { label: "3:0", odd: "15.0" }, { label: "0:1", odd: "2.80" },
            { label: "2:1", odd: "4.75" }, { label: "1:1", odd: "7.40" }, { label: "1:2", odd: "8.85" }, { label: "2:2", odd: "14.0" },
            { label: "3:1", odd: "8.11" }, { label: "3:2", odd: "27.0" }, { label: "4:1", odd: "41.0" }, { label: "4:2", odd: "44.0" },
        ],
    },
    {
        id: "htft",
        title: "Half Time/Full Time",
        initiallyExpanded: true,
        cols: 3,
        rows: [
            { label: "1/1", odd: "1.45" }, { label: "1/X", odd: "12.0" }, { label: "1/2", odd: "12.0" },
            { label: "X/1", odd: "3.74" }, { label: "X/X", odd: "9.40" }, { label: "X/2", odd: "10.0" },
            { label: "2/1", odd: "40.0" }, { label: "2/X", odd: "35.0" }, { label: "2/2", odd: "4.62" },
        ],
    },
    {
        id: "no-goal",
        title: "No Goal Bet",
        cols: 2,
        rows: [{ label: "Home", odd: "1.70" }, { label: "Away", odd: "2.10" }],
    },
    {
        id: "home-no-bet",
        title: "Home No Bet",
        cols: 2,
        rows: [{ label: "Home", odd: "1.55" }, { label: "Away", odd: "2.45" }],
    },
    {
        id: "away-no-bet",
        title: "Away No Bet",
        cols: 2,
        rows: [{ label: "Home", odd: "1.90" }, { label: "Draw", odd: "3.20" }],
    },
    {
        id: "ftgg",
        title: "FT/GG",
        cols: 2,
        rows: [{ label: "GG", odd: "1.81" }, { label: "NG", odd: "1.95" }],
    },
    {
        id: "first-goal",
        title: "1st Goal",
        initiallyExpanded: true,
        cols: 3,
        rows: [
            { label: "Home", odd: "1.89" },
            { label: "None", odd: "8.00" },
            { label: "Away", odd: "3.40" },
        ],
    },
    {
        id: "last-goal",
        title: "Last Goal",
        initiallyExpanded: true,
        cols: 3,
        rows: [
            { label: "Home", odd: "1.90" },
            { label: "None", odd: "8.00" },
            { label: "Away", odd: "2.07" },
        ],
    },
    {
        id: "exact-goals",
        title: "Exact Goals",
        initiallyExpanded: true,
        cols: 4,
        rows: [
            { label: "0", odd: "3.00" },
            { label: "1", odd: "4.00" },
            { label: "2", odd: "5.00" },
            { label: "3+", odd: "-" },
        ],
    },
    {
        id: "goal-range",
        title: "Goal Range",
        initiallyExpanded: true,
        cols: 2,
        rows: [
            { label: "0-1", odd: "2.50" },
            { label: "2-3", odd: "2.80" },
            { label: "4-5", odd: "4.00" },
            { label: "6+", odd: "8.00" },
        ],
    },
];

function TeamBadge({ name }: { name: string }) {
    const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
    return (
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-background text-sm font-bold text-primary">
            {initials}
        </span>
    );
}

function MarketButton({ label, odd, selected, onToggle }: { label: string; odd?: string; selected: boolean; onToggle: () => void }) {
    return (
        <Button
            block
            onClick={onToggle}
            bgColor="primary"
            bgColorOpacity={selected ? 1 : 0.05}
            textColor={selected ? "secondary" : "primary"}
            borderColorOpacity={0}
            ctrlheight={34}
            borderradius={6}
        >
            <span className="flex w-full font-semibold items-center justify-between text-xs">
                <span className={`truncate ${selected ? 'opacity-100' : 'opacity-80'} `}>{label}</span>
                {odd ? <span className={`ml-1 shrink-0 `}>{odd}</span> : null}
            </span>
        </Button>
    );
}

function OddsGrid({ section }: { section: MarketSection }) {
    const [showAll, setShowAll] = useState(false);
    const [selected, setSelected] = useState<number | null>(() => {
        const idx = section.rows.findIndex((r) => r.active);
        return idx !== -1 ? idx : null;
    });
    const { rows, cols, colHeaders, showMoreAt } = section;

    const visibleCount = showMoreAt && !showAll ? showMoreAt * cols : rows.length;
    const hasMore = !!showMoreAt && rows.length > showMoreAt * cols;

    return (
        <div className="px-1 py-3 border-t border-tertiary/10">
            {colHeaders && (
                <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {colHeaders.map((h, i) => (
                        <div key={i} className="text-center text-xs text-tertiary/50 font-medium py-1">{h}</div>
                    ))}
                </div>
            )}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {rows.slice(0, visibleCount).map((odd, i) => (
                    <MarketButton
                        key={i}
                        label={odd.label}
                        odd={odd.odd}
                        selected={selected === i}
                        onToggle={() => setSelected(prev => prev === i ? null : i)}
                    />
                ))}
            </div>
            {hasMore && (
                <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-2 w-full text-center text-xs text-primary py-1"
                >
                    {showAll ?
                        <span className="flex gap-1 items-center justify-center">
                            Show Less
                            <Icon icon={`fi fi-ss-angle-small-down`} className={`text-primary/60 transition-transform rotate-180`} />
                        </span>
                        :
                        <span className="flex items-center gap-1 justify-center">

                            {`Show ${Math.ceil(rows.length / cols) - showMoreAt!} more `}
                            <Icon icon={`fi fi-ss-angle-small-down`} className={`text-primary/60 transition-transform mt-1`} />

                        </span>
                    }
                </button>
            )}
        </div>
    );
}

const Favorite: React.FC<{ value?: boolean; onChange?: (val: boolean) => void }> = (props) => {
    const [selected, setSelected] = useState(props.value || false);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const next = !selected;
        setSelected(next);
        props.onChange?.(next);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            className="shrink-0 p-1 bg-transparent border-none cursor-pointer flex items-center"
            style={{ color: "rgb(var(--primary))", lineHeight: 1 }}
        >
            {selected ? <FaStar size={16} /> : <FaRegStar size={16} />}
        </button>
    );
};

export default function Flow3({ fixture }: Flow3Props) {
    const [activeTopTab, setActiveTopTab] = useState(topTabs[0]);
    const [search, setSearch] = useState("");

    const defaultActiveKey = marketSections
        .filter((s) => s.initiallyExpanded)
        .map((s) => s.id);

    const filteredSections = search
        ? marketSections.filter(
            (s) =>
                s.title.toLowerCase().includes(search.toLowerCase()) ||
                s.rows.some((r) => r.label.toLowerCase().includes(search.toLowerCase()))
        )
        : marketSections;

    return (
        <div className="mx-auto w-full max-w-8xl bg-background pb-24">
            {/* Fixture header */}
            <div className="bg-secondary px-4 pt-3 pb-4">

                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 flex-col items-center gap-2">
                        <TeamBadge name={fixture.home} />
                        <span className="text-xs font-semibold text-tertiary line-clamp-2 text-center leading-tight">
                            {fixture.home}
                        </span>
                    </div>
                    <div className="flex min-w-20 flex-col items-center gap-1">
                        <span className="text-xs text-tertiary/50">Today</span>
                        <span className="text-sm font-bold text-tertiary">{fixture.kickoffTime}</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-2">
                        <TeamBadge name={fixture.away} />
                        <span className="text-xs font-semibold text-tertiary line-clamp-2 text-center leading-tight">
                            {fixture.away}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tab bar */}
            <div className="flex items-center overflow-x-auto bg-secondary border-t border-primary/5 p-2 px-3 shadow-sm">
                {topTabs.map((tab) => (
                    <Button
                        key={tab}
                        size="middle"
                        onClick={() => setActiveTopTab(tab)}
                        bgColor={tab === activeTopTab ? "primary" : "secondary"}
                        bgColorOpacity={tab === activeTopTab ? 0.05 : 1}
                        borderColor={tab === activeTopTab ? "primary" : "tertiary"}
                        borderColorOpacity={0}
                        textColor={tab === activeTopTab ? "primary" : "tertiary"
                        }
                    >
                        {tab}
                    </Button>

                ))}
            </div>

            {/* Search */}
            <div className="px-3 py-3">
                <Input
                    placeholder="Search by market or outcome"
                    prefix={<HiOutlineMagnifyingGlass className="w-4 h-4 text-tertiary/50" />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>

            {/* Market sections */}
            <div className="px-2 space-y-2">
                <Collapsible
                    defaultActiveKey={defaultActiveKey}
                    contentBorderColorOpacity={0}
                    style={{
                        background: 'var(--color-background)',
                    }}
                    styles={{

                        body: {
                            background: 'var(--color-secondary)',
                            borderBottomRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            boxShadow: 'var(--shadow-card)'
                        },
                        header: {
                            display: 'flex',
                            alignItems: 'center',
                            background: 'var(--color-secondary)',
                            borderTopRightRadius: 12,
                            borderTopLeftRadius: 12,
                            boxShadow: 'var(--shadow-card)'
                        },

                    }}
                    items={filteredSections.map((section) => ({
                        key: section.id,
                        label: (
                            <div className="flex items-center justify-between gap-1 w-full min-w-0">
                                <span className=" text-sm flex gap-1 text-tertiary truncate">
                                    {section.title}
                                    {section.info && (
                                        <span className="p-0.5 scale-75 rounded-md bg-primary/7">
                                            <IoInformation className="w-4 h-4 text-primary shrink-0" />
                                        </span>
                                    )}
                                </span>
                                <Favorite />
                            </div>
                        ),
                        children: <OddsGrid section={section} />,
                        className: 'mb-2',

                    }))}
                />
            </div>

            
        </div>
    );
}
