"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-lg font-semibold text-forest">
        Welcome, {session?.user?.name ?? "User"}
      </h1>
      <p className="mt-2 text-xs text-muted-foreground">
        You are signed in as {session?.user?.email}
      </p>
      <Button onClick={handleSignOut} variant="outline" className="mt-6">
        Sign Out
      </Button>
    </div>
  );
}
