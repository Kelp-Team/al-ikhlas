import { r as requireAdmin, d as db, e as event, a as revalidatePath, g as getServerSession, p as participant, b as registerServerReference } from "../index.mjs";
import { eq, and } from "drizzle-orm";
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
async function createEvent(prevState, formData) {
  await requireAdmin();
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description") || null;
  const date = formData.get("date") || null;
  const time = formData.get("time") || null;
  const location = formData.get("location") || null;
  const featured = formData.get("featured") === "true";
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
    featured
  });
  revalidatePath("/");
  revalidatePath("/events");
  return { success: true };
}
async function updateEvent(prevState, formData) {
  await requireAdmin();
  const id = formData.get("id");
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description") || null;
  const date = formData.get("date") || null;
  const time = formData.get("time") || null;
  const location = formData.get("location") || null;
  const featured = formData.get("featured") === "true";
  if (!id || !title || !category) {
    return { error: "ID, title, and category are required." };
  }
  await db.update(event).set({
    title,
    category,
    description,
    date,
    time,
    location,
    featured,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(event.id, id));
  revalidatePath("/");
  revalidatePath("/events");
  return { success: true };
}
async function registerForEvent(eventId) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Not authenticated" };
  }
  const existing = await db.select().from(participant).where(
    and(
      eq(participant.eventId, eventId),
      eq(participant.userId, session.user.id)
    )
  ).limit(1);
  if (existing.length > 0) {
    return { alreadyRegistered: true };
  }
  await db.insert(participant).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    eventId
  });
  return { success: true };
}
async function deleteEvent(id) {
  await requireAdmin();
  await db.delete(event).where(eq(event.id, id));
  revalidatePath("/");
  revalidatePath("/events");
  return { success: true };
}
createEvent = /* @__PURE__ */ registerServerReference(createEvent, "b65591c9b59b", "createEvent");
updateEvent = /* @__PURE__ */ registerServerReference(updateEvent, "b65591c9b59b", "updateEvent");
registerForEvent = /* @__PURE__ */ registerServerReference(registerForEvent, "b65591c9b59b", "registerForEvent");
deleteEvent = /* @__PURE__ */ registerServerReference(deleteEvent, "b65591c9b59b", "deleteEvent");
export {
  createEvent,
  deleteEvent,
  registerForEvent,
  updateEvent
};
