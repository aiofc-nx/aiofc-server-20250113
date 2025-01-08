import { relations } from "drizzle-orm/relations";
import { permissionCategories, permissions, userProfile, userTenantAccounts, tenants, samlConfiguration, roles, externalApprovals, usersRoles, userRolesPermissions } from "./schema";

export const permissionsRelations = relations(permissions, ({one, many}) => ({
	permissionCategory: one(permissionCategories, {
		fields: [permissions.permissionCategoryId],
		references: [permissionCategories.id]
	}),
	userRolesPermissions: many(userRolesPermissions),
}));

export const permissionCategoriesRelations = relations(permissionCategories, ({many}) => ({
	permissions: many(permissions),
}));

export const userTenantAccountsRelations = relations(userTenantAccounts, ({one, many}) => ({
	userProfile: one(userProfile, {
		fields: [userTenantAccounts.userProfileId],
		references: [userProfile.id]
	}),
	tenant: one(tenants, {
		fields: [userTenantAccounts.tenantId],
		references: [tenants.id]
	}),
	usersRoles: many(usersRoles),
}));

export const userProfileRelations = relations(userProfile, ({many}) => ({
	userTenantAccounts: many(userTenantAccounts),
	tenants: many(tenants),
	externalApprovals: many(externalApprovals),
}));

export const tenantsRelations = relations(tenants, ({one, many}) => ({
	userTenantAccounts: many(userTenantAccounts),
	userProfile: one(userProfile, {
		fields: [tenants.ownerId],
		references: [userProfile.id]
	}),
	samlConfigurations: many(samlConfiguration),
	roles: many(roles),
}));

export const samlConfigurationRelations = relations(samlConfiguration, ({one}) => ({
	tenant: one(tenants, {
		fields: [samlConfiguration.tenantId],
		references: [tenants.id]
	}),
}));

export const rolesRelations = relations(roles, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [roles.tenantId],
		references: [tenants.id]
	}),
	usersRoles: many(usersRoles),
	userRolesPermissions: many(userRolesPermissions),
}));

export const externalApprovalsRelations = relations(externalApprovals, ({one}) => ({
	userProfile: one(userProfile, {
		fields: [externalApprovals.userId],
		references: [userProfile.id]
	}),
}));

export const usersRolesRelations = relations(usersRoles, ({one}) => ({
	userTenantAccount: one(userTenantAccounts, {
		fields: [usersRoles.userId],
		references: [userTenantAccounts.id]
	}),
	role: one(roles, {
		fields: [usersRoles.roleId],
		references: [roles.id]
	}),
}));

export const userRolesPermissionsRelations = relations(userRolesPermissions, ({one}) => ({
	role: one(roles, {
		fields: [userRolesPermissions.roleId],
		references: [roles.id]
	}),
	permission: one(permissions, {
		fields: [userRolesPermissions.permissionId],
		references: [permissions.id]
	}),
}));