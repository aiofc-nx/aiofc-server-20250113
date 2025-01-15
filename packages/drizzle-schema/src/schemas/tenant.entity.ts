import { index, pgTable, varchar } from 'drizzle-orm/pg-core';
import { common } from '../utils/entity.helpers';

export const tenants = pgTable(
  'tenants',
  {
    ...common,
    name: varchar('name', { length: 128 }).default('tenant_default'),
  },
  (tenants) => [index('tenant_name_idx').on(tenants.name)],
);

/**
 * 类型定义
 *
 * Tenant: 用于查询时的完整实体类型
 * NewTenant: 用于插入数据时的字段的组成类型
 */
export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = Pick<Tenant, 'name'>;
