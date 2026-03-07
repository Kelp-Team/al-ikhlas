import {
  pgTable,
  text,
  boolean,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const event = pgTable("event", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  date: text("date"),
  time: text("time"),
  location: text("location"),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const participant = pgTable(
  "participant",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    eventId: text("event_id")
      .notNull()
      .references(() => event.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [unique().on(t.userId, t.eventId)]
);
