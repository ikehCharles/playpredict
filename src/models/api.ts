export interface BookieType {
    name: string;
    logoUrl: string;
    odd: number;
}

export interface PredictionUserType {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
    winRate: string;
    tips: number;
    roi: number;
}

export interface PredictionMatchType {
    home: string;
    away: string;
}

export interface PredictionType {
    title: string;
    odd: number;
}

export interface PredictionStatsType {
    likes: number;
}

export interface PredictionItemType {
    sport: string;
    league: string;
    timeAgo?: string;
    isSaved?: boolean;
    user: PredictionUserType;
    match: PredictionMatchType;
    prediction: PredictionType;
    stats: PredictionStatsType;
    bookies?: BookieType[];
}

/* ── Profile Stats ── */

export type FormResult = "win" | "loss" | "draw" | "pending";

export interface SportWinRateType {
    sport: string;
    icon: string;
    winRate: number;
    tips: number;
}

export interface ProfileStatsType {
    totalTips: number;
    won: number;
    lost: number;
    voided: number;
    totalWinRate: number;
    totalWinRateTips: number;
    sportWinRates: SportWinRateType[];
    averageOdds: number;
    winStreak: number;
    roi: number;
    loseStreak: number;
    form: FormResult[];
    achievements: string[];   // badge image URLs (empty strings = placeholder)
}
