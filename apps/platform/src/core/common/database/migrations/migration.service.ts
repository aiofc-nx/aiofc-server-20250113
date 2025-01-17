import { Injectable, Logger } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { sql } from 'drizzle-orm';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(private readonly drizzleService: DrizzleService) {}

  async applyMigrations(tenantId: string) {
    if (!/^[a-zA-Z0-9_-]+$/.test(tenantId)) {
      throw new Error('Invalid tenant ID format');
    }
    const schemaName = `tenant_${tenantId}`;

    const lockKey = `migration_lock_${tenantId}`;
    try {
      // 获取迁移锁
      await this.drizzleService.transaction(async (tx) => {
        const locked = await tx.execute(sql`
          SELECT pg_try_advisory_lock(${sql.raw(`hashtext('${lockKey}')`)})
        `);

        if (!locked[0].pg_try_advisory_lock) {
          throw new Error('Migration is already in progress');
        }

        this.logger.log(`Starting migrations for tenant: ${tenantId}`);

        // 创建版本控制表
        await tx.execute(sql`
          CREATE TABLE IF NOT EXISTS ${sql.identifier(schemaName)}.schema_versions (
            version VARCHAR(255) PRIMARY KEY,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(50) NOT NULL DEFAULT 'success',
            error_message TEXT,
            executed_by VARCHAR(255)
          )
        `);

        // 获取已应用的迁移版本
        const appliedMigrations = await tx.execute(sql`
          SELECT version FROM ${sql.identifier(schemaName)}.schema_versions
          ORDER BY applied_at DESC
        `);

        // 执行未应用的迁移
        for (const migration of this.getMigrations()) {
          try {
            if (!appliedMigrations.includes(migration.version)) {
              this.logger.log(
                `Applying migration ${migration.version} for tenant ${tenantId}`,
              );
              await migration.up(tx, schemaName);
              await tx.execute(sql`
                INSERT INTO ${sql.identifier(schemaName)}.schema_versions (version)
                VALUES (${migration.version})
              `);
              this.logger.log(
                `Successfully applied migration ${migration.version}`,
              );
            }
          } catch (error) {
            this.logger.error(
              `Failed to apply migration ${migration.version}: ${error.message}`,
              error.stack,
            );
            throw error;
          }
        }

        this.logger.log(`Completed migrations for tenant: ${tenantId}`);
      });
    } finally {
      // 释放迁移锁
      await this.drizzleService.execute(sql`
        SELECT pg_advisory_unlock(${sql.raw(`hashtext('${lockKey}')`)})
      `);
    }
  }

  private getMigrations() {
    // 返回所有迁移脚本
    return [
      // 示例迁移
      {
        version: '001',
        up: async (tx: any, schema: string) => {
          await tx.execute(sql`
            CREATE TABLE IF NOT EXISTS ${sql.identifier(schema)}.users (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              tenant_id VARCHAR(50) NOT NULL,
              name VARCHAR(255) NOT NULL
            )
          `);
        },
      },
      // 添加更多迁移脚本
    ];
  }
}
