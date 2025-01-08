import { Injectable } from '@nestjs/common';
import { z } from 'zod';

/**
 * 数据库配置类
 *
 * 机制说明:
 * 1. 使用@Injectable()装饰器使其可被NestJS依赖注入系统管理
 * 2. 提供实例方法和静态方法两种配置访问方式
 * 3. 使用Zod进行环境变量验证
 *
 * 要点:
 * - 支持在NestJS上下文内外访问配置
 * - 统一管理所有数据库相关配置
 * - 环境变量强类型验证
 *
 * 工作原理:
 * 1. 实例方法通过依赖注入使用
 * 2. 静态方法支持在任意上下文使用
 * 3. validateConfiguration确保配置完整性
 */
@Injectable()
export class DatabaseConfig {
  /**
   * 获取PostgreSQL连接字符串
   *
   * 机制:通过实例方法访问静态配置
   */
  get postgresqlConnection(): string {
    return DatabaseConfig.postgresqlConnection;
  }

  /**
   * 获取数据库Schema名称
   *
   * 机制:通过实例方法访问静态配置
   */
  get schemaName(): string {
    return DatabaseConfig.schemaName;
  }

  /**
   * 静态方法获取PostgreSQL连接字符串
   *
   * 机制:
   * 1. 验证并获取环境变量配置
   * 2. 构建标准连接URL
   */
  static get postgresqlConnection(): string {
    const config = DatabaseConfig.validateConfiguration();
    return `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST_NAME}:${config.DB_PORT}/${config.DB_NAME}`;
  }

  /**
   * 静态方法获取Schema名称
   *
   * 机制:从验证后的配置中获取Schema名称
   */
  static get schemaName(): string {
    const config = DatabaseConfig.validateConfiguration();
    return config.DB_SCHEMA_NAME;
  }

  /**
   * 验证环境变量配置
   *
   * 机制说明:
   * 1. 使用Zod定义配置Schema
   * 2. 强制类型转换和验证
   *
   * 验证项:
   * - DB_USER: 数据库用户名
   * - DB_PASSWORD: 数据库密码
   * - DB_HOST_NAME: 数据库主机名
   * - DB_PORT: 数据库端口
   * - DB_NAME: 数据库名称
   * - DB_SCHEMA_NAME: Schema名称
   */
  static validateConfiguration() {
    const envSchema = z.object({
      DB_USER: z.coerce.string().min(1),
      DB_PASSWORD: z.coerce.string().min(1),
      DB_HOST_NAME: z.coerce.string().min(1),
      DB_PORT: z.coerce.number().positive(),
      DB_NAME: z.coerce.string().min(1),
      DB_SCHEMA_NAME: z.coerce.string().min(1),
    });

    return envSchema.parse(process.env);
  }
}
