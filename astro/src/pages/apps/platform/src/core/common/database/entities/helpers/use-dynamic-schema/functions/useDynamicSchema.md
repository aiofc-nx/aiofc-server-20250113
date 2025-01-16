[**AIOFC API 文档 v1.0.0**](../../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/entities/helpers/use-dynamic-schema](../README.md) / useDynamicSchema

# Function: useDynamicSchema()

> **useDynamicSchema**\<`T`\>(`table`, `schema`): `T`

Defined in: [apps/platform/src/core/common/database/entities/helpers/use-dynamic-schema.ts:17](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/helpers/use-dynamic-schema.ts#L17)

通过这个方法，允许我们使用特定的schema来运行查询。任何时候你想从特定schema查询
你只需像这样使用它：

````ts
db.select().from(useDynamicSchema(sourceEntity, 'schema_name')).execute()
````
有关如何使用该方法的多个示例，请参阅abstract.dao。

请参阅：https://github.com/drizzle-team/drizzle-orm/issues/423#issuecomment-2016750019

这种实现方式本质上是一种运行时的 schema 切换机制，通过修改表对象的内部属性来实现动态 schema 的效果，
这在需要处理多租户数据或者需要动态访问不同 schema 的场景下非常有用。

## Type Parameters

• **T** *extends* `Table`

## Parameters

### table

`T`

### schema

`string`

## Returns

`T`
