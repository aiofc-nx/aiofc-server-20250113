import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './postgres-js.definition';
import { DrizzlePostgresService } from './postgres-js.service';
import { DrizzlePostgresConfig } from './postgres-js.interface';

/**
 * DrizzlePostgres模块
 *
 * 机制说明:
 * 1. 通过@Global()装饰器将模块声明为全局模块
 * 2. 继承ConfigurableModuleClass以支持动态模块配置
 * 3. 提供同步(register)和异步(registerAsync)两种注册方式
 *
 * 主要功能:
 * - 注册DrizzlePostgresService服务
 * - 根据配置创建并导出Drizzle实例
 * - 支持多实例通过tag区分
 */
@Global()
export class DrizzlePostgresModule extends ConfigurableModuleClass {
  /**
   * 同步注册方法
   *
   * 要点:
   * 1. 接收静态配置选项
   * 2. 注册DrizzlePostgresService
   * 3. 通过useFactory创建Drizzle实例
   * 4. 支持自定义tag,默认为'default'
   */
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzlePostgresService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzlePostgresService],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }

  /**
   * 异步注册方法
   *
   * 要点:
   * 1. 接收异步配置选项
   * 2. 注册DrizzlePostgresService
   * 3. 通过useFactory异步创建Drizzle实例
   * 4. 注入MODULE_OPTIONS_TOKEN获取配置
   * 5. 支持自定义tag,默认为'default'
   */
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    // 从父类的registerAsync方法获取基础配置
    // providers: 提供者数组,默认为空数组
    // exports: 导出项数组,默认为空数组
    // props: 其他配置属性
    const {
      providers = [],
      exports = [],
      ...props
    } = super.registerAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzlePostgresService,
            config: DrizzlePostgresConfig,
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzlePostgresService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
