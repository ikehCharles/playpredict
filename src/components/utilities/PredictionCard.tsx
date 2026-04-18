"use client";

import { useState } from "react";
import { Avatar, MenuProps } from "antd";
import { MdMoreVert, MdVerified } from "react-icons/md";
import { PredictionCardActions, PredictionDetailsBottomSheet } from "@common";
import Badge from "./Badge";
import Dropdown from "./Dropdown";
import Tag from "./Tag";
import type { PredictionItemType } from "@models";

const items: MenuProps['items'] = [
  {
    key: '4',
    danger: true,
    label: 'Flag Prediction',
  },
]

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
                className="w-full shadow-small rounded-xl bg-secondary text-tertiary p-4 cursor-pointer"
                role="button"
                tabIndex={0}

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
                    <span className="flex gap-3 items-center">

                        <span>{timeAgo}</span>
                        
                        <Dropdown trigger={['click']} menu={{ items }}>
                           <MdMoreVert className=" text-lg" />
                        </Dropdown>
                    </span>
                </div>
                <div onClick={() => setIsDetailsOpen(true)}>
                    {/* User */}
                    <div className="mb-3 flex items-start gap-3">
                        <div>
                            <Badge color='none' title="punter avatar and country" offset={[-5, 30]}>
                                <Avatar size={40} src={user.avatar} />
                            </Badge>

                        </div>

                        <div className="flex-1 items-start">
                            <div className="flex items-center gap-1 font-bold">
                                {user.name}
                                {user.verified && (
                                    <MdVerified className="text-blue-800" />
                                )}
                                
                            </div>
                            <div className="text-xs text-tertiary/80">
                                @{user.username}
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                <Tag colorbycount={user.winRate} variant="solid"  className="font-semibold rounded-full">
                                    {user.winRate}% W.R
                                </Tag>
                                <Tag colorbycount={user.roi} variant="solid" className="font-semibold rounded-full">
                                    {user.roi}% ROI
                                </Tag>
                                <Tag bgcolor={'tertiary'} textcolor={'tertiary'} bgopacity={0.1} variant="solid" className="font-semibold text-primary rounded-full">
                                    <span className="text-tertiary">
                                    {user.tips} Tips
                                    </span>
                                </Tag>
                            </div>

                        </div>


                    </div>

                    {/* Match */}
                    <div className="mb-3 rounded-lg bg-primary/5 p-3">
                        <div className="mb-2 flex items-center border-b pb-3 border-tertiary/10 justify-center gap-3 text-sm font-bold">
                            <span>{match.home}</span>
                            <span>-</span>
                            <span>{match.away}</span>
                        </div>

                        <div className="flex items-center justify-between gap-2 rounded-md py-1">
                            <p className="text-sm font-bold text-primary">
                                {prediction.title}
                            </p>
                            <div className="rounded-lg border border-primary/20 px-2 py-1 text-sm bg-secondary font-medium">
                                {prediction.odd.toFixed(2)}
                            </div>
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
