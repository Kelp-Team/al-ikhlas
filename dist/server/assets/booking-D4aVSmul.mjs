import { r as requireAdmin, d as db, c as place, a as revalidatePath, f as booking, g as getServerSession, t as timeSlot, b as registerServerReference } from "../index.mjs";
import { eq } from "drizzle-orm";
import "node:async_hooks";
import "../__vite_rsc_assets_manifest.js";
import "@better-auth/core/env";
import "@better-auth/core/error";
import "@better-auth/utils/random";
import "@better-auth/utils/hex";
import "@better-auth/utils/hash";
import "@better-auth/utils";
import "@noble/ciphers/chacha.js";
import "@noble/ciphers/utils.js";
import "@better-auth/core/db";
import "@better-auth/core/utils/db";
import "@noble/hashes/hkdf.js";
import "@noble/hashes/sha2.js";
import "jose";
import "@better-auth/core/utils/json";
import "zod";
import "@better-auth/utils/base64";
import "@better-auth/utils/binary";
import "@better-auth/utils/hmac";
import "@better-auth/core/context";
import "better-call";
import "@better-auth/core/utils/url";
import "@better-auth/core/api";
import "@better-auth/core/utils/deprecate";
import "@better-auth/core/utils/ip";
import "@better-auth/core/utils/id";
import "defu";
import "@better-auth/core/social-providers";
import "jose/errors";
import "@better-auth/kysely-adapter";
import "@better-auth/core/db/adapter";
import "kysely";
import "@noble/hashes/scrypt.js";
import "@noble/hashes/utils.js";
import "@better-auth/telemetry";
import "@better-auth/core";
import "@better-auth/core/oauth2";
import "@better-auth/core/utils/error-codes";
import "@better-auth/drizzle-adapter";
import "@better-fetch/fetch";
import "@better-auth/utils/otp";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@unpic/core";
async function createPlace(prevState, formData) {
  await requireAdmin();
  const name = formData.get("name");
  const description = formData.get("description") || null;
  const image = formData.get("image") || null;
  const capacity = formData.get("capacity") ? Number(formData.get("capacity")) : null;
  if (!name) {
    return { error: "Name is required." };
  }
  await db.insert(place).values({
    id: crypto.randomUUID(),
    name,
    description,
    image,
    capacity
  });
  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}
async function updatePlace(prevState, formData) {
  await requireAdmin();
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description") || null;
  const image = formData.get("image") || null;
  const capacity = formData.get("capacity") ? Number(formData.get("capacity")) : null;
  if (!id || !name) {
    return { error: "ID and name are required." };
  }
  await db.update(place).set({ name, description, image, capacity, updatedAt: /* @__PURE__ */ new Date() }).where(eq(place.id, id));
  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}
async function deletePlace(id) {
  await requireAdmin();
  await db.delete(place).where(eq(place.id, id));
  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}
async function createTimeSlot(prevState, formData) {
  await requireAdmin();
  const placeId = formData.get("placeId");
  const label = formData.get("label");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  if (!placeId || !label || !startTime || !endTime) {
    return { error: "All fields are required." };
  }
  await db.insert(timeSlot).values({
    id: crypto.randomUUID(),
    placeId,
    label,
    startTime,
    endTime
  });
  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}
async function deleteTimeSlot(id) {
  await requireAdmin();
  await db.delete(timeSlot).where(eq(timeSlot.id, id));
  revalidatePath("/places");
  revalidatePath("/booking");
  return { success: true };
}
async function createBooking(prevState, formData) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Not authenticated." };
  }
  const placeId = formData.get("placeId");
  const timeSlotId = formData.get("timeSlotId");
  const date = formData.get("date");
  const guestCount = formData.get("guestCount") ? Number(formData.get("guestCount")) : null;
  const notes = formData.get("notes") || null;
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
    notes
  });
  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}
async function cancelBooking(bookingId) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Not authenticated." };
  }
  const results = await db.select().from(booking).where(eq(booking.id, bookingId)).limit(1);
  if (results.length === 0) {
    return { error: "Booking not found." };
  }
  if (results[0].userId !== session.user.id) {
    return { error: "Not authorized." };
  }
  if (results[0].status !== "pending") {
    return { error: "Only pending bookings can be cancelled." };
  }
  await db.update(booking).set({ status: "cancelled", updatedAt: /* @__PURE__ */ new Date() }).where(eq(booking.id, bookingId));
  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}
async function acceptBooking(bookingId) {
  await requireAdmin();
  await db.update(booking).set({ status: "accepted", updatedAt: /* @__PURE__ */ new Date() }).where(eq(booking.id, bookingId));
  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}
async function declineBooking(bookingId, reason) {
  await requireAdmin();
  await db.update(booking).set({
    status: "declined",
    declineReason: reason || null,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(booking.id, bookingId));
  revalidatePath("/booking");
  revalidatePath("/booking/manage");
  return { success: true };
}
createPlace = /* @__PURE__ */ registerServerReference(createPlace, "c02c454029eb", "createPlace");
updatePlace = /* @__PURE__ */ registerServerReference(updatePlace, "c02c454029eb", "updatePlace");
deletePlace = /* @__PURE__ */ registerServerReference(deletePlace, "c02c454029eb", "deletePlace");
createTimeSlot = /* @__PURE__ */ registerServerReference(createTimeSlot, "c02c454029eb", "createTimeSlot");
deleteTimeSlot = /* @__PURE__ */ registerServerReference(deleteTimeSlot, "c02c454029eb", "deleteTimeSlot");
createBooking = /* @__PURE__ */ registerServerReference(createBooking, "c02c454029eb", "createBooking");
cancelBooking = /* @__PURE__ */ registerServerReference(cancelBooking, "c02c454029eb", "cancelBooking");
acceptBooking = /* @__PURE__ */ registerServerReference(acceptBooking, "c02c454029eb", "acceptBooking");
declineBooking = /* @__PURE__ */ registerServerReference(declineBooking, "c02c454029eb", "declineBooking");
export {
  acceptBooking,
  cancelBooking,
  createBooking,
  createPlace,
  createTimeSlot,
  declineBooking,
  deletePlace,
  deleteTimeSlot,
  updatePlace
};
