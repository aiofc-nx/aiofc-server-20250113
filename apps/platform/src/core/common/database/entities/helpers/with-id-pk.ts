import { sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';

/**
 * 通用ID主键配置对象
 *
 * 机制说明:
 * 1. 使用UUID作为主键类型,保证全局唯一性
 * 2. 设置为主键(Primary Key),用于唯一标识记录
 * 3. 默认值使用PostgreSQL内置的gen_random_uuid()函数自动生成
 *
 * 要点:
 * - UUID相比自增ID具有更好的分布式友好性
 * - gen_random_uuid()是PostgreSQL 13+内置函数,无需额外扩展
 * - 使用sql.raw确保SQL函数直接在数据库层执行
 *
 * 原理:
 * - UUID是128位标识符,重复概率极低
 * - 主键索引可加速查询和关联操作
 * - 默认值在INSERT时自动填充,无需应用层生成
 */
export const WithIdPk = {
  id: uuid('id').primaryKey().default(sql.raw(`gen_random_uuid()`)),
};
