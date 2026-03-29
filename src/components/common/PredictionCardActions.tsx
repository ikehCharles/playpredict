"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../utilities/Button";
import ReportTipSheet from "./ReportTipSheet";
import { Icon } from "../utilities";

interface PredictionCardActionsProps {
    likes: number;
    showActionText?: boolean;
    odd?: number;
    isSaved?: boolean;
    stopPropagation?: boolean;
}

export default function PredictionCardActions({
    likes: initialLikes,
    showActionText = false,
    odd,
    isSaved: initialSaved = false,
    stopPropagation = false,
}: PredictionCardActionsProps) {
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isSaved, setIsSaved] = useState(initialSaved);

    const handleLike = (e: React.MouseEvent) => {
        if (stopPropagation) e.stopPropagation();
        setIsLiked((prev) => {
            setLikesCount((count) => (prev ? count - 1 : count + 1));
            return !prev;
        });
    };

    const handleSave = (e: React.MouseEvent) => {
        if (stopPropagation) e.stopPropagation();
        setIsSaved((prev) => !prev);
    };

    const handleShare = async (e: React.MouseEvent) => {
        if (stopPropagation) e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({ title: "Check out this prediction!", url: window.location.href });
            } catch {
                // user cancelled or share failed silently
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <>
            <div
                className="flex items-center justify-between"
                onClick={stopPropagation ? (event) => event.stopPropagation() : undefined}
            >


                {odd !== undefined && (
                    <div className="rounded-xl overflow-hidden flex border border-tertiary/20 items-center gap-2">
                        <p className="pl-2 font-medium">{odd}</p>
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
                    bgColorOpacity={0.05}
                    borderColorOpacity={0}
                    textColor="primary"
                    icon={isLiked ? <Icon icon="fi-sr-heart" /> : <Icon icon="fi-rr-heart" />}
                    className="flex items-center gap-1"
                    onClick={handleLike}
                >
                    <span className="text-sm font-medium">
                        {likesCount} {showActionText && "likes"}
                    </span>
                </Button>

                <Button
                    bgColorOpacity={0.05}
                    borderColorOpacity={0}
                    textColor="primary"
                    icon={isSaved ? <Icon icon="/icons/bookmarkFill.svg" srcHost="local" /> : <Icon icon="/icons/bookmarkOutline.svg" srcHost="local" />}
                    onClick={handleSave}
                >
                    {showActionText && (isSaved ? "Saved" : "Save")}
                </Button>
                <Button
                    bgColorOpacity={0.05}
                    borderColorOpacity={0}
                    textColor="primary"
                    icon={<Icon icon="fi-rr-redo" />}
                    onClick={handleShare}
                >
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
