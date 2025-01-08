import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

/**
 * API配置服务
 *
 * 主要机制:
 * 1. 配置管理
 * - 使用@Injectable()装饰器标记为可注入服务
 * - 通过ConfigService读取环境变量
 * - 使用Zod进行配置验证和类型转换
 *
 * 2. 环境变量处理
 * - API_PORT: API服务端口配置
 * - API_GLOBAL_PREFIX: API全局路由前缀
 *
 * 3. 配置验证
 * - 使用静态方法validateConfiguration进行配置校验
 * - 为必要配置提供默认值
 * - 强制类型转换确保类型安全
 *
 * 要点:
 * - 统一的配置访问接口
 * - 类型安全的配置读取
 * - 配置验证与默认值处理
 */
@Injectable()
export class ApiConfig {
  constructor(private configService: ConfigService) {}

  /**
   * 获取API服务端口号
   *
   * 要点:
   * - 从环境变量读取端口配置
   * - 返回字符串类型便于直接使用
   */
  get getApiPortNumber(): string {
    return this.configService.get<string>('API_PORT');
  }

  /**
   * 获取API全局路由前缀
   *
   * 要点:
   * - 统一API路由前缀配置
   * - 支持自定义前缀设置
   */
  get globalPrefix(): string {
    return this.configService.get<string>('API_GLOBAL_PREFIX') || 'api';
  }

  /**
   * 验证环境配置
   *
   * 要点:
   * - 使用Zod进行配置模式定义和验证
   * - 端口号强制转换为正数
   * - 为配置项提供默认值
   */
  static validateConfiguration() {
    const envSchema = z.object({
      // API服务端口配置,默认7979
      API_PORT: z.coerce.number().positive().default(7979),
      // API全局路由前缀,默认'api'
      API_GLOBAL_PREFIX: z.coerce.string().default('api'),
    });

    return envSchema.parse(process.env);
  }
}
