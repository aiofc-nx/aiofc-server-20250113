CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"tenant_id" varchar(50) NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(128) DEFAULT 'tenant_default'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	"tenant_id" varchar(50) NOT NULL,
	"name" varchar(64) NOT NULL,
	"nickname" varchar(64),
	"email" varchar(128) NOT NULL,
	CONSTRAINT "users_tenant_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "jobs" USING btree ("name");--> statement-breakpoint
CREATE INDEX "tenant_name_idx" ON "tenants" USING btree ("name");