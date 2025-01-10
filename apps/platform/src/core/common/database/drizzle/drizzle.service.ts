import { Inject, Injectable } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DrizzleModuleConfig } from './drizzle.interface';
import { CustomDrizzleLoggingService } from '../../../logging/custom-logging';
import { sql } from 'drizzle-orm';
import { MODULE_OPTIONS_TOKEN } from './drizzle.constants';

/**
 * DrizzleService 负责管理数据库连接和 Drizzle ORM 实例
 * 使用 @Injectable() 装饰器使其可以被 NestJS 依赖注入系统管理
 */
@Injectable()
export class DrizzleService {
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
  public getDrizzle(options: DrizzleModuleConfig) {
    if (!options?.postgres?.url) {
      throw new Error('Database connection URL is required');
    }

    return drizzle(
      postgres(options.postgres.url, {
        ...options.postgres.config,
        max: 1,
        connect_timeout: 10,
      }),
    );
  }

  async validateSchema(schemaName: string): Promise<void> {
    if (this.validSchemas.has(schemaName)) {
      return;
    }

    const db = await this.getDrizzle(this.config);
    const result = await db.execute(
      sql`SELECT EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = ${schemaName})`,
    );

    if (!result[0]?.exists) {
      throw new Error(
        `租户 schema "${schemaName}" 不存在。请联系系统管理员创建所需的数据库结构。`,
      );
    }

    this.validSchemas.add(schemaName);
  }
}
