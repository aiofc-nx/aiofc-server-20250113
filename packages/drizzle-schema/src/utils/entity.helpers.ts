import { timestamp, uuid, varchar, check, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// 主键
export const idPk = {
  id: uuid('id').primaryKey().default(sql.raw(`gen_random_uuid()`)),
};

// 追踪时间戳
export const tracked = {
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql.raw(`CURRENT_TIMESTAMP`)),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql.raw(`CURRENT_TIMESTAMP`))
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at'),
};

// 租户ID
export const tenantId = {
  tenantId: varchar('tenant_id', { length: 50 }).notNull(),
};

// 添加表级别的check约束helper
export const tenantChecks = (table: any) => ({
  notEmpty: () => check('tenant_id_not_empty', sql`tenant_id != ''`),
});

// 添加租户相关的索引helper
export const tenantIndexes = (table: any) => ({
  byTenantId: (name = 'tenant_id_idx') => index(name).on(table.tenantId),
});

export const common = {
  ...idPk,
  ...tracked,
};

export const commonWithTenantId = {
  ...common,
  ...tenantId,
};
