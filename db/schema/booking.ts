import {
  pgTable,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const place = pgTable("place", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  capacity: integer("capacity"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const timeSlot = pgTable("time_slot", {
  id: text("id").primaryKey(),
  placeId: text("place_id")
    .notNull()
    .references(() => place.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const booking = pgTable("booking", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  placeId: text("place_id")
    .notNull()
    .references(() => place.id),
  timeSlotId: text("time_slot_id")
    .notNull()
    .references(() => timeSlot.id),
  date: text("date").notNull(),
  guestCount: integer("guest_count"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  declineReason: text("decline_reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
