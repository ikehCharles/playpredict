"use client";

import Image from "next/image";
import { Button } from "../utilities";

interface BookieBetButtonProps {
  logoUrl: string;
  odd: number;
  bookieName?: string;
}

export default function BookieBetButton({
  logoUrl,
  odd,
  bookieName = "Stake",
}: BookieBetButtonProps) {
  return (
    <div className="flex justify-between items-center rounded-lg bg-primary/5 text-left p-1 text-primary">
      <Button type="link">
        Bet On {bookieName} @ {odd.toFixed(2)}
      </Button>

        <Image
          src={logoUrl}
          alt={bookieName}
          width={84}
          height={16}
          className="h-9 w-auto m-2 rounded-sm"
          unoptimized
        />
    </div>
  );
}
