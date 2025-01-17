import { Injectable } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { sql } from 'drizzle-orm';

@Injectable()
export class SchemaService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async createTenantSchema(tenantId: string) {
    const schemaName = `tenant_${tenantId}`;

    // 创建Schema
    await this.drizzleService.transaction(async (tx) => {
      // 创建schema
      await tx.execute(
        sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(schemaName)}`,
      );

      // 切换到新schema
      await tx.execute(sql`SET search_path TO ${sql.identifier(schemaName)}`);

      // 执行表结构迁移
      await this.migrateSchema(tx);
    });
  }

  private async migrateSchema(tx: any) {
    await tx.execute(sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id VARCHAR(50) NOT NULL,
        name VARCHAR(256) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      )
    `);
  }
}
