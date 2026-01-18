"use client";

import { Avatar, Badge, Radio, Tag } from "antd";
import { FaRegFlag, FaThumbsUp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TiFlagOutline } from "react-icons/ti";
import { PiShareFatBold } from "react-icons/pi";
import { HiOutlineBookmark } from "react-icons/hi";
import Button from "./Button";
import RadioGroup from "./RadioGroup";

export interface PredictionCardProps {
    sport: string;
    league: string;
    timeAgo: string;
    user: {
        name: string;
        username: string;
        avatar: string;
        verified?: boolean;
        winRate: string;
        tips: number;
    };
    match: {
        home: string;
        away: string;
    };
    prediction: {
        title: string;
        odd: number;
    };
    stats: {
        likes: number;
    };
}

export default function PredictionCard({
    sport,
    league,
    timeAgo,
    user,
    match,
    prediction,
    stats,
}: PredictionCardProps) {

    return (
       
            <div className="w-full  rounded-xl bg-secondary text-tertiary p-4 ">
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            type="default"
                            icon={<FaThumbsUp />}
                            className="flex items-center gap-1"
                        >
                            {stats.likes}
                        </Button>

                        <Button
                            icon={<FaRegFlag />}
                            color="red"
                            variant="filled"
                        />
                    </div>
                    <div>
                        <RadioGroup disabled defaultValue="b">
                            <Radio.Button value="a">{prediction.odd}</Radio.Button>
                            <Radio.Button value="b">Stake</Radio.Button>
                        </RadioGroup>

                    </div>

                    <div className="flex items-center gap-2">


                        <Button type="default" icon={<HiOutlineBookmark />} />
                        <Button type="default" icon={<PiShareFatBold />} />
                    </div>
                </div>
            </div>
    );
}
