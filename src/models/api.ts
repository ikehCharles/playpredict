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
    winRate: number;
    tips: number;
    roi: number;
}

export interface PredictionMatchType {
    home: string;
    away: string;
    homeScore?: number;
    awayScore?: number;
}

export interface PredictionType {
    title: string;
    odd: number;
}

export interface PredictionStatsType {
    likes: number;
}

export type PredictionResult = "won" | "lost" | "void" | "pending";

export interface PredictionItemType {
    sport: string;
    league: string;
    timeAgo?: string;
    isSaved?: boolean;
    isModerated?: boolean;
    result?: PredictionResult;
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

/* ── Sport ── */

export interface Sport {
    _id: string;
    sportId: number;
    sportName: string;
    slug: string;
    isActive: boolean;
}

export interface Tournament {
    _id: string;
    tournamentId: number;
    sportId: number;
    name: string;
    slug: string;
    category: string;
    categorySlug: string;
}

/** Generic envelope for paginated list endpoints (matches /sport/participants). */
export interface Paginated<T> {
    pageSize: number;
    pageNumber: number;
    total: number;
    data: T[];
}

/** Best-guess shape for /sport/games — endpoint currently 500s, so adjust when live. */
export interface Game {
    _id: string;
    fixtureId: number | string;
    tournamentId: number;
    sportId: number;
    startTime: string;
    homeTeam: { id?: number | string; name: string };
    awayTeam: { id?: number | string; name: string };
    odds?: {
        w1?: number;
        x?: number;
        w2?: number;
    };
}

/* ── Auth ── */

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    username?: string;
    avatar?: string;
    verified?: boolean;
}
