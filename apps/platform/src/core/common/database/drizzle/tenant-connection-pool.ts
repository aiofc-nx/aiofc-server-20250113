import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DrizzleModuleConfig } from './drizzle.interface';

/**
 * 租户连接池类
 *
 * 机制说明：
 * 1. 使用静态Map存储所有租户的数据库连接
 * 2. 每个租户都有独立的连接池和schema
 * 3. 采用懒加载方式，首次访问时才创建连接
 * 4. 通过search_path参数实现多租户数据隔离
 */
export class TenantConnectionPool {
  /**
   * 存储所有租户连接池的静态Map
   * key: 租户ID
   * value: 包含drizzle实例和postgres客户端的对象
   */
  private static pools: Map<
    string,
    {
      db: ReturnType<typeof drizzle>;
      client: ReturnType<typeof postgres>;
    }
  > = new Map();

  /**
   * 获取指定租户的数据库连接池
   *
   * 工作原理：
   * 1. 根据租户ID生成唯一的poolKey
   * 2. 如果连接池不存在，则创建新的连接
   * 3. 通过URL参数设置schema搜索路径
   * 4. 配置连接池参数(最大连接数、超时时间等)
   */
  static async getPool(tenantId: string, config: DrizzleModuleConfig) {
    const poolKey = `tenant_${tenantId}`;

    if (!this.pools.has(poolKey)) {
      const url = `${config.postgres.url}?options=-c%20search_path=${poolKey}`;
      const client = postgres(url, {
        ...config.postgres.config,
        max: 10, // 最大连接数
        idle_timeout: 20, // 空闲超时(秒)
        connect_timeout: 10, // 连接超时(秒)
      });
      const db = drizzle(client);

      this.pools.set(poolKey, { db, client });
      console.log(`Created new connection pool for tenant: ${tenantId}`);
    }

    return this.pools.get(poolKey).db;
  }

  /**
   * 关闭所有租户的数据库连接
   *
   * 清理机制：
   * 1. 遍历所有活跃的连接池
   * 2. 依次关闭每个租户的客户端连接
   * 3. 清空连接池Map
   */
  static async closeAll() {
    for (const [tenant, { client }] of this.pools.entries()) {
      await client.end();
      console.log(`Closed connection pool for tenant: ${tenant}`);
    }
    this.pools.clear();
  }
}
