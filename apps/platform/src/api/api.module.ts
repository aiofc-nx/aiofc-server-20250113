import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiConfig } from './config/api.config';
import { CustomLoggingModule } from '../core/logging/custom-logging/custom-logging.module';
import { LoggerUtils } from '../core/logging/utils/logger.utils';
import { JobsModule } from './modules/jobs/jobs.module';
import { TenantMiddleware } from '../core/common/tenant/tenant.middleware';
import { TenantContextService } from '../core/common/tenant/tenant-context.service';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { DrizzleModule } from '../core/common/database/drizzle/drizzle.module';
import { EntitiesSchema } from '../core/common/database/entities/entities.schema';

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
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        postgres: {
          url: `postgres://${configService.get('DB_USER')}:${configService.get('DB_PASSWORD')}@${configService.get('DB_HOST_NAME')}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`,
          config: {
            max: 1,
          },
        },
        schema: EntitiesSchema,
      }),
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
