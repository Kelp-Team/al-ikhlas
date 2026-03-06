import {
  pgTable,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const event = pgTable("event", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  date: text("date"),
  time: text("time"),
  location: text("location"),
  featured: boolean("featured").default(false).notNull(),
  displayNumber: text("display_number"),
  dateNum: text("date_num"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
