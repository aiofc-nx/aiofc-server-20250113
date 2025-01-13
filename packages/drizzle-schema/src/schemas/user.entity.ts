import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { commonWithTenantId } from '../utils/entity.helpers';

export const users = pgTable('users', {
  ...commonWithTenantId,

  name: varchar('name', { length: 64 }).notNull(),
  nickname: varchar('nickname', { length: 64 }),
  email: varchar('email', { length: 128 })
    .notNull()
    .unique('users_tenant_email_unique'), // 唯一性约束
});

// 类型定义
export type User = typeof users.$inferSelect;
export type NewUser = Pick<User, 'name' | 'email' | 'tenantId'>;

/**
 * 说明：
 * 1.每个用户的email是唯一的，作为身份标识
 * 2.每个用户都应该隶属于一个租户
 */
