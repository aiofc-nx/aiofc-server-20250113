import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { Logger } from '@aiofc/pino-logger';
import { JobsModule } from './modules/jobs/jobs.module';
import { TenantIdentificationMiddleware } from '../core/common/tenant/tenant.middleware';
import { TenantContextService } from '../core/common/tenant/tenant-context.service';
import { ClsMiddleware, ClsModule, ClsService } from 'nestjs-cls';
import {
  DrizzleLoggerService,
  PINO_LOGGER_OPTIONS_PROVIDER,
  PinoLoggerService,
} from '@aiofc/pino-logger';
import { PrettyOptions } from 'pino-pretty';
import { AppConfig } from '../config/app-config.service';
import { ZodConfigModule } from '../config/zod-config.module';
import { PinoLoggerModule } from '@aiofc/pino-logger';
import { TenantDatabaseModule } from '../core/common/database/tenant-database.module';
import { TenantValidationMiddleware } from '../core/common/database/database-context.middleware';

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
    // 任务模块
    JobsModule,
    TenantDatabaseModule,
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

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ClsMiddleware,
        // 租户识别与处理
        TenantIdentificationMiddleware,
        // 租户验证
        TenantValidationMiddleware,
      )
      .forRoutes('*');
  }
}
