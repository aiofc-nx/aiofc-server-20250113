CREATE SCHEMA "aiofc";
--> statement-breakpoint
CREATE TABLE "aiofc"."jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "aiofc"."jobs" USING btree ("name");