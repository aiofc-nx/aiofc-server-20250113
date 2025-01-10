import { Injectable, Scope, BadRequestException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

/**
 * 租户上下文服务
 *
 * 机制说明:
 * - 使用 NestJS 的请求作用域注入，确保每个请求都有独立的实例
 * - 基于 nestjs-cls 实现请求级别的数据存储，用于在请求生命周期内共享租户信息
 *
 * 主要功能:
 * 1. 设置当前请求的租户ID
 * 2. 获取当前请求的租户ID
 *
 * 实现要点:
 * - 使用 ClsService 存储租户信息，确保线程安全
 * - 严格的租户ID校验，防止无效数据
 * - 异常处理确保系统稳定性
 */
@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  constructor(private readonly cls: ClsService) {}

  /**
   * 设置租户ID
   *
   * @param tenantId 租户标识
   * @throws BadRequestException 当租户ID为空时抛出异常
   */
  setTenant(tenantId: string) {
    if (!tenantId) {
      throw new BadRequestException('Tenant ID is required');
    }
    this.cls.set('tenantId', tenantId);
  }

  /**
   * 获取当前租户ID
   *
   * @returns 当前租户ID
   * @throws BadRequestException 当租户上下文未初始化时抛出异常
   */
  getTenantId(): string {
    const tenantId = this.cls.get('tenantId');
    if (!tenantId) {
      throw new BadRequestException('Tenant context not initialized');
    }
    return tenantId;
  }
}
