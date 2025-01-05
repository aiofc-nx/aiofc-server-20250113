import { Table, getTableName, sql } from 'drizzle-orm';
import env from '../env';
import { db, connection } from './db';
import * as schema from '../db/schema';

/*
 * 数据库种子文件安全检查
 * 通过环境变量 DB_SEEDING 来控制是否允许执行种子脚本
 * 这是一个安全措施,防止在生产环境意外执行种子脚本
 */
if (!env.DB_SEEDING) {
  throw new Error('运行种子时必须将 DB_SEEDING 设置为“true”');
}

/*
 * 重置表函数
 * 该函数执行 TRUNCATE 操作来清空指定表的所有数据
 * RESTART IDENTITY: 重置自增ID计数器
 * CASCADE: 级联删除相关表数据
 * 这比普通的 DELETE 操作更彻底,会完全重置表状态
 */
async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

/*
 * 执行表重置
 * 遍历需要重置的表(当前只包含user表)
 * 注释掉的代码展示了另一种清空表的方式(使用delete),但不会重置ID
 */
for (const table of [schema.user]) {
  // await db.delete(table); // clear tables without truncating / resetting ids
  await resetTable(db, table);
}

/*
 * 关闭数据库连接
 * 清理资源,防止连接泄露
 */
await connection.end();
