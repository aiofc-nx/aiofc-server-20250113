import { Injectable, Inject } from '@nestjs/common';
import { z } from 'zod';
import { EnvSchema } from './env-validate';

type Config = z.infer<typeof EnvSchema>;

/**
 * AppConfig 类
 *
 * 职责：
 * 1. 管理应用程序的配置
 * 2. 通过依赖注入接收配置数据
 * 3. 提供配置访问接口
 */
@Injectable()
export class AppConfig {
  private readonly config: Config;

  /**
   * @Inject('APP_CONFIG_OPTIONS') 装饰器
   * - 明确告诉 NestJS 从哪里注入依赖
   * - 'APP_CONFIG_OPTIONS' 是一个自定义标记，用于匹配 provider
   */
  constructor(@Inject('APP_CONFIG_OPTIONS') config: Config) {
    this.config = config;
  }

  get database() {
    return Object.freeze({ ...this.config.database });
  }

  get api() {
    return Object.freeze({ ...this.config.api });
  }

  get logger() {
    return Object.freeze({ ...this.config.logger });
  }
}
