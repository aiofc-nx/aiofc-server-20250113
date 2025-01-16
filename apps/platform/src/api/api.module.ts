import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { Logger } from '@aiofc/pino-logger';
import { JobsModule } from './modules/jobs/jobs.module';
import { TenantMiddleware } from '../core/common/tenant/tenant.middleware';
import { TenantContextService } from '../core/common/tenant/tenant-context.service';
import { ClsMiddleware, ClsModule, ClsService } from 'nestjs-cls';
import { DrizzleModule } from '../core/common/database/drizzle/drizzle.module';
import { EntitiesSchema } from '../core/common/database/entities/entities.schema';
import {
  DrizzleLoggerService,
  PINO_LOGGER_OPTIONS_PROVIDER,
  PinoLoggerService,
} from '@aiofc/pino-logger';
import { PrettyOptions } from 'pino-pretty';
import { AppConfig } from '../config/app-config.service';
import { ZodConfigModule } from '../config/zod-config.module';
import { PinoLoggerModule } from '@aiofc/pino-logger';

const loggerOptions: PrettyOptions = {
  colorize: true,
  levelFirst: true,
};

@Module({
  imports: [
    // CLS模块配置
    ClsModule.forRoot({
      global: true,
      middleware: {
        // 自动为所有路由挂载CLS中间件
        mount: true,
        // 启用请求ID生成
        generateId: true,
        // 自定义ID生成器
        idGenerator: (req) => Logger.generateLoggerIdForHttpContext(req),
        // 请求开始时记录时间戳
        setup: (cls: ClsService, _req, _res) => {
          cls.set('startTime', new Date().getTime());
        },
        // 优化性能:不保存请求和响应对象
        saveReq: false,
        saveRes: false,
      },
    }),
    ZodConfigModule,
    PinoLoggerModule,
    // 数据库模块
    DrizzleModule.forRootAsync({
      inject: [AppConfig],
      useFactory: (appConfig: AppConfig) => ({
        postgres: {
          url: `postgres://${appConfig.database.user}:${appConfig.database.password}@${appConfig.database.host}:${appConfig.database.port}/${appConfig.database.name}`,
          config: {
            max: appConfig.database.pool.max || 20,
            min: appConfig.database.pool.min || 2,
            idleTimeoutMillis: 30000,
          },
        },
        schema: EntitiesSchema,
      }),
    }),
    // 任务模块
    JobsModule,
  ],
  providers: [
    AppConfig, // 注册 AppConfig 为提供者
    // LoggerConfig,
    {
      provide: PINO_LOGGER_OPTIONS_PROVIDER,
      useValue: loggerOptions,
    },
    PinoLoggerService,
    DrizzleLoggerService,
    TenantContextService,
  ],
  exports: [PinoLoggerService, DrizzleLoggerService],
})
export class ApiModule implements NestModule, OnModuleInit {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly logger: PinoLoggerService,
  ) {}

  onModuleInit() {
    Logger.setConfig(this.appConfig);
    this.logger.info('ApiModule initialized');
  }

  /**
   * 中间件配置方法
   *
   * 机制说明:
   * 1. NestJS中间件按照应用顺序依次执行
   * 2. ClsMiddleware用于请求上下文存储,为每个请求创建独立的存储空间
   * 3. TenantMiddleware用于多租户识别与处理
   *
   * 关键要点:
   * - 使用consumer.apply()方法应用多个中间件
   * - forRoutes('*')表示对所有路由生效
   * - 中间件执行顺序: ClsMiddleware -> TenantMiddleware
   *
   * 工作原理:
   * 1. 请求进入时,先由ClsMiddleware创建请求作用域的存储空间
   * 2. TenantMiddleware随后从请求中提取租户信息并存储到CLS中
   * 3. 后续的请求处理可以随时访问租户上下文
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware, TenantMiddleware).forRoutes('*');
  }
}
