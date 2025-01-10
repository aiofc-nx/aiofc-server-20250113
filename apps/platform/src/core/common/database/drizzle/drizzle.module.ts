import { DynamicModule, Module, Scope } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { DrizzleModuleConfig } from './drizzle.interface';
import { PG_CONNECTION } from './pg-connection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenantContextService } from '../../tenant/tenant-context.service';
import { TenantModule } from '../../tenant/tenant.module';

export class DrizzleModule {
  static register(config: DrizzleModuleConfig): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: 'DRIZZLE_OPTIONS',
          useValue: config,
        },
        DrizzleService,
        {
          provide: PG_CONNECTION,
          useFactory: async (drizzleService: DrizzleService) => {
            return drizzleService.getDrizzle(config);
          },
          inject: [DrizzleService],
        },
      ],
      exports: [DrizzleService, PG_CONNECTION],
    };
  }

  static registerAsync(options: {
    imports?: any[];
    useFactory: (
      ...args: any[]
    ) => DrizzleModuleConfig | Promise<DrizzleModuleConfig>;
    inject?: any[];
  }): DynamicModule {
    return {
      module: DrizzleModule,
      imports: [...(options.imports || []), TenantModule],
      providers: [
        {
          provide: 'DRIZZLE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        DrizzleService,
        {
          provide: PG_CONNECTION,
          scope: Scope.REQUEST,
          useFactory: async (
            drizzleService: DrizzleService,
            config: DrizzleModuleConfig,
            tenantContext: TenantContextService,
          ) => {
            const tenantId = tenantContext.getTenantId();
            if (!tenantId) {
              throw new Error('Tenant ID is required for database operations');
            }

            const schemaName = `tenant_${tenantId}`;
            // 先验证 schema 是否存在
            await drizzleService.validateSchema(schemaName);

            // 然后创建带有正确 schema 的连接
            const url = `${config.postgres.url}?options=-c%20search_path=${schemaName}`;
            return drizzleService.getDrizzle({
              ...config,
              postgres: {
                ...config.postgres,
                url,
              },
            });
          },
          inject: [DrizzleService, 'DRIZZLE_OPTIONS', TenantContextService],
        },
      ],
      exports: [DrizzleService, PG_CONNECTION],
    };
  }
}
