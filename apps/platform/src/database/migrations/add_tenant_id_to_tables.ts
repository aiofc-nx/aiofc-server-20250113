import { sql } from 'drizzle-orm';

export async function addTenantIdToTables() {
  // 为现有表添加tenant_id列
  await sql`
    DO $$ 
    BEGIN 
      ALTER TABLE users ADD COLUMN IF NOT EXISTS tenant_id TEXT NOT NULL;
      CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
      
      -- 为其他需要租户隔离的表添加相同的列和索引
      -- ALTER TABLE other_table ADD COLUMN IF NOT EXISTS tenant_id TEXT NOT NULL;
      -- CREATE INDEX IF NOT EXISTS idx_other_table_tenant_id ON other_table(tenant_id);
    END $$;
  `;
}
