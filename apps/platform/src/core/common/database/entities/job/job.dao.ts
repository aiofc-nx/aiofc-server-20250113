import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { AbstractDao } from '../abstract.dao';
import { JobEntity, JobEntityInsert, jobs } from './job.entity';
import { PG_CONNECTION } from '../../drizzle/pg-connection';
import { DatabaseConfig } from '../../config/database.config';
import * as jobsSchema from '../../../database/entities/job/job.entity';
/**
 * Job数据访问对象
 * Dao属于数据访问层（Data Access Layer），负责与数据库进行交互，相当于typeorm的Repository
 *
 * 机制说明:
 * 1. 继承AbstractDao基类实现通用CRUD操作
 * 2. 使用依赖注入获取数据库连接和配置
 * 3. 通过泛型参数指定具体的实体类型
 *
 * 要点:
 * - @Injectable()使其可被依赖注入系统管理
 * - 泛型参数说明:
 *   - typeof jobsSchema: schema定义
 *   - typeof jobs: 表定义
 *   - JobEntity: 实体类型
 *   - JobEntityInsert: 插入数据类型
 *
 * 工作原理:
 * 1. 构造函数通过依赖注入接收:
 *    - db: PostgreSQL数据库连接实例
 *    - dbConfig: 数据库配置对象
 * 2. 调用super()初始化父类,传入:
 *    - 数据库连接
 *    - jobs表定义
 *    - 数据库配置
 */
@Injectable()
export class JobDao extends AbstractDao<
  typeof jobsSchema,
  typeof jobs,
  JobEntity,
  JobEntityInsert
> {
  constructor(
    @Inject(PG_CONNECTION)
    protected readonly db: PostgresJsDatabase<typeof jobsSchema>,
    protected readonly dbConfig: DatabaseConfig,
  ) {
    super(db, jobs, dbConfig);
  }
}
