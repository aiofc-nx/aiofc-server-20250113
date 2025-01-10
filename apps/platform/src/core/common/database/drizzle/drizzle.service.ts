import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DrizzleModuleConfig } from './drizzle.interface';
import { sql } from 'drizzle-orm';
import { TenantConnectionPool } from './tenant-connection-pool';

/**
 * DrizzleService 负责管理数据库连接和 Drizzle ORM 实例
 * 使用 @Injectable() 装饰器使其可以被 NestJS 依赖注入系统管理
 */
@Injectable()
export class DrizzleService implements OnApplicationShutdown {
  private validSchemas = new Set<string>();

  constructor(
    @Inject('DRIZZLE_OPTIONS')
    private readonly config: DrizzleModuleConfig,
  ) {}

  /**
   * 创建并配置 Drizzle ORM 实例
   * @param options - 数据库配置选项
   * @returns 配置好的 Drizzle ORM 实例
   */
  public async getDrizzle(options: DrizzleModuleConfig, tenantId: string) {
    if (!options?.postgres?.url) {
      throw new Error('Database connection URL is required');
    }

    return TenantConnectionPool.getPool(tenantId, options);
  }

  async validateSchema(schemaName: string): Promise<void> {
    if (this.validSchemas.has(schemaName)) {
      return;
    }

    // 使用基础连接来验证 schema
    const client = postgres(this.config.postgres.url, {
      max: 1,
      connect_timeout: 10,
    });
    const baseDb = drizzle(client);

    try {
      const result = await baseDb.execute(
        sql`SELECT EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = ${schemaName})`,
      );

      if (!result[0]?.exists) {
        throw new Error(
          `租户 schema "${schemaName}" 不存在。请联系系统管理员创建所需的数据库结构。`,
        );
      }

      this.validSchemas.add(schemaName);
    } finally {
      await client.end();
    }
  }
  // 在应用关闭时清理连接池
  async cleanup() {
    await TenantConnectionPool.closeAll();
  }

  async onApplicationShutdown() {
    await TenantConnectionPool.closeAll();
  }
}
