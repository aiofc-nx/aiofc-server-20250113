import { DrizzleConfig } from 'drizzle-orm';
import { Options, PostgresType } from 'postgres';

/**
 * Drizzle PostgreSQL 配置接口
 *
 * 机制说明:
 * 1. 定义PostgreSQL数据库连接和Drizzle ORM的配置结构
 * 2. 使用TypeScript接口确保类型安全
 * 3. 支持可选配置参数的灵活配置
 *
 * 主要配置:
 * 1. postgres对象:
 *    - url: 数据库连接字符串
 *    - config: postgres.js的连接配置选项(可选)
 * 2. config: Drizzle ORM的全局配置选项(可选)
 *
 * 要点:
 * - 使用泛型支持自定义PostgreSQL类型
 * - 通过可选参数提供配置灵活性
 * - 集成postgres.js和Drizzle ORM的配置类型
 *
 * 工作原理:
 * 1. 在创建数据库连接时使用此配置接口
 * 2. 验证并应用用户提供的配置选项
 * 3. 确保配置参数类型正确性
 */
export interface DrizzlePostgresConfig {
  postgres: {
    url: string;
    config?: Options<Record<string, PostgresType<any>>> | undefined;
  };
  config?: DrizzleConfig<any> | undefined;
}
