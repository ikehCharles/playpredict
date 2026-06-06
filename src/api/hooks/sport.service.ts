"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as sportApi from "../sport";
import { DEFAULT_GAMES_PAGE_SIZE } from "../sport";
import type { ApiError } from "../client";
import type { Sport, Tournament, Game, Paginated } from "@models";

export const sportQueryKeys = {
    all: ["sport"] as const,
    sports: ["sport", "list"] as const,
    tournaments: (sportId?: number) => ["sport", "tournaments", sportId ?? "all"] as const,
    games: (tournamentId?: number) => ["sport", "games", tournamentId ?? "all"] as const,
};

export function useSports() {
    return useQuery<Sport[], ApiError>({
        queryKey: sportQueryKeys.sports,
        queryFn: () => sportApi.listSports(),
        staleTime: 5 * 60_000,
    });
}

export function useTournaments(sportId: number | undefined) {
    return useQuery<Tournament[], ApiError>({
        queryKey: sportQueryKeys.tournaments(sportId),
        queryFn: () => sportApi.listTournaments({ sportId }),
        enabled: sportId !== undefined,
        staleTime: 5 * 60_000,
    });
}

export function useInfiniteGames(tournamentId: number | undefined) {
    return useInfiniteQuery<Paginated<Game>, ApiError>({
        queryKey: sportQueryKeys.games(tournamentId),
        queryFn: ({ pageParam = 1 }) =>
            sportApi.listGames({
                tournamentId: tournamentId!,
                pageNumber: pageParam as number,
                pageSize: DEFAULT_GAMES_PAGE_SIZE,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const loaded = lastPage.pageNumber * lastPage.pageSize;
            return loaded < lastPage.total ? lastPage.pageNumber + 1 : undefined;
        },
        enabled: tournamentId !== undefined,
        staleTime: 60_000,
    });
}
