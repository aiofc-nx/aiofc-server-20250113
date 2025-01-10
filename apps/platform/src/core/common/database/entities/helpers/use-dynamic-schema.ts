import { Table } from 'drizzle-orm';

/**
 * 通过这个方法，允许我们使用特定的schema来运行查询。任何时候你想从特定schema查询
 * 你只需像这样使用它：
 *
 * ````ts
 * db.select().from(useDynamicSchema(sourceEntity, 'schema_name')).execute()
 * ````
 * 有关如何使用该方法的多个示例，请参阅abstract.dao。
 *
 * 请参阅：https://github.com/drizzle-team/drizzle-orm/issues/423#issuecomment-2016750019
 *
 * 这种实现方式本质上是一种运行时的 schema 切换机制，通过修改表对象的内部属性来实现动态 schema 的效果，
 * 这在需要处理多租户数据或者需要动态访问不同 schema 的场景下非常有用。
 */
export const useDynamicSchema = <T extends Table>(
  table: T,
  schema: string,
): T => {
  // 代码中使用了 `@ts-expect-error` 是因为访问了 drizzle-orm 的内部 API
  // @ts-expect-error Symbol is @internal in drizzle-orm, see https://github.com/drizzle-team/drizzle-orm/blob/0.30.4/drizzle-orm/src/table.ts#L64-L65
  table[Table.Symbol.Schema] = schema;
  // 返回的是具体某个schema下的表
  return table;
};

/**
 * 
2. **核心机制**:
```typescript
table[Table.Symbol.Schema] = schema;
```
- 这行代码使用了 JavaScript Symbol 特性
- `Table.Symbol.Schema` 是 drizzle-orm 内部使用的一个 Symbol，用于存储表的 schema 信息
- 这种方式虽然有效，但依赖于 drizzle-orm 的内部实现，如果 drizzle-orm 的内部实现发生变化，可能会导致代码失效

3. **多租户系统示例**:
```typescript
// 不同租户的数据存储在不同的 schema 中
const tenant1Users = useDynamicSchema(usersTable, 'tenant_1');
const tenant2Users = useDynamicSchema(usersTable, 'tenant_2');

// 查询不同租户的数据
await db.select().from(tenant1Users);
await db.select().from(tenant2Users);
```

4. **Database
│
├── tenant_1
│   ├── users
│   ├── orders
│   └── products
│
├── tenant_2
│   ├── users
│   └── products
│
└── tenant_3
    └── users

1. **多租户系统**：
```typescript
// 不同租户的数据存储在不同的 schema 中
const tenant1Users = useDynamicSchema(usersTable, 'tenant_1');
const tenant2Users = useDynamicSchema(usersTable, 'tenant_2');

// 查询不同租户的数据
await db.select().from(tenant1Users);
await db.select().from(tenant2Users);
```

 */
