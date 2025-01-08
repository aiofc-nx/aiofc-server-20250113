import { Inject } from '@nestjs/common';
import { eq, Table } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DatabaseConfig } from '../config/database.config';
import { PG_CONNECTION } from '../drizzle/pg-connection';
import { useDynamicSchema } from './helpers/use-dynamic-schema';

/**
 * 抽象数据访问对象基类
 * Dao属于数据访问层（Data Access Layer），负责与数据库进行交互，相当于typeorm的Repository
 *
 * 这个抽象类的功能:
 * 1. 使用泛型实现通用CRUD操作
 * 2. 支持动态schema切换
 * 3. 提供完整的数据库操作接口
 * 其他的Dao类继承这个抽象类，获得CRUD操作的能力
 *
 * 泛型参数说明:
 * - TSchema: 数据库schema类型
 * - Entity: 实体表类型
 * - InferEntitySelected: 查询结果类型
 * - InferEntityInsert: 插入数据类型
 */
export class AbstractDao<
  TSchema extends Record<string, unknown>,
  Entity extends Table,
  InferEntitySelected,
  InferEntityInsert extends Record<string, unknown>,
> {
  // 在构造函数所做的事情，包括：
  // 获取数据库连接字符串（通过配置），创建数据库连接，创建drizzle客户端
  constructor(
    // 注入PG_CONNECTION，通过令牌获取数据库连接，see：src/core/common/database/drizzle/drizzle.module.ts
    // 注入db: PostgresJsDatabase相当于drizzle的客户端，see：https://bulwe36f0m.feishu.cn/wiki/ARwwwR1IfiKxxkka2jecAuV9nhg?from=from_copylink
    @Inject(PG_CONNECTION) protected readonly db: PostgresJsDatabase<TSchema>,
    private readonly entity: Entity,
    protected readonly dbConfig: DatabaseConfig,
  ) {}

  /**
   * 获取动态schema
   *
   * 机制:通过useDynamicSchema工具函数动态切换数据库schema
   */
  protected get useSchema() {
    return useDynamicSchema(this.entity, this.dbConfig.schemaName);
  }

  /**
   * 获取所有记录
   *
   * 工作原理:
   * 1. 使用select()查询所有字段
   * 2. 从动态schema中获取数据
   */
  async getAll() {
    return this.db.select().from(this.useSchema).execute();
  }

  /**
   * 根据ID获取记录
   *
   * 要点:
   * - 支持选择性返回字段
   * - 使用eq进行相等条件查询
   */
  async getById(
    id: string,
    fieldsToSelect?: (keyof Entity)[],
  ): Promise<Partial<InferEntitySelected>[]> {
    const selectedFields = this.selectFields(fieldsToSelect);
    return this.db
      .select(selectedFields)
      .from(this.useSchema)
      .where(eq(this.entity['id'], id));
  }

  /**
   * 根据ID获取单条记录
   *
   * 机制:
   * 1. 调用getById获取结果数组
   * 2. 返回第一条记录或null
   */
  async getOneById(
    id: string,
    fieldsToSelect?: (keyof Entity)[],
  ): Promise<Partial<InferEntitySelected>> {
    const res = await this.getById(id, fieldsToSelect);
    return res && res.length > 0 ? res[0] : null;
  }

  /**
   * 根据单个键值对查询记录
   *
   * 要点:
   * - 支持任意字段作为查询条件
   * - 支持选择性返回字段
   */
  async getBySingleKey(
    key: keyof Entity,
    value: any,
    fieldsToSelect?: (keyof Entity)[],
  ): Promise<Partial<InferEntitySelected>[]> {
    const selectedFields = this.selectFields(fieldsToSelect);
    return await this.db
      .select(selectedFields)
      .from(this.useSchema)
      .where(eq(this.entity[key as string], value))
      .execute();
  }

  /**
   * 根据单个键值对查询单条记录
   *
   * 机制:
   * 1. 调用getBySingleKey获取结果数组
   * 2. 返回最后一条记录或null
   */
  async getOneBySingleKey(
    key: keyof Entity,
    value: any,
    fieldsToSelect?: (keyof Entity)[],
  ): Promise<Partial<InferEntitySelected>> {
    const bySingleKey = await this.getBySingleKey(key, value, fieldsToSelect);
    return bySingleKey && bySingleKey.length > 0 ? bySingleKey.at(-1) : null;
  }

  /**
   * 插入新记录
   *
   * 工作原理:
   * 1. 执行insert操作
   * 2. 返回插入的记录
   * 3. 确保只返回单条记录或null
   */
  async insertNewRecord(
    entity: Partial<InferEntityInsert>,
  ): Promise<Partial<InferEntitySelected>> {
    const insertedRows = await this.db
      .insert(this.useSchema)
      .values(entity as InferEntityInsert)
      .returning()
      .execute();
    return Array.isArray(insertedRows) && insertedRows.length === 1
      ? (insertedRows.at(-1) as Partial<InferEntitySelected>)
      : null;
  }

  /**
   * 根据ID删除记录
   *
   * 要点:
   * - 使用eq进行ID匹配
   * - returning()返回被删除的记录
   */
  async deleteById(id: string) {
    return this.db
      .delete(this.useSchema)
      .where(eq(this.entity['id'], id))
      .returning()
      .execute();
  }

  /**
   * 根据ID更新记录
   *
   * 机制:
   * 1. 执行update操作
   * 2. 只更新指定字段
   * 3. 返回更新后的记录
   */
  async updateById(
    id: string,
    fieldsToUpdate: Partial<InferEntityInsert>,
  ): Promise<Partial<InferEntitySelected>[]> {
    return (await this.db
      .update(this.useSchema)
      .set(fieldsToUpdate as InferEntityInsert)
      .where(eq(this.entity['id'], id))
      .returning()
      .execute()) as Partial<InferEntitySelected>[];
  }

  /**
   * 删除所有记录
   *
   * 要点:
   * - 危险操作,慎用
   * - returning()返回所有被删除的记录
   */
  async deleteAll() {
    return this.db.delete(this.useSchema).returning().execute();
  }

  /**
   * 选择性返回字段处理
   *
   * 工作原理:
   * 1. 如无指定字段则返回undefined(表示选择所有字段)
   * 2. 将字段名数组转换为对象形式
   * 3. 用于select查询的字段选择
   */
  private selectFields(fieldsToSelect?: (keyof Entity)[]) {
    if (!fieldsToSelect) {
      return undefined;
    }
    return fieldsToSelect.reduce((acc, fieldToSelect) => {
      acc[fieldToSelect as string] = this.entity[fieldToSelect];
      return acc;
    }, {});
  }
}
