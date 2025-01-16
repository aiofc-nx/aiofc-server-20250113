[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [apps/drizzle-kits/src/db/db](../README.md) / db

# Variable: db

> `const` **db**: `PostgresJsDatabase`\<[`apps/drizzle-kits/src/db/schema`](../../schema/README.md)\> & `object`

Defined in: [apps/drizzle-kits/src/db/db.ts:27](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/drizzle-kits/src/db/db.ts#L27)

Drizzle ORM 实例化

使用 drizzle-orm 创建数据库操作实例:
- 传入上面创建的数据库连接
- 加载预定义的数据库模式(schema)
- 启用日志记录功能,方便调试
