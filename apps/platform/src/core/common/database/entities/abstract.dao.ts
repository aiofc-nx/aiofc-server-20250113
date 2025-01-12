import { Inject } from '@nestjs/common';
import { eq, InferInsertModel, Table } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { TENANT_PG_CONNECTION } from '../drizzle/drizzle.constants';

/**
 * 抽象数据访问对象基类
 * Dao属于数据访问层（Data Access Layer），负责与数据库进行交互，相当于typeorm的Repository
 *
 * 这个抽象类的功能:
 * 1. 使用泛型实现通用CRUD操作
 * 2. 提供完整的数据库操作接口
 * 其他的Dao类继承这个抽象类，获得CRUD操作的能力
 *
 * 泛型参数说明:
 * - Entity: 实体表类型
 * - InferEntitySelected: 查询结果类型
 * - InferEntityInsert: 插入数据类型
 */
export class AbstractDao<
  Entity extends Table,
  InferEntitySelected,
  InferEntityInsert,
> {
  constructor(
    @Inject(TENANT_PG_CONNECTION) protected readonly db: PostgresJsDatabase,
    private readonly entity: Entity,
  ) {}

  /**
   * 获取所有记录
   */
  async getAll() {
    return this.db.select().from(this.entity).execute();
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
      .from(this.entity)
      .where(eq(this.entity['id'], id));
  }

  /**
   * 根据ID获取单条记录
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
   */
  async getBySingleKey(
    key: keyof Entity,
    value: any,
    fieldsToSelect?: (keyof Entity)[],
  ): Promise<Partial<InferEntitySelected>[]> {
    const selectedFields = this.selectFields(fieldsToSelect);
    return await this.db
      .select(selectedFields)
      .from(this.entity)
      .where(eq(this.entity[key as string], value))
      .execute();
  }

  /**
   * 根据单个键值对查询单条记录
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
   */
  async insertNewRecord(
    entity: Partial<InferEntityInsert>,
  ): Promise<Partial<InferEntitySelected>> {
    const insertedRows = await this.db
      .insert(this.entity)
      .values(entity as InferInsertModel<Entity>)
      .returning()
      .execute();
    return Array.isArray(insertedRows) && insertedRows.length === 1
      ? (insertedRows.at(-1) as Partial<InferEntitySelected>)
      : null;
  }

  /**
   * 根据ID删除记录
   */
  async deleteById(id: string) {
    return this.db
      .delete(this.entity)
      .where(eq(this.entity['id'], id))
      .returning()
      .execute();
  }

  /**
   * 根据ID更新记录
   */
  async updateById(
    id: string,
    fieldsToUpdate: Partial<InferEntityInsert>,
  ): Promise<Partial<InferEntitySelected>[]> {
    return (await this.db
      .update(this.entity)
      .set(fieldsToUpdate as InferEntityInsert)
      .where(eq(this.entity['id'], id))
      .returning()
      .execute()) as Partial<InferEntitySelected>[];
  }

  /**
   * 删除所有记录
   */
  async deleteAll() {
    return this.db.delete(this.entity).returning().execute();
  }

  /**
   * 选择性返回字段处理
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
