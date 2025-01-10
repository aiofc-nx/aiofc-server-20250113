import { Table } from 'drizzle-orm';

/**
 * 这是一个帮助器方法，允许我们使用特定的模式来运行查询。任何时候你想从特定模式查询
 * 你只需像这样使用它：
 *
 * ````ts
 * db.select().from(useDynamicSchema(sourceEntity, 'schema_name')).execute()
 * ````
 * 有关如何使用该方法的多个示例，请参阅abstract.dao。
 *
 * 请参阅：https://github.com/drizzle-team/drizzle-orm/issues/423#issuecomment-2016750019
 */
export const useDynamicSchema = <T extends Table>(table: T, schema: string): T => {
  // @ts-expect-error Symbol is @internal in drizzle-orm, see https://github.com/drizzle-team/drizzle-orm/blob/0.30.4/drizzle-orm/src/table.ts#L64-L65
  table[Table.Symbol.Schema] = schema;
  return table;
};
