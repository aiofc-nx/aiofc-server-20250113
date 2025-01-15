import { index, pgTable, varchar } from 'drizzle-orm/pg-core';
import { commonWithTenantId } from '../utils/entity.helpers';

export const jobs = pgTable(
  'jobs',
  {
    ...commonWithTenantId,
    name: varchar('name', { length: 256 }),
  },
  (jobs) => [index('name_idx').on(jobs.name)], // 索引
);
/**
 * 类型定义
 *
 * JobEntity: 用于查询时的完整实体类型
 * JobEntityInsert: 用于插入数据时的字段的组成类型
 */
export type JobEntity = typeof jobs.$inferSelect;
export type JobEntityInsert = Pick<JobEntity, 'name' | 'tenantId'>;
