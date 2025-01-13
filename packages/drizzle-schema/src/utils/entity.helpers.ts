import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
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
// export const tenantIdPk = {
//   id: uuid('tenant_id').primaryKey().default(sql.raw(`gen_random_uuid()`)),
// };

export const tenantId = {
  tenantId: varchar('tenant_id', { length: 50 }).notNull(),
};

export const common = {
  ...idPk,
  ...tracked,
};

export const commonWithTenantId = {
  ...common,
  ...tenantId,
};
