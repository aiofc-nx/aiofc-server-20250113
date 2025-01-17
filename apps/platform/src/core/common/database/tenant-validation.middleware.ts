import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ClsService } from 'nestjs-cls';
import { DrizzleService } from './drizzle/drizzle.service';

/**
 * 数据库上下文中间件
 * 用于验证和处理每个请求的租户上下文
 */
@Injectable()
export class TenantValidationMiddleware implements NestMiddleware {
  constructor(
    private readonly cls: ClsService,
    private readonly drizzleService: DrizzleService,
  ) {}

  /**
   * 处理请求的中间件方法
   * @param _req - Fastify 请求对象
   * @param _res - Fastify 响应对象
   * @param next - 调用下一个中间件的函数
   * @throws {Error} 当未找到租户上下文时抛出错误
   */
  async use(_req: FastifyRequest, _res: FastifyReply, next: () => void) {
    const tenantId = this.cls.get('tenantId');
    if (!tenantId) {
      throw new Error('No tenant context found');
    }

    // 设置Schema上下文
    await this.drizzleService.setTenantContext(tenantId);

    // 设置查询过滤器，确保行级隔离
    this.drizzleService.setQueryFilter({
      tenantId: tenantId,
    });

    next();
  }
}
