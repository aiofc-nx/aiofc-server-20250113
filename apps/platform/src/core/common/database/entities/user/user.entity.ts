import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { ITenantEntity } from '../../../tenant/tenant-entity.interface';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().unique('users_tenant_email_unique'),
  createdAt: timestamp('created_at').notNull().defaultNow(), // 添加创建时间
  updatedAt: timestamp('updated_at').notNull().defaultNow(), // 添加更新时间
  // ... 其他字段
});

// 类型定义
export type User = typeof users.$inferSelect & ITenantEntity;
export type NewUser = typeof users.$inferInsert & ITenantEntity;
