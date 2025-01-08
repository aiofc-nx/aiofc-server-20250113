CREATE TYPE "public"."external_approvals_approval_type_enum" AS ENUM('REGISTRATION', 'PASSWORD_RESET', 'EMAIL_CHANGE');--> statement-breakpoint
CREATE TYPE "public"."roles_role_type_enum" AS ENUM('SUPER_ADMIN', 'ADMIN', 'REGULAR_USER');--> statement-breakpoint
CREATE TYPE "public"."tenants_tenant_status_enum" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."user_profile_status_enum" AS ENUM('ACTIVE', 'WAITING_FOR_EMAIL_APPROVAL', 'DEACTIVATED');--> statement-breakpoint
CREATE TYPE "public"."user_tenant_accounts_user_status_enum" AS ENUM('ACTIVE', 'DEACTIVATED');--> statement-breakpoint
CREATE TABLE "articles" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(256) NOT NULL,
	"author" varchar,
	"description" varchar(1024) NOT NULL,
	"version" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "external_approvals" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"code" varchar(128) NOT NULL,
	"approval_type" "external_approvals_approval_type_enum" NOT NULL,
	"version" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission_categories" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(512) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"version" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(1024),
	"action" varchar(256) NOT NULL,
	"permission_category_id" uuid NOT NULL,
	"version" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(512) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"role_type" "roles_role_type_enum",
	"tenant_id" uuid,
	"version" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saml_configuration" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"entry_point" varchar(2048) NOT NULL,
	"certificate" varchar(16384) NOT NULL,
	"enabled" boolean NOT NULL,
	"version" integer NOT NULL,
	CONSTRAINT "REL_0dc0cb1ac3dcdcf2a1816dce6e" UNIQUE("tenant_id")
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"tenant_id" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"tenant_friendly_identifier" varchar(127) NOT NULL,
	"tenant_name" varchar(127) NOT NULL,
	"tenant_status" "tenants_tenant_status_enum" NOT NULL,
	"owner_id" uuid NOT NULL,
	"version" integer NOT NULL,
	CONSTRAINT "REL_efba90c155ec02ae586fb7ed31" UNIQUE("owner_id")
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"email" varchar(320) NOT NULL,
	"password" varchar(256),
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"nice_name" varchar(20) NOT NULL,
	"user_name" varchar(40) NOT NULL,
	"status" "user_profile_status_enum" NOT NULL,
	"version" integer NOT NULL,
	CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_roles_permissions" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	CONSTRAINT "PK_f14c467261057c9963c1cb0025b" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "user_tenant_accounts" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_profile_id" uuid NOT NULL,
	"user_status" "user_tenant_accounts_user_status_enum" NOT NULL,
	"version" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
ALTER TABLE "external_approvals" ADD CONSTRAINT "FK_a88e27e0d96a1770cc276eee3b4" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "FK_7e41ca1f8d46cafff6d16388cec" FOREIGN KEY ("permission_category_id") REFERENCES "public"."permission_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "FK_e59a01f4fe46ebbece575d9a0fc" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saml_configuration" ADD CONSTRAINT "FK_0dc0cb1ac3dcdcf2a1816dce6e8" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "FK_efba90c155ec02ae586fb7ed31d" FOREIGN KEY ("owner_id") REFERENCES "public"."user_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles_permissions" ADD CONSTRAINT "FK_196638fa4ae8b458527eaf1e7d4" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_roles_permissions" ADD CONSTRAINT "FK_5114c23669f9b3ce2ec00ae0ca4" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_tenant_accounts" ADD CONSTRAINT "FK_011a34a9a84be37d40234c111cc" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tenant_accounts" ADD CONSTRAINT "FK_05ef03c706ad4c8736cbc22f793" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "public"."user_tenant_accounts"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "IDX_a88e27e0d96a1770cc276eee3b" ON "external_approvals" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IDX_8e1185e3ede34595b0d87a6381" ON "permission_categories" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IDX_1c1e0637ecf1f6401beb9a68ab" ON "permissions" USING btree ("action" text_ops);--> statement-breakpoint
CREATE INDEX "IDX_2bc5fb666b382723700bb4c1e7" ON "tenants" USING btree ("tenant_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IDX_79416a2533919e6524528215f6" ON "tenants" USING btree ("tenant_friendly_identifier" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IDX_e336cc51b61c40b1b1731308aa" ON "user_profile" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "IDX_196638fa4ae8b458527eaf1e7d" ON "user_roles_permissions" USING btree ("role_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_5114c23669f9b3ce2ec00ae0ca" ON "user_roles_permissions" USING btree ("permission_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_b08c6b494ca8317869cc23515e" ON "user_tenant_accounts" USING btree ("tenant_id" uuid_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "IDX_f414c35c6998cba1c730a7378e" ON "user_tenant_accounts" USING btree ("tenant_id" uuid_ops,"user_profile_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" USING btree ("role_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" USING btree ("user_id" uuid_ops);