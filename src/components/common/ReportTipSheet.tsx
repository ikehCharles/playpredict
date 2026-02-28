"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../utilities/Button";

const REPORT_REASONS = [
    "Copied or Plagiarized Tip",
    "Unrealistic or Impossible Pick",
    "Misleading or Spam Content",
    "Suspicious Activity or Pattern",
] as const;

interface ReportTipSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (reason: string) => void;
}

export default function ReportTipSheet({ isOpen, onClose, onSubmit }: ReportTipSheetProps) {
    const [selected, setSelected] = useState<string>(REPORT_REASONS[0]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit?.(selected);
        onClose();
    };

    return (
        <>
            <div
                className="fixed inset-0 z-80 bg-tertiary/35 backdrop-blur-[2px]"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
            />

            <div className="fixed inset-0 z-90 flex items-center justify-center p-4">
                <div
                    className="w-full max-w-md bg-secondary rounded-3xl shadow-2xl animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-tertiary/10">
                    <h3 className="text-lg font-bold text-tertiary">Report Tip</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-tertiary/10 p-1.5 hover:bg-tertiary/15"
                        aria-label="Close report"
                    >
                        <IoMdClose className="h-5 w-5 text-tertiary/70" />
                    </button>
                </div>

                <div className="px-5 py-5 space-y-5">
                    <p className="text-sm text-tertiary leading-relaxed">
                        Help us keep PlayPredict fair and trustworthy. Why are you reporting this tip?
                    </p>

                    {/* Reason list */}
                    <div className="space-y-4">
                        {REPORT_REASONS.map((reason) => (
                            <button
                                key={reason}
                                type="button"
                                onClick={() => setSelected(reason)}
                                className="flex items-center gap-3 w-full text-left"
                            >
                                <span
                                    className={`h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        selected === reason
                                            ? "border-primary bg-primary"
                                            : "border-tertiary/30 bg-transparent"
                                    }`}
                                >
                                    {selected === reason && (
                                        <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                                    )}
                                </span>
                                <span className="text-sm text-tertiary">{reason}</span>
                            </button>
                        ))}
                    </div>

                    {/* Submit */}
                    <div className="space-y-3 pt-2 pb-4">
                        <Button
                            type="primary"
                            block
                            onClick={handleSubmit}
                            className="rounded-xl h-14 text-base font-semibold"
                        >
                            Submit
                        </Button>
                        <Button
                        onClick={handleSubmit}
                            type="default"
                            block
                            
                            className="rounded-xl h-14 font-semibold"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
