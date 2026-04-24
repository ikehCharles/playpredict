"use client";

import { Button } from "@utilities";

type OddButtonProps = {
    label: string;
    odd?: number | string;
    highlighted?: boolean;
    onClick: () => void;
    borderradius?: number;
    ctrlheight?: number;
};

export default function OddButton({ label, odd, highlighted = false, onClick, borderradius = 12, ctrlheight }: OddButtonProps) {
    const displayOdd = typeof odd === "number" ? odd.toFixed(2) : odd;

    return (
        <Button
            block
            onClick={onClick}
            bgColor="primary"
            bgColorOpacity={highlighted ? 1 : 0.05}
            textColor={highlighted ? "secondary" : "primary"}
            borderColorOpacity={0}
            ctrlheight={ctrlheight}
        >
            <span className="flex w-full items-center justify-between text-sm font-semibold">
                <span className="truncate">{label}</span>
                {displayOdd ? <span className="ml-1 shrink-0">{displayOdd}</span> : null}
            </span>
        </Button>
    );
}
