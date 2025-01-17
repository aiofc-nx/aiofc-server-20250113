import { ClsModule } from 'nestjs-cls';
import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { TenantConnectionPool } from './drizzle/tenant-connection-pool';
import { AppConfig } from '../../../config/app-config.service';
import { TENANT_PG_CONNECTION } from './drizzle/drizzle.constants';
import { TenantContextService } from '../tenant/tenant-context.service';
import { TenantModule } from '../tenant/tenant.module';
import { ZodConfigModule } from '../../../config/zod-config.module';

@Module({
  imports: [ClsModule, TenantModule, ZodConfigModule],
  providers: [
    AppConfig,
    {
      provide: 'DRIZZLE_OPTIONS',
      useFactory: (appConfig: AppConfig) => ({
        postgres: {
          url: `postgres://${appConfig.database.user}:${appConfig.database.password}@${appConfig.database.host}:${appConfig.database.port}/${appConfig.database.name}`,
        },
      }),
      inject: [AppConfig],
    },
    DrizzleService,
    TenantConnectionPool,
    {
      provide: TENANT_PG_CONNECTION,
      useFactory: async (
        drizzleService: DrizzleService,
        tenantContext: TenantContextService,
        appConfig: AppConfig,
      ) => {
        const tenantId = tenantContext.getTenantId();
        if (!tenantId) {
          throw new Error('Tenant ID is required');
        }
        return drizzleService.getDrizzleWithTenantProxy(
          {
            postgres: {
              url: `postgres://${appConfig.database.user}:${appConfig.database.password}@${appConfig.database.host}:${appConfig.database.port}/${appConfig.database.name}`,
            },
          },
          tenantId,
        );
      },
      inject: [DrizzleService, TenantContextService, AppConfig],
    },
  ],
  exports: [DrizzleService, TENANT_PG_CONNECTION],
})
export class TenantDatabaseModule {}
