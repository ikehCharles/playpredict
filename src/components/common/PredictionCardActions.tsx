"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegFlag, FaThumbsUp } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import Button from "../utilities/Button";
import ReportTipSheet from "./ReportTipSheet";

interface PredictionCardActionsProps {
    likes: number;
    showActionText?: boolean;
    odd?: number;
    isSaved?: boolean;
    stopPropagation?: boolean;
}

export default function PredictionCardActions({
    likes,
    showActionText = false,
    odd,
    isSaved = false,
    stopPropagation = false,
}: PredictionCardActionsProps) {
    const [isReportOpen, setIsReportOpen] = useState(false);

    return (
        <>
        <div
            className="flex items-center justify-between"
            onClick={stopPropagation ? (event) => event.stopPropagation() : undefined}
        >
            <Button type="default" icon={<FaThumbsUp />} className="flex items-center gap-1">
                {likes} {showActionText && "likes"}
            </Button>

            <Button
                icon={<FaRegFlag />}
                color="red"
                variant="filled"
                onClick={(e) => { e.stopPropagation(); setIsReportOpen(true); }}
            >
                {showActionText && "Report"}
            </Button>

            {odd !== undefined && (
                <div className="rounded-xl overflow-hidden flex border border-tertiary/20 items-center gap-2">
                    <p className="pl-2">{odd}</p>
                    <p className="bg-tertiary border border-tertiary p-2.5"><Image
                        src="https://getesports.net/wp-content/uploads/sites/21169/2025/05/stake-logo.png"
                        alt="Stake"
                        width={64}
                        height={16}
                        className="h-4 w-auto"
                    /></p>
                </div>
            )}

            <Button
                type="default"
                icon={isSaved ? <HiBookmark className="text-primary" /> : <HiOutlineBookmark />}
            >
                {showActionText && (isSaved ? "Saved" : "Save")}
            </Button>
            <Button type="default" icon={<PiShareFatBold />} >
                {showActionText && "Share"}
            </Button>
        </div>
        <ReportTipSheet
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
        />
        </>
    );
}
