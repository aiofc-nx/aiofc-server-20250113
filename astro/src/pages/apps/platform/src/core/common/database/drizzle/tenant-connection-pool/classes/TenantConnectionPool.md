[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/drizzle/tenant-connection-pool](../README.md) / TenantConnectionPool

# Class: TenantConnectionPool

Defined in: [apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts:14](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts#L14)

租户连接池类

机制说明：
1. 使用静态Map存储所有租户的数据库连接
2. 每个租户都有独立的连接池和schema
3. 采用懒加载方式，首次访问时才创建连接
4. 通过search_path参数实现多租户数据隔离

## Constructors

### new TenantConnectionPool()

> **new TenantConnectionPool**(): [`TenantConnectionPool`](TenantConnectionPool.md)

#### Returns

[`TenantConnectionPool`](TenantConnectionPool.md)

## Properties

### logger

> `private` `static` **logger**: `Logger`

Defined in: [apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts:15](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts#L15)

***

### pools

> `private` `static` **pools**: `Map`\<`string`, \{ `client`: `Sql`; `db`: `PostgresJsDatabase`\<`Record`\<`string`, `unknown`\>\> & `object`; \}\>

Defined in: [apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts:22](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts#L22)

存储所有租户连接池的静态Map
key: 租户ID
value: 包含drizzle实例和postgres客户端的对象

## Methods

### closeAll()

> `static` **closeAll**(): `Promise`\<`void`\>

Defined in: [apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts:67](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts#L67)

关闭所有租户的数据库连接

清理机制：
1. 遍历所有活跃的连接池
2. 依次关闭每个租户的客户端连接
3. 清空连接池Map

#### Returns

`Promise`\<`void`\>

***

### getPool()

> `static` **getPool**(`tenantId`, `config`): `Promise`\<`PostgresJsDatabase`\<`Record`\<`string`, `unknown`\>\> & `object`\>

Defined in: [apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts:39](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/tenant-connection-pool.ts#L39)

获取指定租户的数据库连接池

工作原理：
1. 根据租户ID生成唯一的poolKey
2. 如果连接池不存在，则创建新的连接
3. 通过URL参数设置schema搜索路径
4. 配置连接池参数(最大连接数、超时时间等)

#### Parameters

##### tenantId

`string`

##### config

[`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md)

#### Returns

`Promise`\<`PostgresJsDatabase`\<`Record`\<`string`, `unknown`\>\> & `object`\>
