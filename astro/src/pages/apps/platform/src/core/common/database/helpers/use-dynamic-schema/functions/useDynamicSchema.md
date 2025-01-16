[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/helpers/use-dynamic-schema](../README.md) / useDynamicSchema

# Function: useDynamicSchema()

> **useDynamicSchema**\<`T`\>(`table`, `schema`): `T`

Defined in: [apps/platform/src/core/common/database/helpers/use-dynamic-schema.ts:14](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/helpers/use-dynamic-schema.ts#L14)

这是一个帮助器方法，允许我们使用特定的模式来运行查询。任何时候你想从特定模式查询
你只需像这样使用它：

````ts
db.select().from(useDynamicSchema(sourceEntity, 'schema_name')).execute()
````
有关如何使用该方法的多个示例，请参阅abstract.dao。

请参阅：https://github.com/drizzle-team/drizzle-orm/issues/423#issuecomment-2016750019

## Type Parameters

• **T** *extends* `Table`

## Parameters

### table

`T`

### schema

`string`

## Returns

`T`
