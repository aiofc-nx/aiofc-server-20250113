import { index, pgTable, varchar } from 'drizzle-orm/pg-core';
import {
  commonWithTenantId,
  tenantChecks,
  tenantIndexes,
} from '../utils/entity.helpers';

export const jobs = pgTable(
  'jobs',
  {
    ...commonWithTenantId,
    name: varchar('name', { length: 256 }),
  },
  (table) => [
    index('name_idx').on(table.name),
    tenantIndexes(table).byTenantId(),
    tenantChecks(table).notEmpty(),
  ],
);

export type Job = typeof jobs.$inferSelect;
export type NewJob = Pick<Job, 'name' | 'tenantId'>;
