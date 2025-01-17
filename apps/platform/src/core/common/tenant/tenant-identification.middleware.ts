import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from './tenant-context.service';
import { ClsService } from 'nestjs-cls';

/**
 * 租户中间件
 *
 * 主要机制:
 * 1. 请求拦截
 * - 拦截所有HTTP请求
 * - 从请求头中提取租户信息
 * - 将租户信息存储到请求上下文
 *
 * 2. 租户隔离
 * - 使用ClsService维护请求级别的租户上下文
 * - 通过TenantContextService管理租户状态
 * - 支持多租户数据隔离
 *
 * 3. 路径排除
 * - 维护排除路径列表
 * - 对特定路径使用默认租户
 *
 * 要点:
 * - 统一的租户信息提取和验证
 * - 灵活的路径排除机制
 * - 完善的错误处理和日志记录
 *
 * 原理:
 * - 基于NestJS中间件机制实现请求拦截
 * - 利用ClsService实现请求作用域的数据存储
 * - 通过正则表达式验证租户ID格式
 */
@Injectable()
export class TenantIdentificationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantIdentificationMiddleware.name);
  private readonly EXCLUDED_PATHS = ['/health', '/metrics', '/docs'];

  constructor(
    private readonly tenantContextService: TenantContextService,
    private readonly cls: ClsService,
  ) {
    this.logger.log('构建TenantIdentificationMiddleware');
  }
  // 判断请求路径是否在排除列表中,有些路径不需要租户隔离
  private isExcludedPath(path: string): boolean {
    return this.EXCLUDED_PATHS.some((excluded) => path.startsWith(excluded));
  }

  // 格式化请求头
  private formatHeaders(headers: Record<string, any>): string {
    return Object.entries(headers)
      .map(([key, value]) => `\n  ${key}: ${value}`)
      .join('');
  }

  // 中间件执行逻辑
  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log('TenantIdentificationMiddleware executing...');
    this.logger.log(`Path: ${req.path}, OriginalUrl: ${req.originalUrl}`);
    this.logger.log(`Headers: ${this.formatHeaders(req.headers)}`);

    try {
      const path = req.path || req.originalUrl || '';

      if (this.isExcludedPath(path)) {
        this.logger.log('Path excluded, using default tenant');
        const defaultTenantId = 'default';
        this.tenantContextService.setTenantId(defaultTenantId);
        this.cls.set('tenantId', defaultTenantId);
        return next();
      }

      const tenantId = (req.headers['x-tenant-id'] as string) || 'default';
      this.logger.log(`请求用户设定的租户ID: ${tenantId}`);

      if (tenantId !== 'default' && !/^[a-zA-Z0-9_-]+$/.test(tenantId)) {
        throw new BadRequestException('租户ID格式错误');
      }

      this.tenantContextService.setTenantId(tenantId);
      this.cls.set('tenantId', tenantId);
      next();
    } catch (error) {
      this.logger.error('Error in TenantIdentificationMiddleware:', error);
      next(error);
    }
  }
}
