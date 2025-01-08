export declare const permissionsRelations: import("drizzle-orm/relations").Relations<"permissions", {
    permissionCategory: import("drizzle-orm/relations").One<"permission_categories", true>;
    userRolesPermissions: import("drizzle-orm/relations").Many<"user_roles_permissions">;
}>;
export declare const permissionCategoriesRelations: import("drizzle-orm/relations").Relations<"permission_categories", {
    permissions: import("drizzle-orm/relations").Many<"permissions">;
}>;
export declare const userTenantAccountsRelations: import("drizzle-orm/relations").Relations<"user_tenant_accounts", {
    userProfile: import("drizzle-orm/relations").One<"user_profile", true>;
    tenant: import("drizzle-orm/relations").One<"tenants", true>;
    usersRoles: import("drizzle-orm/relations").Many<"users_roles">;
}>;
export declare const userProfileRelations: import("drizzle-orm/relations").Relations<"user_profile", {
    userTenantAccounts: import("drizzle-orm/relations").Many<"user_tenant_accounts">;
    tenants: import("drizzle-orm/relations").Many<"tenants">;
    externalApprovals: import("drizzle-orm/relations").Many<"external_approvals">;
}>;
export declare const tenantsRelations: import("drizzle-orm/relations").Relations<"tenants", {
    userTenantAccounts: import("drizzle-orm/relations").Many<"user_tenant_accounts">;
    userProfile: import("drizzle-orm/relations").One<"user_profile", true>;
    samlConfigurations: import("drizzle-orm/relations").Many<"saml_configuration">;
    roles: import("drizzle-orm/relations").Many<"roles">;
}>;
export declare const samlConfigurationRelations: import("drizzle-orm/relations").Relations<"saml_configuration", {
    tenant: import("drizzle-orm/relations").One<"tenants", true>;
}>;
export declare const rolesRelations: import("drizzle-orm/relations").Relations<"roles", {
    tenant: import("drizzle-orm/relations").One<"tenants", false>;
    usersRoles: import("drizzle-orm/relations").Many<"users_roles">;
    userRolesPermissions: import("drizzle-orm/relations").Many<"user_roles_permissions">;
}>;
export declare const externalApprovalsRelations: import("drizzle-orm/relations").Relations<"external_approvals", {
    userProfile: import("drizzle-orm/relations").One<"user_profile", true>;
}>;
export declare const usersRolesRelations: import("drizzle-orm/relations").Relations<"users_roles", {
    userTenantAccount: import("drizzle-orm/relations").One<"user_tenant_accounts", true>;
    role: import("drizzle-orm/relations").One<"roles", true>;
}>;
export declare const userRolesPermissionsRelations: import("drizzle-orm/relations").Relations<"user_roles_permissions", {
    role: import("drizzle-orm/relations").One<"roles", true>;
    permission: import("drizzle-orm/relations").One<"permissions", true>;
}>;
