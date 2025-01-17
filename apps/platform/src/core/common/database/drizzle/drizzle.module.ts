import { DynamicModule, Module, Global, Scope } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { DrizzleModuleConfig } from './drizzle.interface';
import { TENANT_PG_CONNECTION } from './drizzle.constants';
import { TenantContextService } from '../../tenant/tenant-context.service';
import { TenantModule } from '../../tenant/tenant.module';

/**
 * DrizzleModule - Drizzle ORM的核心模块
 * @remarks
 * 主要功能:
 * - 提供数据库连接的全局配置
 * - 支持多租户数据库连接管理
 * - 实现同步和异步配置初始化
 *
 * @example
 * ```typescript
 * // 同步配置
 * @Module({
 *   imports: [
 *     DrizzleModule.forRoot({
 *       postgres: {
 *         url: 'postgres://user:pass@localhost:5432/db',
 *         config: { max: 10 }
 *       }
 *     })
 *   ]
 * })
 *
 * // 异步配置
 * @Module({
 *   imports: [
 *     DrizzleModule.forRootAsync({
 *       imports: [ConfigModule],
 *       inject: [ConfigService],
 *       useFactory: async (config: ConfigService) => ({
 *         postgres: {
 *           url: config.get('DATABASE_URL'),
 *           config: { max: config.get('DB_MAX_CONNECTIONS') }
 *         }
 *       })
 *     })
 *   ]
 * })
 * ```
 */
@Global()
@Module({})
export class DrizzleModule {
  /**
   * 同步配置初始化方法
   *
   * @param drizzleConfig - Drizzle配置对象
   * @returns DynamicModule - 动态模块配置
   */
  static forRoot(drizzleConfig: DrizzleModuleConfig): DynamicModule {
    return {
      module: DrizzleModule,
      imports: [TenantModule],
      providers: [
        {
          provide: 'DRIZZLE_OPTIONS',
          useValue: drizzleConfig,
        },
        DrizzleService,
        {
          provide: TENANT_PG_CONNECTION,
          scope: Scope.REQUEST,
          useFactory: async (
            drizzleService: DrizzleService,
            tenantContext: TenantContextService,
          ) => {
            const tenantId = tenantContext.getTenantId();
            if (!tenantId) {
              throw new Error('Tenant ID is required');
            }
            const schemaName = `tenant_${tenantId}`;
            await drizzleService.ensureSchemaExists(schemaName);
            return drizzleService.getDrizzleWithTenantProxy(
              drizzleConfig,
              tenantId,
            );
          },
          inject: [DrizzleService, TenantContextService],
        },
      ],
      exports: [DrizzleService, TENANT_PG_CONNECTION],
      global: true,
    };
  }

  /**
   * 异步配置初始化方法
   *
   * @param options - 异步配置选项
   * @param options.imports - 需要导入的模块数组
   * @param options.useFactory - 工厂函数，用于生成配置
   * @param options.inject - 需要注入的依赖数组
   * @returns DynamicModule - 动态模块配置
   */
  static forRootAsync(options: {
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
          provide: TENANT_PG_CONNECTION,
          scope: Scope.REQUEST,
          useFactory: async (
            drizzleService: DrizzleService, // Drizzle服务实例
            drizzleConfig: DrizzleModuleConfig, // Drizzle配置
            tenantContext: TenantContextService, // 租户上下文服务
          ) => {
            // 获取当前租户ID
            const tenantId = tenantContext.getTenantId();
            if (!tenantId) {
              throw new Error('Tenant ID is required');
            }
            // 根据租户ID构建schema名称
            const schemaName = `tenant_${tenantId}`;
            // 确保该租户的schema存在
            await drizzleService.ensureSchemaExists(schemaName);
            // 返回带有租户代理的Drizzle实例
            return drizzleService.getDrizzleWithTenantProxy(
              drizzleConfig,
              tenantId,
            );
          },
          inject: [DrizzleService, 'DRIZZLE_OPTIONS', TenantContextService],
        },
      ],
      exports: [DrizzleService, TENANT_PG_CONNECTION],
      global: true,
    };
  }
}
