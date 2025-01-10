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
          useFactory: async (
            drizzleService: DrizzleService,
            tenantContext: TenantContextService,
          ) => {
            const tenantId = tenantContext.getTenantId();
            return drizzleService.getDrizzle(config, tenantId);
          },
          inject: [DrizzleService, TenantContextService],
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
              throw new Error('Tenant ID is required');
            }
            return drizzleService.getDrizzle(config, tenantId);
          },
          inject: [DrizzleService, 'DRIZZLE_OPTIONS', TenantContextService],
        },
      ],
      exports: [DrizzleService, PG_CONNECTION],
    };
  }
}
