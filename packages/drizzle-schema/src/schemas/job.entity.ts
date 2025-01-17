import { check, index, pgTable, varchar } from 'drizzle-orm/pg-core';
import { commonWithTenantId } from '../utils/entity.helpers';
import { sql } from 'drizzle-orm';

export const jobs = pgTable(
  'jobs',
  {
    ...commonWithTenantId,
    name: varchar('name', { length: 256 }),
  },
  (jobs) => [
    index('name_idx').on(jobs.name),
    index('tenant_id_idx').on(jobs.tenantId),
    check('tenant_id_not_empty', sql`tenant_id != ''`),
  ],
);
/**
 * 类型定义
 *
 * Job: 用于查询时的完整实体类型
 * NewJob: 用于插入数据时的字段的组成类型
 */
export type Job = typeof jobs.$inferSelect;
export type NewJob = Pick<Job, 'name' | 'tenantId'>;
