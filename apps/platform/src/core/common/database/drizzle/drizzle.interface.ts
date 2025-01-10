import { DrizzleConfig } from 'drizzle-orm';
import { Options, PostgresType } from 'postgres';

/**
 * Drizzle ORM 模块的配置接口
 * 用于定义数据库连接和 ORM 相关的配置选项
 */
export interface DrizzleModuleConfig {
  /** PostgreSQL 数据库的连接配置 */
  postgres: {
    /** 数据库连接 URL */
    url: string;
    /** PostgreSQL 的可选配置选项 */
    config?: Options<Record<string, PostgresType<any>>>;
  };
  /** 可选的数据库 schema 定义 */
  schema?: any;
  /** Drizzle ORM 的可选配置选项 */
  config?: DrizzleConfig<any>;
  /** 可选的连接标识符，用于区分不同的数据库连接 */
  tag?: string;
}

/**
 * 使用示例:
 *
 * ```typescript
 * const config: DrizzleModuleConfig = {
 *   postgres: {
 *     url: 'postgres://user:pass@localhost:5432/db',
 *     config: {
 *       max: 10, // 连接池最大连接数
 *       idle_timeout: 20 // 空闲超时(秒)
 *     }
 *   },
 *   schema: MyDatabaseSchema,
 *   config: {
 *     logger: true // 启用SQL查询日志
 *   },
 *   tag: 'PRIMARY_DB' // 自定义连接标识符
 * };
 * ```
 */
