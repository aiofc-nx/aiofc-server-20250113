[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/drizzle/drizzle.service](../README.md) / DrizzleService

# Class: DrizzleService

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:38](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L38)

DrizzleService 类

功能:
- 管理数据库连接和多租户隔离
- 处理 schema 验证
- 提供数据库操作接口

## Example

```typescript
// 初始化服务
const drizzleService = new DrizzleService(config, clsService);

// 获取特定租户的数据库实例
const db = await drizzleService.getDrizzle({
  postgres: {
    url: 'postgresql://user:pass@localhost:5432/db'
  }
}, 'tenant-123');

// 执行查询
const results = await db.select().from(users);
```

## Remarks

该服务实现了 OnApplicationShutdown 接口，确保应用关闭时正确清理数据库连接

## Implements

- `OnApplicationShutdown`

## Constructors

### new DrizzleService()

> **new DrizzleService**(`config`, `cls`): [`DrizzleService`](DrizzleService.md)

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:45](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L45)

#### Parameters

##### config

[`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md)

##### cls

`ClsService`

#### Returns

[`DrizzleService`](DrizzleService.md)

## Properties

### cls

> `private` `readonly` **cls**: `ClsService`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:49](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L49)

***

### config

> `private` `readonly` **config**: [`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md)

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:48](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L48)

***

### validSchemas

> `private` **validSchemas**: `Set`\<`string`\>

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:43](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L43)

已验证的 schema 集合
使用 Set 来存储已验证的 schema，避免重复验证

## Methods

### getDrizzle()

> **getDrizzle**(`options`, `tenantId`): `Promise`\<`PostgresJsDatabase`\<`Record`\<`string`, `unknown`\>\> & `object`\>

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:75](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L75)

获取租户专用的 Drizzle 实例

机制:
1. 参数验证
- 检查数据库连接配置的完整性
- 确保 postgres.url 必须存在

2. 连接池管理
- 通过 TenantConnectionPool 获取或创建租户专用连接池
- 每个租户使用独立的 schema 和连接池
- 复用已存在的连接以提高性能

原理:
- 利用 PostgreSQL 的 schema 实现多租户隔离
- 通过连接池复用减少资源开销
- 基于租户ID动态路由到对应的数据库连接

#### Parameters

##### options

[`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md)

Drizzle模块配置对象

##### tenantId

`string`

租户标识

#### Returns

`Promise`\<`PostgresJsDatabase`\<`Record`\<`string`, `unknown`\>\> & `object`\>

返回租户专用的Drizzle实例

#### Document

../../../../../../docs/tutor/drizzle/proxy.md

***

### onApplicationShutdown()

> **onApplicationShutdown**(): `Promise`\<`void`\>

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:144](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L144)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`OnApplicationShutdown.onApplicationShutdown`

***

### validateSchema()

> **validateSchema**(`schemaName`): `Promise`\<`void`\>

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.service.ts:103](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.service.ts#L103)

#### Parameters

##### schemaName

`string`

#### Returns

`Promise`\<`void`\>
