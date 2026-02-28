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
