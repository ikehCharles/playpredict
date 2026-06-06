import { apiClient } from "./client";
import type { Sport, Tournament, Game, Paginated } from "@models";

interface Envelope<T> {
    message: string;
    statusCode: number;
    data: T;
}

export const DEFAULT_GAMES_PAGE_SIZE = 20;

export async function listSports() {
    const { data } = await apiClient.get<Envelope<Sport[]>>("/sport/list");
    return data.data;
}

export async function listTournaments(params?: { sportId?: number }) {
    const { data } = await apiClient.get<Envelope<Tournament[]>>("/sport/tournaments", {
        params: params?.sportId !== undefined ? { id: params.sportId } : undefined,
    });
    return data.data;
}

interface ListGamesParams {
    tournamentId: number;
    pageNumber?: number;
    pageSize?: number;
}

export async function listGames({
    tournamentId,
    pageNumber = 1,
    pageSize = DEFAULT_GAMES_PAGE_SIZE,
}: ListGamesParams) {
    const { data } = await apiClient.get<Envelope<Paginated<Game>>>("/sport/games", {
        params: { tournamentId, pageNumber, pageSize },
    });
    return data.data;
}
