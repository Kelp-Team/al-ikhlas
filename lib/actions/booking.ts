"use server";

import { db } from "@/lib/db";
import { place, timeSlot, booking } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin, getServerSession } from "@/lib/auth-server";

// --- Place actions (admin) ---

export async function createPlace(prevState: unknown, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const image = (formData.get("image") as string) || null;
  const capacity = formData.get("capacity")
    ? Number(formData.get("capacity"))
    : null;

  if (!name) {
    return { error: "Name is required." };
  }

  await db.insert(place).values({
    id: crypto.randomUUID(),
    name,
    description,
    image,
    capacity,
  });

  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}

export async function updatePlace(prevState: unknown, formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const image = (formData.get("image") as string) || null;
  const capacity = formData.get("capacity")
    ? Number(formData.get("capacity"))
    : null;

  if (!id || !name) {
    return { error: "ID and name are required." };
  }

  await db
    .update(place)
    .set({ name, description, image, capacity, updatedAt: new Date() })
    .where(eq(place.id, id));

  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}

export async function deletePlace(id: string) {
  await requireAdmin();

  await db.delete(place).where(eq(place.id, id));

  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}

// --- Time slot actions (admin) ---

export async function createTimeSlot(prevState: unknown, formData: FormData) {
  await requireAdmin();

  const placeId = formData.get("placeId") as string;
  const label = formData.get("label") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  if (!placeId || !label || !startTime || !endTime) {
    return { error: "All fields are required." };
  }

  await db.insert(timeSlot).values({
    id: crypto.randomUUID(),
    placeId,
    label,
    startTime,
    endTime,
  });

  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}

export async function deleteTimeSlot(id: string) {
  await requireAdmin();

  await db.delete(timeSlot).where(eq(timeSlot.id, id));

  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}

// --- Booking actions ---

export async function createBooking(prevState: unknown, formData: FormData) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Not authenticated." };
  }

  const placeId = formData.get("placeId") as string;
  const timeSlotId = formData.get("timeSlotId") as string;
  const date = formData.get("date") as string;
  const guestCount = formData.get("guestCount")
    ? Number(formData.get("guestCount"))
    : null;
  const notes = (formData.get("notes") as string) || null;

  if (!placeId || !timeSlotId || !date) {
    return { error: "Place, time slot, and date are required." };
  }

  await db.insert(booking).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    placeId,
    timeSlotId,
    date,
    guestCount,
    notes,
  });

  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}

export async function cancelBooking(bookingId: string) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Not authenticated." };
  }

  const results = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1);

  if (results.length === 0) {
    return { error: "Booking not found." };
  }

  if (results[0].userId !== session.user.id) {
    return { error: "Not authorized." };
  }

  if (results[0].status !== "pending") {
    return { error: "Only pending bookings can be cancelled." };
  }

  await db
    .update(booking)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(booking.id, bookingId));

  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}

export async function acceptBooking(bookingId: string) {
  await requireAdmin();

  await db
    .update(booking)
    .set({ status: "accepted", updatedAt: new Date() })
    .where(eq(booking.id, bookingId));

  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}

export async function declineBooking(bookingId: string, reason?: string) {
  await requireAdmin();

  await db
    .update(booking)
    .set({
      status: "declined",
      declineReason: reason || null,
      updatedAt: new Date(),
    })
    .where(eq(booking.id, bookingId));

  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}
