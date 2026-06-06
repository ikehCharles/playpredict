import axios, { AxiosError } from "axios";
import { useAuthStore } from "@stores";

declare module "axios" {
    export interface AxiosRequestConfig {
        /** Set true to skip injecting the Authorization header. */
        skipAuth?: boolean;
    }
}

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.myplaypredict.com/api/v1";

export class ApiError extends Error {
    status: number;
    /** NestJS validation errors come back as `message: string[]`. */
    fieldErrors?: string[];

    constructor(message: string, status: number, fieldErrors?: string[]) {
        super(message);
        this.status = status;
        this.fieldErrors = fieldErrors;
    }
}

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
    if (config.skipAuth) return config;
    const token = useAuthStore.getState().token;
    if (token) config.headers.set("Authorization", `Bearer ${token}`);
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string | string[]; statusCode?: number }>) => {
        const status = error.response?.status ?? 0;
        const data = error.response?.data;
        const rawMessage = data?.message;
        const fieldErrors = Array.isArray(rawMessage) ? rawMessage : undefined;
        const message = fieldErrors
            ? fieldErrors[0]
            : typeof rawMessage === "string"
                ? rawMessage
                : error.message || `Request failed with status ${status}`;

        if (status === 401) {
            useAuthStore.getState().clear();
        }

        return Promise.reject(new ApiError(message, status, fieldErrors));
    },
);
