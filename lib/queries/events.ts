import { db } from "@/lib/db";
import { event } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getFeaturedEvent() {
  const results = await db
    .select()
    .from(event)
    .where(eq(event.featured, true))
    .limit(1);
  return results[0] ?? null;
}

export async function getSideEvents(limit = 2) {
  return db
    .select()
    .from(event)
    .where(eq(event.featured, false))
    .orderBy(desc(event.createdAt))
    .limit(limit);
}

export async function getAllEvents() {
  return db.select().from(event).orderBy(desc(event.createdAt));
}
