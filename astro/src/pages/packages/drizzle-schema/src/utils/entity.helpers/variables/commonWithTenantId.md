[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/drizzle-schema/src/utils/entity.helpers](../README.md) / commonWithTenantId

# Variable: commonWithTenantId

> `const` **commonWithTenantId**: `object`

Defined in: [packages/drizzle-schema/src/utils/entity.helpers.ts:35](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/drizzle-schema/src/utils/entity.helpers.ts#L35)

## Type declaration

### createdAt

> **createdAt**: `HasDefault`\<`NotNull`\<`PgTimestampBuilderInitial`\<`"created_at"`\>\>\>

### deletedAt

> **deletedAt**: `PgTimestampBuilderInitial`\<`"deleted_at"`\>

### id

> **id**: `HasDefault`\<`IsPrimaryKey`\<`NotNull`\<`PgUUIDBuilderInitial`\<`"id"`\>\>\>\>

### tenantId

> **tenantId**: `NotNull`\<`PgVarcharBuilderInitial`\<`"tenant_id"`, \[`string`, `...string[]`\], `50`\>\>

### updatedAt

> **updatedAt**: `HasDefault`\<`HasDefault`\<`NotNull`\<`PgTimestampBuilderInitial`\<`"updated_at"`\>\>\>\>
