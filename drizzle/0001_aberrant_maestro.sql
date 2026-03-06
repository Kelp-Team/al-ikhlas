CREATE TABLE "event" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"date" text,
	"time" text,
	"location" text,
	"featured" boolean DEFAULT false NOT NULL,
	"display_number" text,
	"date_num" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
