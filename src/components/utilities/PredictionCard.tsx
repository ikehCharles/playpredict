"use client";

import { useState } from "react";
import { Avatar, Badge, Tag } from "antd";
import { MdVerified } from "react-icons/md";
import { PredictionCardActions, PredictionDetailsBottomSheet } from "@common";
import type { PredictionItemType } from "@models";

export type PredictionCardProps = PredictionItemType;

export default function PredictionCard({
    sport,
    league,
    timeAgo,
    isSaved = false,
    user,
    match,
    prediction,
    stats,
    bookies
}: PredictionCardProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
       <>
            <div
                className="w-full rounded-xl bg-secondary text-tertiary p-4 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => setIsDetailsOpen(true)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setIsDetailsOpen(true);
                    }
                }}
                aria-label={`Open prediction details for ${match.home} vs ${match.away}`}
            >
                {/* Header */}
                <div className="mb-3 flex items-center border-b border-tertiary/10 pb-2 justify-between text-xs">
                    <span className="font-medium">
                        ⚽ {sport} / {league}
                    </span>
                    <span>{timeAgo}</span>
                </div>

                {/* User */}
                <div className="mb-3 flex items-center gap-3">
                    <div>
                        <Badge color='none' title="punter avatar and country" style={{ boxShadow: 'none' }} count={'🏴󠁧󠁢󠁥󠁮󠁧󠁿'} offset={[-5, 30]}>
                            <Avatar size={40} src={user.avatar} />
                        </Badge>

                    </div>

                    <div className="flex-1 items-start">
                        <div className="flex items-center gap-1 font-semibold">
                            {user.name}
                            {user.verified && (
                                <MdVerified className="text-blue-800" />
                            )}
                            <Tag color='success' variant="solid" rootClassName="rounded-xl" className="font-semibold rounded-xl">
                                {user.winRate} W.R
                            </Tag>
                            <Tag color="black" variant="solid" className="font-semibold rounded-xl" >{user.tips} Tips</Tag>
                        </div>
                        <div className="text-xs text-tertiary/80">
                            @{user.username}
                        </div>

                    </div>


                </div>

                {/* Match */}
                <div className="mb-3 rounded-lg bg-primary/5 p-3 px-0">
                    <div className="mb-2 flex items-center border-b pb-3 border-tertiary/10 justify-center gap-3 text-sm font-semibold">
                        <span>{match.home}</span>
                        <span>-</span>
                        <span>{match.away}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-md p-3 py-1">
                        <p className="text-sm font-medium text-primary">
                            {prediction.title}
                        </p>
                        <div className="rounded-md border px-2 py-1 text-sm bg-secondary font-semibold">
                            {prediction.odd.toFixed(2)}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <PredictionCardActions
                    likes={stats.likes}
                    odd={prediction.odd}
                    isSaved={isSaved}
                    stopPropagation
                />
            </div>
            <PredictionDetailsBottomSheet
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                sport={sport}
                league={league}
                user={user}
                match={match}
                prediction={prediction}
                stats={stats}
                isSaved={isSaved}
                bookies={bookies}
            />
       </>
    );
}
