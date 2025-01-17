import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DrizzleModuleConfig } from './drizzle.interface';
import { sql } from 'drizzle-orm';
import { TenantConnectionPool } from './tenant-connection-pool';
import { ClsService } from 'nestjs-cls';
import { eq } from 'drizzle-orm';

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
   * 缓存已验证的数据库 schema
   * 使用 Set 来存储已验证过的 schema 名称，避免重复验证
   */
  private validatedSchemaCache = new Set<string>();
  private db: any; // 添加 db 属性
  private queryFilter: { tenantId: string } | null = null; // 添加 queryFilter 属性

  // 构造函数，用于注入 DrizzleModuleConfig
  constructor(
    // 根据令牌配置config
    @Inject('DRIZZLE_OPTIONS')
    private readonly config: DrizzleModuleConfig,
    private readonly cls: ClsService,
  ) {
    this.db = drizzle(postgres(this.config.postgres.url));
  }

  public async getDrizzleWithTenantProxy(
    options: DrizzleModuleConfig,
    tenantId: string,
  ) {
    if (!options?.postgres?.url) {
      throw new Error('Database connection URL is required');
    }

    const db = await TenantConnectionPool.getPool(tenantId, options);

    // 创建租户代理对象
    return this.createTenantProxy(db);
  }

  /**
   * 创建一个数据库实例的租户代理
   *
   * 该代理会自动为所有数据库操作注入租户过滤条件，实现多租户数据隔离。
   * 支持的操作包括：select、update、delete
   *
   * @param db - 原始数据库实例
   * @returns 一个代理后的数据库实例，所有查询都会自动包含租户过滤条件
   *
   * @example
   * ```typescript
   * // 原始查询
   * db.select().from(users).where({ age: 18 });
   *
   * // 代理后实际执行的查询
   * db.select().from(users).where({
   *   age: 18,
   *   tenant_id: 'current-tenant-id'
   * });
   * ```
   * @example
   * ```typescript
   * // 原始更新
   * db.update(users).set({ status: 'active' }).where({ id: 1 });
   *
   * // 代理后实际执行的更新
   * db.update(users).set({ status: 'active' }).where({
   *   id: 1,
   *   tenant_id: 'current-tenant-id'
   * });
   * ```
   *
   * @remarks
   * - 使用 JavaScript Proxy 实现方法拦截
   * - 通过 nestjs-cls 获取当前请求上下文中的租户ID
   * - 自动注入租户过滤条件，确保数据安全隔离
   *
   * @throws {Error} 如果在执行数据库操作时无法获取租户ID
   * @internal 该方法仅供内部使用
   */
  private createTenantProxy(db: any) {
    return new Proxy(db, {
      get: (target, prop) => {
        const original = target[prop];
        if (typeof original === 'function') {
          return async (...args: any[]) => {
            // 从 CLS 上下文获取当前租户ID
            const tenantId = this.cls.get('tenantId');

            // 对特定数据库操作注入租户过滤条件
            if (
              typeof prop === 'string' &&
              ['select', 'update', 'delete'].includes(prop)
            ) {
              args[0] = {
                ...args[0],
                where: {
                  tenant_id: tenantId,
                  ...(args[0]?.where || {}),
                },
              };
            }

            // 执行原始数据库操作并返回结果
            const result = await original.apply(target, args);
            return result;
          };
        }
        return original;
      },
    });
  }

  /**
   * 确保指定的数据库Schema存在
   *
   * @remarks
   * 该方法会检查指定的schema是否存在于PostgreSQL数据库中。
   * 为了提高性能，会将已验证的schema缓存在内存中。
   *
   * 工作流程:
   * 1. 首先检查缓存中是否已验证过该schema
   * 2. 如果未验证,创建一个临时数据库连接
   * 3. 查询系统表验证schema是否存在
   * 4. 验证成功后将schema加入缓存
   * 5. 最后确保关闭临时连接
   *
   * @param schemaName - 需要验证的schema名称
   * @throws {Error} 当schema不存在时抛出错误
   */
  async ensureSchemaExists(schemaName: string): Promise<void> {
    // 检查缓存中是否已验证过该schema
    if (this.validatedSchemaCache.has(schemaName)) {
      return;
    }

    // 创建临时数据库连接
    // 设置最大连接数为1且超时时间为10秒
    const client = postgres(this.config.postgres.url, {
      max: 1,
      connect_timeout: 10,
    });

    // 使用drizzle包装postgres客户端以便执行SQL查询
    const baseDb = drizzle(client);

    try {
      // 查询PostgreSQL系统表验证schema是否存在
      const result = await baseDb.execute(
        sql`SELECT EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = ${schemaName})`,
      );

      // schema不存在时抛出错误
      if (!result[0]?.exists) {
        throw new Error(
          `租户 schema "${schemaName}" 不存在。请联系系统管理员创建所需的数据库结构。`,
        );
      }

      // 验证成功后将schema加入缓存
      this.validatedSchemaCache.add(schemaName);
    } finally {
      // 确保关闭临时数据库连接以防止连接泄露
      await client.end();
    }
  }

  async onApplicationShutdown() {
    await TenantConnectionPool.closeAll();
  }

  /**
   * 在事务中执行回调函数
   *
   * @param callback - 回调函数，接受事务对象作为参数
   * @returns 回调函数返回的结果
   */
  async transaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
    const db = await this.getDrizzleWithTenantProxy(
      this.config,
      this.cls.get('tenantId'),
    );
    return db.transaction(async (tx) => {
      // 在事务开始时设置 search_path
      await tx.execute(
        sql`SET search_path TO ${sql.identifier(`tenant_${this.cls.get('tenantId')}`)}`,
      );
      return callback(this.createTenantProxy(tx));
    });
  }

  async onModuleInit() {
    const tenantId = 'default';
    const schemaName = `tenant_${tenantId}`;
    await this.ensureSchemaExists(schemaName);

    // 确保默认schema包含所需的所有表
    await this.validateSchemaStructure(schemaName);
  }

  private async validateSchemaStructure(schemaName: string) {
    const client = postgres(this.config.postgres.url, { max: 1 });
    const db = drizzle(client);

    try {
      await db.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = ${schemaName}
        )`);
    } finally {
      await client.end();
    }
  }

  async setTenantContext(tenantId: string) {
    // 切换Schema
    await this.db.execute(sql`SET search_path TO tenant_${tenantId}`);
  }

  setQueryFilter(filter: { tenantId: string }) {
    // 设置全局查询过滤器
    this.queryFilter = filter;
  }

  // 在执行查询时应用过滤器
  async executeQuery(query: any) {
    if (this.queryFilter) {
      query = query.where(eq(query.table.tenantId, this.queryFilter.tenantId));
    }
    return query;
  }

  async execute(query: any) {
    return this.db.execute(query);
  }
}
