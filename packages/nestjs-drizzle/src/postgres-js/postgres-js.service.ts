import { Injectable } from '@nestjs/common';
import postgres from 'postgres';
import { DrizzlePostgresConfig } from './postgres-js.interface';
import { drizzle } from 'drizzle-orm/postgres-js';
/**
 * DrizzlePostgres服务类
 *
 * 主要功能:
 * - 创建和管理PostgreSQL数据库连接
 * - 初始化Drizzle ORM实例
 *
 * 实现机制:
 * 1. 使用@Injectable()装饰器标记为可注入的服务
 * 2. 通过postgres.js创建数据库客户端连接
 * 3. 使用drizzle-orm包装客户端实现ORM功能
 *
 * 使用要点:
 * - 需要传入正确的数据库连接配置
 * - postgres配置包含url和其他连接参数
 * - 支持可选的drizzle ORM配置项
 */
@Injectable()
export class DrizzlePostgresService {
  /**
   * 获取Drizzle ORM实例
   * @param options 数据库配置选项
   * @returns Drizzle ORM实例
   */
  public getDrizzle(options: DrizzlePostgresConfig) {
    const client = postgres(options.postgres.url, options.postgres.config);
    return drizzle(client, options.config || {});
  }
}
