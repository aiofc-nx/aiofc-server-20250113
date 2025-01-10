import { index, pgSchema, varchar } from 'drizzle-orm/pg-core';
import { commonWithTenantId } from '../utils/entity.helpers';
// see:https://orm.drizzle.team/docs/sql-schema-declaration#advanced
// name:'aiofc'会作为数据库的schema的名字
export const aiofcSchema = pgSchema('aiofc');

export const jobs = aiofcSchema.table(
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
 * JobEntityInsert: 用于插入数据时的类型(可选字段)
 */
export type JobEntity = typeof jobs.$inferSelect;
export type JobEntityInsert = typeof jobs.$inferInsert;
