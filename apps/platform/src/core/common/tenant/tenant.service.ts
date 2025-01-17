import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SchemaService } from '../database/schema.service';
import { MigrationService } from '../database/migrations/migration.service';
import { DrizzleService } from '../database/drizzle/drizzle.service';
import { sql } from 'drizzle-orm';
import { UpdateTenantDto, TenantStatus } from './dto/update-tenant.dto';
import { TenantConfigDto } from './dto/tenant-config.dto';
import { TenantEventService } from './events/tenant-event.service';
import { TenantEventType } from './events/tenant.events';

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  constructor(
    private readonly schemaService: SchemaService,
    private readonly migrationService: MigrationService,
    private readonly drizzleService: DrizzleService,
    private readonly eventService: TenantEventService,
  ) {}

  async initializeTenant(tenantId: string) {
    this.logger.log(`Initializing tenant: ${tenantId}`);

    // 验证租户ID是否已存在
    if (await this.tenantExists(tenantId)) {
      throw new Error(`Tenant ${tenantId} already exists`);
    }

    // 1. 创建Schema
    await this.schemaService.createTenantSchema(tenantId);

    // 2. 应用迁移
    await this.migrationService.applyMigrations(tenantId);

    // 3. 初始化基础数据
    await this.initializeBasicData(tenantId);

    // 4. 记录租户信息
    await this.recordTenantInfo(tenantId);

    this.logger.log(`Tenant ${tenantId} initialized successfully`);
  }

  async getTenantInfo(tenantId: string) {
    const result = await this.drizzleService.execute(sql`
      SELECT * FROM public.tenants WHERE tenant_id = ${tenantId}
    `);

    if (!result?.[0]) {
      throw new NotFoundException(`Tenant ${tenantId} not found`);
    }

    return result[0];
  }

  private async tenantExists(tenantId: string): Promise<boolean> {
    const result = await this.drizzleService.execute(sql`
      SELECT EXISTS (
        SELECT 1 FROM public.tenants WHERE tenant_id = ${tenantId}
      )
    `);
    return result[0]?.exists || false;
  }

  private async recordTenantInfo(tenantId: string) {
    await this.drizzleService.execute(sql`
      INSERT INTO public.tenants (tenant_id, created_at)
      VALUES (${tenantId}, CURRENT_TIMESTAMP)
    `);
  }

  private async initializeBasicData(tenantId: string) {
    this.logger.log(`Initializing basic data for tenant: ${tenantId}`);
    // TODO: 添加具体的基础数据初始化逻辑
    // 例如：创建默认用户、角色等
  }

  async updateTenantStatus(tenantId: string, updateDto: UpdateTenantDto) {
    const tenant = await this.getTenantInfo(tenantId);

    if (!tenant) {
      throw new NotFoundException(`Tenant ${tenantId} not found`);
    }

    if (updateDto.status === TenantStatus.DISABLED) {
      // 检查是否有活跃连接
      const activeConnections = await this.checkActiveConnections(tenantId);
      if (activeConnections > 0) {
        throw new BadRequestException(
          `Cannot disable tenant: ${activeConnections} active connections`,
        );
      }
    }

    await this.drizzleService.execute(sql`
      UPDATE public.tenants 
      SET 
        status = ${updateDto.status},
        updated_at = CURRENT_TIMESTAMP
      WHERE tenant_id = ${tenantId}
    `);

    this.logger.log(`Updated tenant ${tenantId} status to ${updateDto.status}`);

    if (updateDto.status === TenantStatus.DISABLED) {
      await this.disableTenantConnections(tenantId);
    }

    return this.getTenantInfo(tenantId);
  }

  async checkActiveConnections(tenantId: string): Promise<number> {
    const result = await this.drizzleService.execute(sql`
      SELECT COUNT(*) as count
      FROM pg_stat_activity
      WHERE application_name LIKE ${`%${tenantId}%`}
    `);
    return parseInt(result[0]?.count || '0', 10);
  }

  private async disableTenantConnections(tenantId: string) {
    const schemaName = `tenant_${tenantId}`;
    await this.drizzleService.execute(sql`
      REVOKE CONNECT ON DATABASE ${sql.identifier(process.env.POSTGRES_DB || 'platform')}
      FROM ${sql.identifier(schemaName)};
    `);
  }

  async updateTenantConfig(tenantId: string, config: TenantConfigDto) {
    const tenant = await this.getTenantInfo(tenantId);
    if (!tenant) {
      throw new NotFoundException(`Tenant ${tenantId} not found`);
    }

    await this.validateConfig(tenantId, config);

    // 更新配置
    await this.drizzleService.execute(sql`
      UPDATE public.tenants 
      SET 
        config = ${JSON.stringify(config)},
        updated_at = CURRENT_TIMESTAMP
      WHERE tenant_id = ${tenantId}
    `);

    // 发送配置变更事件
    this.eventService.emit(TenantEventType.CONFIG_CHANGED, tenantId, {
      oldConfig: tenant.config,
      newConfig: config,
    });

    return this.getTenantConfig(tenantId);
  }

  async getTenantConfig(tenantId: string) {
    const tenant = await this.getTenantInfo(tenantId);
    return tenant.config || {};
  }

  private async validateConfig(tenantId: string, config: TenantConfigDto) {
    // 验证用户数量
    if (config.maxUsers) {
      const currentUsers = await this.getCurrentUserCount(tenantId);
      if (currentUsers > config.maxUsers) {
        throw new BadRequestException(
          `Cannot set maxUsers to ${config.maxUsers}: current user count is ${currentUsers}`,
        );
      }
    }

    // 验证存储限制
    if (config.storageLimit) {
      const currentStorage = await this.getCurrentStorageUsage(tenantId);
      if (currentStorage > config.storageLimit) {
        throw new BadRequestException(
          `Cannot set storageLimit to ${config.storageLimit}GB: current usage is ${currentStorage}GB`,
        );
      }
    }
  }

  async getCurrentUserCount(tenantId: string): Promise<number> {
    const result = await this.drizzleService.execute(sql`
      SELECT COUNT(*) as count
      FROM ${sql.identifier(`tenant_${tenantId}`)}.users
    `);
    return parseInt(result[0]?.count || '0', 10);
  }

  async getCurrentStorageUsage(tenantId: string): Promise<number> {
    const result = await this.drizzleService.execute(sql`
      SELECT pg_total_relation_size(schemaname || '.' || tablename) as total_size
      FROM pg_tables
      WHERE schemaname = ${`tenant_${tenantId}`}
    `);

    const totalBytes = result.reduce(
      (acc, row) => acc + parseInt(row.total_size || '0', 10),
      0,
    );
    return Math.ceil(totalBytes / (1024 * 1024 * 1024));
  }

  async checkResourceUsage(tenantId: string) {
    const [userCount, storageUsage, connections] = await Promise.all([
      this.getCurrentUserCount(tenantId),
      this.getCurrentStorageUsage(tenantId),
      this.checkActiveConnections(tenantId),
    ]);

    const config = await this.getTenantConfig(tenantId);

    // 检查资源使用情况
    if (config.maxUsers && userCount >= config.maxUsers * 0.9) {
      await this.eventService.notifyResourceWarning(tenantId, {
        type: 'user_limit',
        current: userCount,
        limit: config.maxUsers,
      });
    }

    if (config.storageLimit && storageUsage >= config.storageLimit * 0.9) {
      await this.eventService.notifyResourceWarning(tenantId, {
        type: 'storage_limit',
        current: storageUsage,
        limit: config.storageLimit,
      });
    }

    return {
      userCount,
      storageUsage,
      connections,
      warnings: [],
    };
  }
}
