"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@playpredict/ui";
import { useMyProfile } from "@api";
import { useAuthStore } from "@stores";
import { Loader } from "@common";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const stored = useRef(false);

  useEffect(() => {
    if (stored.current) return;
    const token = params.get("token") ?? params.get("accessToken");
    if (!token) {
      setError("Sign-in failed: no token returned.");
      return;
    }
    useAuthStore.getState().setAuth({ token });
    stored.current = true;
  }, [params]);

  const hasToken = !!useAuthStore((s) => s.token);
  const profile = useMyProfile(hasToken);

  useEffect(() => {
    if (profile.isSuccess) {
      useAuthStore.getState().setUser(profile.data);
      router.replace("/");
    }
  }, [profile.isSuccess, profile.data, router]);

  if (error) {
    return (
      <div className="flex min-h-[60vh] w-full max-w-md mx-auto flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-xl font-bold text-tertiary">Sign-in failed</h1>
        <p className="text-tertiary/70 text-sm">{error}</p>
        <Button type="primary" onClick={() => router.replace("/account/auth")}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Loader />
    </div>
  );
}
