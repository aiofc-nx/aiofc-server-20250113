import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

/**
 * 通用修改时间字段配置对象
 *
 * 机制说明:
 * 1. 提供创建时间(created_at)和更新时间(updated_at)两个时间戳字段
 * 2. 创建时间在记录插入时自动设置为当前时间戳
 * 3. 更新时间在记录更新时自动更新为最新时间
 *
 * 要点:
 * - 使用PostgreSQL的TIMESTAMP类型存储时间
 * - 两个字段都设置为NOT NULL确保数据完整性
 * - created_at使用数据库CURRENT_TIMESTAMP函数设置默认值
 * - updated_at通过onUpdate触发器自动更新
 *
 * 原理:
 * - CURRENT_TIMESTAMP在数据库层面生成时间戳,保证准确性
 * - $onUpdateFn在每次更新操作时自动执行
 * - 时间戳记录能帮助追踪数据变更历史
 */
export const WithModificationDates = {
  createdAt: timestamp('created_at').notNull().default(sql.raw(`CURRENT_TIMESTAMP`)),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
};
