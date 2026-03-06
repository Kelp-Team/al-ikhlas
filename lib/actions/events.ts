"use server";

import { db } from "@/lib/db";
import { event } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-server";

export async function createEvent(prevState: unknown, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string) || null;
  const date = (formData.get("date") as string) || null;
  const time = (formData.get("time") as string) || null;
  const location = (formData.get("location") as string) || null;
  const featured = formData.get("featured") === "true";
  const displayNumber = (formData.get("displayNumber") as string) || null;
  const dateNum = (formData.get("dateNum") as string) || null;

  if (!title || !category) {
    return { error: "Title and category are required." };
  }

  await db.insert(event).values({
    id: crypto.randomUUID(),
    title,
    category,
    description,
    date,
    time,
    location,
    featured,
    displayNumber,
    dateNum,
  });

  revalidatePath("/");
  revalidatePath("/events");
  return { success: true };
}

export async function updateEvent(prevState: unknown, formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string) || null;
  const date = (formData.get("date") as string) || null;
  const time = (formData.get("time") as string) || null;
  const location = (formData.get("location") as string) || null;
  const featured = formData.get("featured") === "true";
  const displayNumber = (formData.get("displayNumber") as string) || null;
  const dateNum = (formData.get("dateNum") as string) || null;

  if (!id || !title || !category) {
    return { error: "ID, title, and category are required." };
  }

  await db
    .update(event)
    .set({
      title,
      category,
      description,
      date,
      time,
      location,
      featured,
      displayNumber,
      dateNum,
      updatedAt: new Date(),
    })
    .where(eq(event.id, id));

  revalidatePath("/");
  revalidatePath("/events");
  return { success: true };
}

export async function deleteEvent(id: string) {
  await requireAdmin();

  await db.delete(event).where(eq(event.id, id));

  revalidatePath("/");
  revalidatePath("/events");
  return { success: true };
}
