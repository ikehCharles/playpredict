"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, MenuProps } from "antd";
import { MdMoreVert, MdVerified } from "react-icons/md";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineMinusCircle, HiOutlineFlag } from "react-icons/hi2";
import { PredictionCardActions, PredictionDetailsBottomSheet } from "@common";
import Badge from "./Badge";
import Dropdown from "./Dropdown";
import Tag from "./Tag";
import type { PredictionItemType, PredictionResult } from "@models";

const items: MenuProps['items'] = [
    {
        key: '4',
        danger: true,
        label: 'Flag Prediction',
    },
]

export type PredictionCardProps = PredictionItemType;

const resultBadge: Record<PredictionResult, { label: string; icon: React.ReactNode; className: string }> = {
    won: {
        label: "Won",
        icon: <HiOutlineCheckCircle className="w-4 h-4" />,
        className: "bg-success/10 text-success border-success/20",
    },
    lost: {
        label: "Lost",
        icon: <HiOutlineXCircle className="w-4 h-4" />,
        className: "bg-error/10 text-error border-error/20",
    },
    void: {
        label: "Void",
        icon: <HiOutlineMinusCircle className="w-4 h-4" />,
        className: "bg-tertiary/10 text-tertiary/70 border-tertiary/15",
    },
    pending: {
        label: "Pending",
        icon: <HiOutlineMinusCircle className="w-4 h-4" />,
        className: "bg-primary/10 text-primary border-primary/20",
    },
};

export default function PredictionCard({
    sport,
    league,
    timeAgo,
    isSaved = false,
    isModerated = false,
    result,
    user,
    match,
    prediction,
    stats,
    bookies
}: PredictionCardProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const router = useRouter();
    const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

    const goToUserProfile = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/profile/user/${user.username}`);
    };

    return (
        <>
            {isModerated && (
                <div className="mb-2 flex items-center gap-2 rounded-lg bg-tertiary/5 px-3 py-2 text-xs text-tertiary/80">
                    <HiOutlineFlag className="w-4 h-4 shrink-0" />
                    This tip is being moderated
                </div>
            )}
            <div
                className="w-full shadow-small rounded-xl bg-secondary text-tertiary p-4 "

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
                <div>
                    {/* User */}
                    <div
                        className="mb-3 flex items-start gap-3 "
                        role="button"
                        tabIndex={0}

                    >
                        <div onClick={goToUserProfile}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    router.push(`/profile/user/${user.username}`);
                                }
                            }}
                            aria-label={`Open ${user.name}'s profile`} className="cursor-pointer">
                            <Badge color='none' title="punter avatar and country" offset={[-5, 30]}>
                                <Avatar size={40} src={user.avatar} />
                            </Badge>

                        </div>

                        <div onClick={goToUserProfile}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    router.push(`/profile/user/${user.username}`);
                                }
                            }}
                            aria-label={`Open ${user.name}'s profile`} className=" cursor-pointer items-start">
                            <div className="flex items-center gap-1 font-bold">
                                {user.name}
                                {user.verified && (
                                    <MdVerified className="text-blue-800" />
                                )}

                            </div>
                            <div className="text-xs text-tertiary/80">
                                @{user.username}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <Tag colorbycount={user.winRate} variant="solid" className="font-semibold rounded-full">
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
                    <div onClick={() => setIsDetailsOpen(true)} className="cursor-pointer mb-3 rounded-lg bg-primary/5 p-3">
                        <div className="mb-2 flex items-center border-b pb-3 border-tertiary/10 justify-center gap-3 text-sm font-bold">
                            <span>{match.home}</span>
                            {hasScore ? (
                                <span className="text-tertiary">
                                    {match.homeScore} - {match.awayScore}
                                </span>
                            ) : (
                                <span>-</span>
                            )}
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
                {result ? (
                    <PredictionCardActions
                        likes={stats.likes}
                        isSaved={isSaved}
                        stopPropagation
                        resultBadge={
                            <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${resultBadge[result].className}`}>
                                {resultBadge[result].icon}
                                {resultBadge[result].label}
                            </span>
                        }
                    />
                ) : (
                    <PredictionCardActions
                        likes={stats.likes}
                        odd={prediction.odd}
                        isSaved={isSaved}
                        stopPropagation
                    />
                )}
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
