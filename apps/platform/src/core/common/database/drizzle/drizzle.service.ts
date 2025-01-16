import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DrizzleModuleConfig } from './drizzle.interface';
import { sql } from 'drizzle-orm';
import { TenantConnectionPool } from './tenant-connection-pool';
import { ClsService } from 'nestjs-cls';

/**
 * DrizzleService 类
 *
 * 功能:
 * - 管理数据库连接和多租户隔离
 * - 处理 schema 验证
 * - 提供数据库操作接口
 *
 * @example
 * ```typescript
 * // 初始化服务
 * const drizzleService = new DrizzleService(config, clsService);
 *
 * // 获取特定租户的数据库实例
 * const db = await drizzleService.getDrizzle({
 *   postgres: {
 *     url: 'postgresql://user:pass@localhost:5432/db'
 *   }
 * }, 'tenant-123');
 *
 * // 执行查询
 * const results = await db.select().from(users);
 * ```
 *
 * @remarks
 * 该服务实现了 OnApplicationShutdown 接口，确保应用关闭时正确清理数据库连接
 */

@Injectable()
export class DrizzleService implements OnApplicationShutdown {
  /**
   * 已验证的 schema 集合
   * 使用 Set 来存储已验证的 schema，避免重复验证
   */
  private validSchemas = new Set<string>();
  // 构造函数，用于注入 DrizzleModuleConfig
  constructor(
    // 根据令牌配置config
    @Inject('DRIZZLE_OPTIONS')
    private readonly config: DrizzleModuleConfig,
    private readonly cls: ClsService,
  ) {}

  /**
   * 获取租户专用的 Drizzle 实例
   *
   * 机制:
   * 1. 参数验证
   * - 检查数据库连接配置的完整性
   * - 确保 postgres.url 必须存在
   *
   * 2. 连接池管理
   * - 通过 TenantConnectionPool 获取或创建租户专用连接池
   * - 每个租户使用独立的 schema 和连接池
   * - 复用已存在的连接以提高性能
   *
   * 原理:
   * - 利用 PostgreSQL 的 schema 实现多租户隔离
   * - 通过连接池复用减少资源开销
   * - 基于租户ID动态路由到对应的数据库连接
   * @document ../../../../../../docs/tutor/drizzle/proxy.md
   *
   * @param options - Drizzle模块配置对象
   * @param tenantId - 租户标识
   * @returns 返回租户专用的Drizzle实例
   */
  public async getDrizzle(options: DrizzleModuleConfig, tenantId: string) {
    if (!options?.postgres?.url) {
      throw new Error('Database connection URL is required');
    }

    const db = await TenantConnectionPool.getPool(tenantId, options);

    /**
     * 使用代理拦截查询
     * @param target - 目标对象
     * @param prop - 属性名
     * @returns 返回代理对象
     */
    return new Proxy(db, {
      get: (target, prop) => {
        const original = target[prop];
        if (typeof original === 'function') {
          return (...args: any[]) => {
            // 在这里添加租户过滤逻辑
            const result = original.apply(target, args);
            return result;
          };
        }
        return original;
      },
    });
  }

  async validateSchema(schemaName: string): Promise<void> {
    // 使用 Set 缓存已验证的 schema，避免重复验证
    // 如果该 schema 已经验证过，直接返回
    if (this.validSchemas.has(schemaName)) {
      return;
    }

    // 创建一个临时的数据库连接用于验证
    // max: 1 表示最大连接数为 1，因为只需要做一次验证
    // connect_timeout: 10 设置连接超时时间为 10 秒
    const client = postgres(this.config.postgres.url, {
      max: 1,
      connect_timeout: 10,
    });
    // 使用 drizzle 包装 postgres 客户端，便于执行 SQL 查询
    const baseDb = drizzle(client);

    try {
      // 查询 PostgreSQL 的系统表 information_schema.schemata
      // 检查指定的 schema 是否存在
      const result = await baseDb.execute(
        sql`SELECT EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = ${schemaName})`,
      );

      // 如果查询结果表明 schema 不存在，抛出错误
      if (!result[0]?.exists) {
        throw new Error(
          `租户 schema "${schemaName}" 不存在。请联系系统管理员创建所需的数据库结构。`,
        );
      }

      // 验证成功后，将 schema 名称添加到已验证集合中
      // 后续对同一 schema 的验证可以直接从缓存中返回
      this.validSchemas.add(schemaName);
    } finally {
      // 无论验证成功与否，都确保关闭数据库连接
      // 防止连接泄漏
      await client.end();
    }
  }

  async onApplicationShutdown() {
    await TenantConnectionPool.closeAll();
  }
}
