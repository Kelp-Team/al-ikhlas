import { db } from "@/lib/db";
import { booking, place, timeSlot } from "@/db/schema";
import { user } from "@/db/schema/user";
import { eq, desc } from "drizzle-orm";

export async function getAllPlaces() {
  return db.select().from(place).orderBy(desc(place.createdAt));
}

export async function getPlaceById(id: string) {
  const results = await db.select().from(place).where(eq(place.id, id)).limit(1);
  return results[0] ?? null;
}

export async function getTimeSlotsByPlaceId(placeId: string) {
  return db
    .select()
    .from(timeSlot)
    .where(eq(timeSlot.placeId, placeId))
    .orderBy(timeSlot.startTime);
}

export async function getAllTimeSlots() {
  return db.select().from(timeSlot).orderBy(timeSlot.startTime);
}

export async function getAllBookings() {
  return db
    .select({
      id: booking.id,
      date: booking.date,
      guestCount: booking.guestCount,
      notes: booking.notes,
      status: booking.status,
      declineReason: booking.declineReason,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      userId: booking.userId,
      userName: user.name,
      userEmail: user.email,
      placeId: booking.placeId,
      placeName: place.name,
      timeSlotId: booking.timeSlotId,
      timeSlotLabel: timeSlot.label,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
    })
    .from(booking)
    .innerJoin(user, eq(booking.userId, user.id))
    .innerJoin(place, eq(booking.placeId, place.id))
    .innerJoin(timeSlot, eq(booking.timeSlotId, timeSlot.id))
    .orderBy(desc(booking.createdAt));
}

export async function getUserBookings(userId: string) {
  return db
    .select({
      id: booking.id,
      date: booking.date,
      guestCount: booking.guestCount,
      notes: booking.notes,
      status: booking.status,
      declineReason: booking.declineReason,
      createdAt: booking.createdAt,
      placeName: place.name,
      timeSlotLabel: timeSlot.label,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
    })
    .from(booking)
    .innerJoin(place, eq(booking.placeId, place.id))
    .innerJoin(timeSlot, eq(booking.timeSlotId, timeSlot.id))
    .where(eq(booking.userId, userId))
    .orderBy(desc(booking.createdAt));
}
