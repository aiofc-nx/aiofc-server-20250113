import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggingModule } from '../core/logging/custom-logging/custom-logging.module';
import { LoggerUtils } from '../core/logging/utils/logger.utils';
import { JobsModule } from './modules/jobs/jobs.module';
import { TenantMiddleware } from '../core/common/tenant/tenant.middleware';
import { TenantContextService } from '../core/common/tenant/tenant-context.service';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { DrizzleModule } from '../core/common/database/drizzle/drizzle.module';
import { EntitiesSchema } from '../core/common/database/entities/entities.schema';
// import { envValidate } from '../config/env.config';
import configuration from '../config/configuration';

@Module({
  imports: [
    // 配置模块应该最先加载
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      ignoreEnvFile: true, // 忽略 .env 文件
      ignoreEnvVars: true, // 忽略环境变量
    }),
    // 请求上下文模块
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: () => crypto.randomUUID(),
      },
    }),
    // 数据库模块
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        postgres: {
          url: `postgres://${configService.get('database.user')}:${configService.get('database.password')}@${configService.get('database.host')}:${configService.get('database.port')}/${configService.get('database.name')}`,
          config: {
            max: configService.get('database.pool.max') || 20,
            min: configService.get('database.pool.min') || 2,
            idleTimeoutMillis: 30000,
          },
        },
        schema: EntitiesSchema,
      }),
    }),
    // 自定义日志模块
    CustomLoggingModule.forRoot(LoggerUtils.httpLoggingOptions()),
    // 任务模块
    JobsModule,
  ],
  providers: [TenantContextService],
})
export class ApiModule implements NestModule {
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
