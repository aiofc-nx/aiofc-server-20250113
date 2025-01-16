[**AIOFC API 文档 v1.0.0**](../../../../../README.md)

***

[AIOFC API 文档](../../../../../modules.md) / [packages/drizzle-schema/src/db](../README.md) / connection

# Function: connection()

数据库连接配置

创建一个 PostgreSQL 数据库连接实例:
- 使用环境变量 DATABASE_URL 作为连接字符串
- 当进行数据库迁移或数据填充时,将最大连接数限制为1
- 在数据填充过程中忽略数据库通知消息

## Call Signature

> **connection**\<`T`, `K`\>(`first`, ...`rest`): `Return`\<`T`, `K`\>

Defined in: [packages/drizzle-schema/src/db.ts:14](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/drizzle-schema/src/db.ts#L14)

Query helper

### Type Parameters

• **T**

• **K** *extends* readonly `string`[] \| readonly \[\] \| readonly `never`[] \| \[readonly `never`[]\] \| readonly `string` & keyof `T`\<`T`\>[] \| \[readonly `string` & keyof `T`\<`T`\>[]\]

### Parameters

#### first

`T` & `First`\<`T`, `K`, `never`\>

Define how the helper behave

#### rest

...`K`

Other optional arguments, depending on the helper type

### Returns

`Return`\<`T`, `K`\>

An helper object usable as tagged template parameter in sql queries

## Call Signature

> **connection**\<`T`\>(`template`, ...`parameters`): `PendingQuery`\<`T`\>

Defined in: [packages/drizzle-schema/src/db.ts:14](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/drizzle-schema/src/db.ts#L14)

Execute the SQL query passed as a template string. Can only be used as template string tag.

### Type Parameters

• **T** *extends* readonly `object`[] = `Row`[]

### Parameters

#### template

`TemplateStringsArray`

The template generated from the template string

#### parameters

...readonly `ParameterOrFragment`\<`never`\>[]

Interpoled values of the template string

### Returns

`PendingQuery`\<`T`\>

A promise resolving to the result of your query
