import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import env from '../env';
import * as schema from './aiofc/schema';

/**
 * 数据库迁移主函数
 * 这个模块负责执行数据库迁移操作，主要完成以下步骤:
 * 1. 建立数据库连接
 * 2. 执行迁移脚本
 * 3. 关闭数据库连接
 */
async function main() {
  const initialClient = postgres(env.DATABASE_URL, { max: 1 });

  try {
    // 删除并重建数据库
    await initialClient`DROP DATABASE IF EXISTS aiofc WITH (FORCE)`;
    await initialClient`CREATE DATABASE aiofc`;
    await initialClient.end();

    // 连接到新数据库
    const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

    // 只创建必要的扩展
    await migrationClient`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // 让迁移文件处理所有表和类型的创建
    const db = drizzle(migrationClient, { schema });

    await migrate(db, {
      migrationsFolder: env.MIGRATIONS_FOLDER,
    });

    await migrationClient.end();
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

/**
 * 执行主函数并处理结果
 * 使用Promise链式调用处理成功和失败的情况:
 * - 成功时打印完成信息并正常退出(exit code 0)
 * - 失败时打印错误信息并异常退出(exit code 1)
 */
main()
  .then(() => {
    console.log('Migration complete');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed', err);
    process.exit(1);
  });
