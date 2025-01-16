[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/drizzle-schema/src/utils/entity.helpers](../README.md) / common

# Variable: common

> `const` **common**: `object`

Defined in: [packages/drizzle-schema/src/utils/entity.helpers.ts:30](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/drizzle-schema/src/utils/entity.helpers.ts#L30)

## Type declaration

### createdAt

> **createdAt**: `HasDefault`\<`NotNull`\<`PgTimestampBuilderInitial`\<`"created_at"`\>\>\>

### deletedAt

> **deletedAt**: `PgTimestampBuilderInitial`\<`"deleted_at"`\>

### id

> **id**: `HasDefault`\<`IsPrimaryKey`\<`NotNull`\<`PgUUIDBuilderInitial`\<`"id"`\>\>\>\>

### updatedAt

> **updatedAt**: `HasDefault`\<`HasDefault`\<`NotNull`\<`PgTimestampBuilderInitial`\<`"updated_at"`\>\>\>\>
