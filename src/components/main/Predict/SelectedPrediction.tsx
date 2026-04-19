import React from 'react'

export default function SelectedPrediction() {
    return (
        <button
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl bg-primary px-3 py-3 text-secondary shadow-lg"
        >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-lg font-bold">
                4
            </span>
            <span className="line-clamp-2 flex-1 text-left text-sm font-semibold">
                Lens v PSG - 1X; Sinner v Medvedev - 1st set winner
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xl font-bold text-primary">
                20.53
            </span>
        </button>
    )
}
