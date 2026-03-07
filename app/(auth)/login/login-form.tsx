"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, signInWithGoogle } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SpinnerGap } from "@phosphor-icons/react";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn.email({ email, password });

    if (authError) {
      setError(authError.message ?? "Failed to sign in");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle(callbackUrl);
      // Better Auth redirects automatically; no manual push needed
    } catch {
      setError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-center text-sm font-semibold tracking-wide text-primary">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button
          type="submit"
          className="w-full"
          disabled={loading || googleLoading}
        >
          {loading ? <SpinnerGap className="animate-spin" /> : "Sign In"}
        </Button>
      </form>

      <div className="relative flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-[0.65rem] tracking-widest uppercase text-muted-foreground">
          or
        </span>
        <Separator className="flex-1" />
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2.5"
        onClick={handleGoogle}
        disabled={googleLoading || loading}
      >
        {googleLoading ? (
          <SpinnerGap className="animate-spin" />
        ) : (
          <GoogleLogo />
        )}
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
