import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfig } from './config/api.config';
import { CustomLoggingModule } from '../core/logging/custom-logging/custom-logging.module';
import { LoggerUtils } from '../core/logging/utils/logger.utils';
import { JobsModule } from './modules/jobs/jobs.module';
import { TenantMiddleware } from '../core/common/tenant/tenant.middleware';
import { TenantContextService } from '../core/common/tenant/tenant-context.service';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: () => crypto.randomUUID(),
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: ApiConfig.validateConfiguration,
    }),
    CustomLoggingModule.forRoot(LoggerUtils.httpLoggingOptions()),
    JobsModule,
  ],
  providers: [ApiConfig, TenantContextService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware, TenantMiddleware).forRoutes('*');
  }
}
