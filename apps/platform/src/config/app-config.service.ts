import { Injectable } from '@nestjs/common';
import { ZodEnv } from '@aiofc/zod-env';
import { join } from 'path';
import { EnvSchema, EnvValidatedConfig } from './env-schema';

/**
 * AppConfig 类
 *
 * 职责：
 * 1. 管理应用程序的配置
 * 2. 通过依赖注入提供配置数据
 * 3. 提供类型安全的配置访问接口
 */
@Injectable()
export class AppConfig extends ZodEnv<EnvValidatedConfig> {
  constructor() {
    super(EnvSchema, {
      configDir: join(__dirname, 'assets'), // 指向应用的配置目录
    });
  }

  get database() {
    return Object.freeze({ ...this.config.database });
  }

  get server() {
    return Object.freeze({ ...this.config.server });
  }

  get logger() {
    return Object.freeze({ ...this.config.logger });
  }
}
