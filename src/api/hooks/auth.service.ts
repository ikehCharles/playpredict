"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as authApi from "../auth";
import type { ApiError } from "../client";
import type { AuthUser } from "@models";

export const authQueryKeys = {
    me: ["auth", "me"] as const,
};

export function useRequestOtp() {
    return useMutation<unknown, ApiError, string>({
        mutationFn: (email) => authApi.requestOtp(email),
    });
}

export function useVerifyOtp() {
    return useMutation<authApi.VerifyOtpResponse, ApiError, { email: string; code: string }>({
        mutationFn: ({ email, code }) => authApi.verifyOtp(email, code),
    });
}

export function useMyProfile(enabled = true) {
    return useQuery<AuthUser, ApiError>({
        queryKey: authQueryKeys.me,
        queryFn: () => authApi.getMyProfile(),
        enabled,
    });
}
