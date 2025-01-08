import { DynamicModule, Module } from '@nestjs/common';
import { PrettyOptions } from 'pino-pretty';
import { ClsModule, ClsService } from 'nestjs-cls';
import { ConfigModule } from '@nestjs/config';
import { LoggingConfig } from '../config/logging.config';
import { CUSTOM_LOGGING_OPTIONS_PROVIDER } from './custom-logging-options.interface';
import { CustomLoggingService } from './custom-logging.service';
import { CustomDrizzleLoggingService } from './custom-drizzle-logging.service';
import { LoggerUtils } from '../utils/logger.utils';

/**
 * 自定义日志模块
 *
 * 核心机制:
 * 1. 使用动态模块模式(DynamicModule)实现运行时配置
 * 2. 通过依赖注入提供日志配置选项
 * 3. 集成CLS(Continuation Local Storage)实现请求上下文追踪
 */
@Module({})
export class CustomLoggingModule {
  /**
   * 模块的静态工厂方法
   *
   * 主要功能:
   * 1. 配置提供者(Providers)
   *    - LoggingConfig: 日志配置服务
   *    - CUSTOM_LOGGING_OPTIONS_PROVIDER: 自定义日志选项
   *    - CustomLoggingService: 主日志服务
   *    - CustomDrizzleLoggingService: Drizzle ORM日志服务
   *
   * 2. 导入依赖模块
   *    - ConfigModule: 用于验证日志配置
   *    - ClsModule: 实现请求上下文存储
   *
   * 3. 导出服务供其他模块使用
   */
  static forRoot(loggingOptions: PrettyOptions): DynamicModule {
    return {
      module: CustomLoggingModule,
      providers: [
        LoggingConfig,
        {
          provide: CUSTOM_LOGGING_OPTIONS_PROVIDER,
          useValue: loggingOptions,
        },
        CustomLoggingService,
        CustomDrizzleLoggingService,
      ],
      imports: [
        ConfigModule.forRoot({
          validate: LoggingConfig.validateConfiguration,
        }),
        // CLS模块配置
        ClsModule.forRoot({
          global: true,
          middleware: {
            // 自动为所有路由挂载CLS中间件
            mount: true,
            // 启用请求ID生成
            generateId: true,
            // 自定义ID生成器
            idGenerator: (req) =>
              LoggerUtils.generateLoggingIdForHttpContext(req),
            // 请求开始时记录时间戳
            setup: (cls: ClsService, req, res) => {
              cls.set('startTime', new Date().getTime());
            },
            // 优化性能:不保存请求和响应对象
            saveReq: false,
            saveRes: false,
          },
        }),
      ],
      exports: [CustomLoggingService, CustomDrizzleLoggingService],
    };
  }
}
