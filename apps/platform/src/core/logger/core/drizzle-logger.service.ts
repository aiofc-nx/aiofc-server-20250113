import { Injectable, Logger as NestJSLogger } from '@nestjs/common';
import { Logger } from 'drizzle-orm/logger';

/**
 * 用于记录插值查询的自定义 Drizzle 记录器。这对于准备将查询复制粘贴到 Datagrip/DBeaver/etc 中非常有用
 */
@Injectable()
export class DrizzleLoggerService implements Logger {
  private readonly logger = new NestJSLogger(DrizzleLoggerService.name);

  logQuery(query: string, params: unknown[]): void {
    const interpolatedQuery = this.interpolateQuery(query, params);
    this.logger.log(interpolatedQuery);
  }

  /**
   * 查询参数插值处理
   *
   * 主要机制:
   * 1. 参数替换
   * - 接收原始SQL查询和参数数组
   * - 遍历参数数组进行替换处理
   * - 使用正则表达式匹配$1,$2等占位符
   *
   * 2. 参数格式化
   * - 对象类型参数转换为JSON字符串
   * - 非对象类型参数直接使用值
   * - 所有参数值添加单引号包裹
   *
   * 3. 安全处理
   * - 检查参数数组是否存在且有值
   * - 保持原始查询不变如果没有参数
   *
   * @param query 原始SQL查询字符串
   * @param parameters 查询参数数组
   * @returns 插值后的完整SQL查询
   */
  private interpolateQuery(query: string, parameters?: any[]) {
    if (parameters && parameters.length) {
      parameters.forEach((parameter, index) => {
        query = query.replace(
          new RegExp(`\\$${index + 1}`),
          `'${typeof parameter === 'object' ? JSON.stringify(parameter) : parameter}'`,
        );
      });
    }
    return query;
  }
}
