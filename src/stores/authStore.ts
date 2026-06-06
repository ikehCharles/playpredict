import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@models";

interface AuthState {
    token: string | null;
    user: AuthUser | null;
    setAuth: (auth: { token: string; user?: AuthUser | null }) => void;
    setUser: (user: AuthUser | null) => void;
    clear: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: ({ token, user }) =>
                set((state) => ({ token, user: user ?? state.user })),
            setUser: (user) => set({ user }),
            clear: () => set({ token: null, user: null }),
        }),
        {
            name: "playpredict-auth",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
