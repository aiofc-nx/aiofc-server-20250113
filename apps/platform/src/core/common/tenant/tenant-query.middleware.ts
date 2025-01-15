import { sql } from 'drizzle-orm';
import { isTenantEntity } from './tenant-entity.decorator';
import { ClsService } from 'nestjs-cls';

export function createTenantQueryMiddleware(cls: ClsService) {
  return function tenantQueryMiddleware(ctx: any) {
    const { query, table } = ctx;

    // 检查表是否需要租户隔离
    if (isTenantEntity(table)) {
      const tenantId = cls.get('tenantId');

      if (!tenantId) {
        throw new Error('Tenant context not initialized');
      }

      // 为查询添加租户过滤条件
      if (query.type === 'select') {
        query.where = sql`${table}.tenant_id = ${tenantId} AND (${query.where || sql`1=1`})`;
      } else if (query.type === 'insert') {
        query.values = {
          ...query.values,
          tenant_id: tenantId,
        };
      } else if (query.type === 'update' || query.type === 'delete') {
        query.where = sql`${table}.tenant_id = ${tenantId} AND (${query.where || sql`1=1`})`;
      }
    }

    return query;
  };
}
