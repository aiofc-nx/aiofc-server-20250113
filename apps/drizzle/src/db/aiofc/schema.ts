import { pgTable, timestamp, uuid, varchar, integer, uniqueIndex, foreignKey, unique, index, boolean, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const externalApprovalsApprovalTypeEnum = pgEnum("external_approvals_approval_type_enum", ['REGISTRATION', 'PASSWORD_RESET', 'EMAIL_CHANGE'])
export const rolesRoleTypeEnum = pgEnum("roles_role_type_enum", ['SUPER_ADMIN', 'ADMIN', 'REGULAR_USER'])
export const tenantsTenantStatusEnum = pgEnum("tenants_tenant_status_enum", ['ACTIVE', 'INACTIVE'])
export const userProfileStatusEnum = pgEnum("user_profile_status_enum", ['ACTIVE', 'WAITING_FOR_EMAIL_APPROVAL', 'DEACTIVATED'])
export const userTenantAccountsUserStatusEnum = pgEnum("user_tenant_accounts_user_status_enum", ['ACTIVE', 'DEACTIVATED'])


export const articles = pgTable("articles", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	title: varchar({ length: 256 }).notNull(),
	author: varchar(),
	description: varchar({ length: 1024 }).notNull(),
	version: integer().notNull(),
});

export const permissionCategories = pgTable("permission_categories", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 512 }).notNull(),
	description: varchar({ length: 1024 }).notNull(),
	version: integer().notNull(),
}, (table) => [
	uniqueIndex("IDX_8e1185e3ede34595b0d87a6381").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const permissions = pgTable("permissions", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 256 }).notNull(),
	description: varchar({ length: 1024 }),
	action: varchar({ length: 256 }).notNull(),
	permissionCategoryId: uuid("permission_category_id").notNull(),
	version: integer().notNull(),
}, (table) => [
	uniqueIndex("IDX_1c1e0637ecf1f6401beb9a68ab").using("btree", table.action.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.permissionCategoryId],
			foreignColumns: [permissionCategories.id],
			name: "FK_7e41ca1f8d46cafff6d16388cec"
		}),
]);

export const userProfile = pgTable("user_profile", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	email: varchar({ length: 320 }).notNull(),
	password: varchar({ length: 256 }),
	firstName: varchar("first_name", { length: 20 }).notNull(),
	lastName: varchar("last_name", { length: 20 }).notNull(),
	niceName: varchar("nice_name", { length: 20 }).notNull(),
	userName: varchar("user_name", { length: 40 }).notNull(),
	status: userProfileStatusEnum().notNull(),
	version: integer().notNull(),
}, (table) => [
	uniqueIndex("IDX_e336cc51b61c40b1b1731308aa").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("UQ_e336cc51b61c40b1b1731308aa5").on(table.email),
]);

export const userTenantAccounts = pgTable("user_tenant_accounts", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	userProfileId: uuid("user_profile_id").notNull(),
	userStatus: userTenantAccountsUserStatusEnum("user_status").notNull(),
	version: integer().notNull(),
}, (table) => [
	index("IDX_b08c6b494ca8317869cc23515e").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("IDX_f414c35c6998cba1c730a7378e").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops"), table.userProfileId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userProfileId],
			foreignColumns: [userProfile.id],
			name: "FK_011a34a9a84be37d40234c111cc"
		}),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "FK_05ef03c706ad4c8736cbc22f793"
		}),
]);

export const tenants = pgTable("tenants", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	tenantId: varchar("tenant_id").notNull(),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	tenantFriendlyIdentifier: varchar("tenant_friendly_identifier", { length: 127 }).notNull(),
	tenantName: varchar("tenant_name", { length: 127 }).notNull(),
	tenantStatus: tenantsTenantStatusEnum("tenant_status").notNull(),
	ownerId: uuid("owner_id").notNull(),
	version: integer().notNull(),
}, (table) => [
	index("IDX_2bc5fb666b382723700bb4c1e7").using("btree", table.tenantId.asc().nullsLast().op("text_ops")),
	uniqueIndex("IDX_79416a2533919e6524528215f6").using("btree", table.tenantFriendlyIdentifier.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [userProfile.id],
			name: "FK_efba90c155ec02ae586fb7ed31d"
		}),
	unique("REL_efba90c155ec02ae586fb7ed31").on(table.ownerId),
]);

export const samlConfiguration = pgTable("saml_configuration", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	entryPoint: varchar("entry_point", { length: 2048 }).notNull(),
	certificate: varchar({ length: 16384 }).notNull(),
	enabled: boolean().notNull(),
	version: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "FK_0dc0cb1ac3dcdcf2a1816dce6e8"
		}),
	unique("REL_0dc0cb1ac3dcdcf2a1816dce6e").on(table.tenantId),
]);

export const roles = pgTable("roles", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 512 }).notNull(),
	description: varchar({ length: 1024 }).notNull(),
	roleType: rolesRoleTypeEnum("role_type"),
	tenantId: uuid("tenant_id"),
	version: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "FK_e59a01f4fe46ebbece575d9a0fc"
		}),
]);

export const externalApprovals = pgTable("external_approvals", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	code: varchar({ length: 128 }).notNull(),
	approvalType: externalApprovalsApprovalTypeEnum("approval_type").notNull(),
	version: integer().notNull(),
}, (table) => [
	index("IDX_a88e27e0d96a1770cc276eee3b").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfile.id],
			name: "FK_a88e27e0d96a1770cc276eee3b4"
		}),
]);

export const usersRoles = pgTable("users_roles", {
	userId: uuid("user_id").notNull(),
	roleId: uuid("role_id").notNull(),
}, (table) => [
	index("IDX_1cf664021f00b9cc1ff95e17de").using("btree", table.roleId.asc().nullsLast().op("uuid_ops")),
	index("IDX_e4435209df12bc1f001e536017").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userTenantAccounts.id],
			name: "FK_e4435209df12bc1f001e5360174"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "FK_1cf664021f00b9cc1ff95e17de4"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.roleId], name: "PK_c525e9373d63035b9919e578a9c"}),
]);

export const userRolesPermissions = pgTable("user_roles_permissions", {
	roleId: uuid("role_id").notNull(),
	permissionId: uuid("permission_id").notNull(),
}, (table) => [
	index("IDX_196638fa4ae8b458527eaf1e7d").using("btree", table.roleId.asc().nullsLast().op("uuid_ops")),
	index("IDX_5114c23669f9b3ce2ec00ae0ca").using("btree", table.permissionId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "FK_196638fa4ae8b458527eaf1e7d4"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [permissions.id],
			name: "FK_5114c23669f9b3ce2ec00ae0ca4"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.roleId, table.permissionId], name: "PK_f14c467261057c9963c1cb0025b"}),
]);
