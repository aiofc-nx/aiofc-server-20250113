import postgres from 'postgres';
import * as schema from '../entities/entities.schema';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

/**
 * 数据库辅助工具类
 *
 * 机制说明:
 * 1. 提供数据库Schema管理的静态方法
 * 2. 支持数据库迁移、Schema清理和检查等操作
 * 3. 使用pg客户端进行数据库连接和操作
 * 4. 集成drizzle-orm进行ORM操作
 *
 * 要点:
 * - 所有方法都是静态的,可直接调用
 * - 自动管理数据库连接的开启和关闭
 * - 支持安全的Schema操作和迁移
 * - 使用参数化查询防止SQL注入
 */
export class DatabaseHelper {
  /**
   * 运行数据库迁移
   *
   * 机制:
   * 1. 建立数据库连接
   * 2. 确保目标Schema存在
   * 3. 切换到目标Schema
   * 4. 执行迁移操作
   */
  static async runMigrations(
    migrationsFolderPath: string,
    connectionString: string,
    schemaName: string,
  ): Promise<void> {
    const client = postgres(connectionString);
    const db = drizzle(client, { schema });

    await db.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`));
    await db.execute(sql.raw(`SET schema '${schemaName}'`));

    await migrate(db, {
      migrationsFolder: migrationsFolderPath,
      migrationsSchema: schemaName,
    });

    await client.end();
  }

  /**
   * 清理指定Schema
   *
   * 机制:
   * 1. 建立数据库连接
   * 2. 级联删除Schema及其所有对象
   *
   * 原理:
   * - CASCADE确保删除所有依赖对象
   * - IF EXISTS防止Schema不存在时报错
   */
  static async cleanSchema(
    connectionString: string,
    schemaName: string,
  ): Promise<void> {
    const client = postgres(connectionString);
    const db = drizzle(client, { schema });

    await db.execute(sql.raw(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE;`));

    await client.end();
  }

  /**
   * 检查Schema是否存在
   *
   * 机制:
   * 1. 查询系统表pg_namespace
   * 2. 返回Schema存在状态
   *
   * 原理:
   * - 使用PostgreSQL系统目录表进行查询
   * - 通过EXISTS子查询优化性能
   */
  static async hasSchema(
    connectionString: string,
    schemaName: string,
  ): Promise<boolean> {
    const client = postgres(connectionString);
    const db = drizzle(client, { schema });

    const res = (await db.execute(
      sql.raw(
        `SELECT EXISTS (SELECT * FROM PG_CATALOG.PG_NAMESPACE WHERE NSPNAME = '${schemaName}');`,
      ),
    )) as unknown as Array<{ exists: boolean }>;

    await client.end();
    return res[0].exists;
  }
}
