import { apiClient, API_BASE_URL } from "./client";
import type { AuthUser } from "@models";

export interface VerifyOtpResponse {
    accessToken?: string;
    token?: string;
    user?: AuthUser;
}

export async function requestOtp(email: string) {
    const { data } = await apiClient.post<unknown>(
        "/auth/request-otp",
        { email },
        { skipAuth: true },
    );
    return data;
}

export async function verifyOtp(email: string, code: string) {
    const { data } = await apiClient.post<VerifyOtpResponse>(
        "/auth/verify-otp",
        { email, code },
        { skipAuth: true },
    );
    return data;
}

export async function getMyProfile() {
    const { data } = await apiClient.get<AuthUser>("/user/me/profile");
    return data;
}

export const googleSignInUrl = `${API_BASE_URL}/auth/google`;
