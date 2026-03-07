import { db } from "@/lib/db";
import { event, participant } from "@/db/schema";
import { user } from "@/db/schema/user";
import { eq, desc, and } from "drizzle-orm";

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

export async function getEventParticipants(eventId: string) {
  return db
    .select({
      id: participant.id,
      userId: participant.userId,
      name: user.name,
      email: user.email,
      createdAt: participant.createdAt,
    })
    .from(participant)
    .innerJoin(user, eq(participant.userId, user.id))
    .where(eq(participant.eventId, eventId));
}

export async function getAllParticipants() {
  return db
    .select({
      id: participant.id,
      eventId: participant.eventId,
      userId: participant.userId,
      name: user.name,
      email: user.email,
      createdAt: participant.createdAt,
    })
    .from(participant)
    .innerJoin(user, eq(participant.userId, user.id));
}

export async function getUserRegisteredEvents(userId: string) {
  return db
    .select({
      id: event.id,
      title: event.title,
      category: event.category,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      featured: event.featured,
      registeredAt: participant.createdAt,
    })
    .from(participant)
    .innerJoin(event, eq(participant.eventId, event.id))
    .where(eq(participant.userId, userId))
    .orderBy(desc(participant.createdAt));
}

export async function getParticipantStatus(eventId: string, userId: string) {
  const results = await db
    .select()
    .from(participant)
    .where(and(eq(participant.eventId, eventId), eq(participant.userId, userId)))
    .limit(1);
  return results.length > 0;
}
