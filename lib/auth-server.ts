import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireAdmin() {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  if (session.user.role !== "admin") {
    throw new Error("Not authorized");
  }
  return session;
}
