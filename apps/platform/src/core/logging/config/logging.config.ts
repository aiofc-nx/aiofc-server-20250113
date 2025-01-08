import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * 日志配置类
 *
 * 机制说明:
 * 1. 使用 @Injectable() 装饰器标记该类可被依赖注入系统使用
 * 2. 通过 ConfigService 读取环境配置
 * 3. 使用 Zod 进行环境变量的验证
 *
 * 主要功能:
 * - 提供追踪ID请求头的配置获取
 * - 验证环境变量配置的正确性
 *
 * 关键点:
 * 1. trackingIdHeader 使用 getter 方法便于访问配置
 * 2. validateConfiguration 静态方法用于启动时验证环境变量
 * 3. 支持可选的 TRACKING_ID_HEADER 配置项
 */
@Injectable()
export class LoggingConfig {
  constructor(private configService: ConfigService) {}

  /**
   * 获取追踪ID的请求头名称
   * 从环境变量 TRACKING_ID_HEADER 中读取配置
   */
  get trackingIdHeader(): string {
    return this.configService.get<string>('TRACKING_ID_HEADER');
  }

  /**
   * 验证环境变量配置
   * 使用 Zod 验证环境变量的类型和格式
   */
  static validateConfiguration() {
    const envSchema = z.object({
      // 追踪ID请求头配置，可选字符串类型
      TRACKING_ID_HEADER: z.coerce.string().optional(),
    });

    return envSchema.parse(process.env);
  }
}
