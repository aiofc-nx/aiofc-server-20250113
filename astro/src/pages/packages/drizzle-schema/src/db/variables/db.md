[**AIOFC API 文档 v1.0.0**](../../../../../README.md)

***

[AIOFC API 文档](../../../../../modules.md) / [packages/drizzle-schema/src/db](../README.md) / db

# Variable: db

> `const` **db**: `PostgresJsDatabase`\<[`packages/drizzle-schema/src/schemas`](../../schemas/README.md)\> & `object`

Defined in: [packages/drizzle-schema/src/db.ts:31](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/drizzle-schema/src/db.ts#L31)

/**
 * Drizzle ORM 实例化
 *
 * 使用 drizzle-orm 创建数据库操作实例:
 * - 传入上面创建的数据库连接
 * - 加载预定义的数据库模式(schema)
 * - 启用日志记录功能,方便调试
