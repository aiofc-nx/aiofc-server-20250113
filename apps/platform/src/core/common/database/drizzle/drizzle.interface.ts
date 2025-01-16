import { DrizzleConfig } from 'drizzle-orm';
import { Options, PostgresType } from 'postgres';

/**
 * Drizzle模块配置接口
 *
 * @interface DrizzleModuleConfig
 *
 * @description
 * 该接口定义了Drizzle ORM模块的配置选项
 *
 * @property postgres - PostgreSQL数据库连接配置
 * @property postgres.url - 数据库连接URL字符串
 * @property postgres.config - postgres.js的连接配置选项(可选)
 * @property schema - 数据库schema定义(可选)
 * @property config - Drizzle ORM的配置选项(可选)
 * @property tag - 用于标识特定连接池的标签(可选)
 *
 * @example
 * ```typescript
 * const config: DrizzleModuleConfig = {
 *   postgres: {
 *     url: 'postgres://user:pass@localhost:5432/db',
 *     config: {
 *       max: 10, // 最大连接数
 *       idle_timeout: 20 // 空闲超时(秒)
 *     }
 *   },
 *   schema: mySchema, // 数据库表结构定义
 *   config: {
 *     logger: true // 启用SQL查询日志
 *   },
 *   tag: 'main' // 连接池标识
 * }
 * ```
 */
export interface DrizzleModuleConfig {
  postgres: {
    url: string;
    config?: Options<Record<string, PostgresType<any>>>;
  };
  schema?: any;
  config?: DrizzleConfig<any>;
  tag?: string;
}
