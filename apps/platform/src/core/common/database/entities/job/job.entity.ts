import { index, pgTable, varchar, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { WithIdPk } from '../helpers/with-id-pk';
import { WithModificationDates } from '../helpers/with-modification-dates';

/**
 * Job实体表定义
 *
 * 机制说明:
 * 1. 使用pgTable定义PostgreSQL数据表结构
 * 2. 通过扩展运算符...继承基础字段:
 *    - WithIdPk: 主键ID字段
 *    - WithModificationDates: 创建/更新时间字段
 *
 * 表结构:
 * - 表名: jobs
 * - 字段:
 *   - id: UUID主键 (来自WithIdPk)
 *   - name: VARCHAR(256) 任务名称
 *   - createdAt: 创建时间 (来自WithModificationDates)
 *   - updatedAt: 更新时间 (来自WithModificationDates)
 *
 * 索引:
 * - nameIdx: 任务名称索引,提升查询性能
 */
export const jobs = pgTable(
  'jobs',
  {
    ...WithIdPk,
    name: varchar('name', { length: 256 }),
    tenantId: varchar('tenant_id', { length: 50 }).notNull(),
    ...WithModificationDates,
  },
  (jobs) => [
    index('name_idx').on(jobs.name),
    index('tenant_id_idx').on(jobs.tenantId),
    check('tenant_id_not_empty', sql`tenant_id != ''`),
  ],
);
