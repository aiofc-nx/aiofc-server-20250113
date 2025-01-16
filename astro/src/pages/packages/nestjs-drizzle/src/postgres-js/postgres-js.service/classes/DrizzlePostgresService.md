[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/nestjs-drizzle/src/postgres-js/postgres-js.service](../README.md) / DrizzlePostgresService

# Class: DrizzlePostgresService

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.service.ts:23](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.service.ts#L23)

DrizzlePostgres服务类

主要功能:
- 创建和管理PostgreSQL数据库连接
- 初始化Drizzle ORM实例

实现机制:
1. 使用@Injectable()装饰器标记为可注入的服务
2. 通过postgres.js创建数据库客户端连接
3. 使用drizzle-orm包装客户端实现ORM功能

使用要点:
- 需要传入正确的数据库连接配置
- postgres配置包含url和其他连接参数
- 支持可选的drizzle ORM配置项

## Constructors

### new DrizzlePostgresService()

> **new DrizzlePostgresService**(): [`DrizzlePostgresService`](DrizzlePostgresService.md)

#### Returns

[`DrizzlePostgresService`](DrizzlePostgresService.md)

## Methods

### getDrizzle()

> **getDrizzle**(`options`): `PostgresJsDatabase`\<`any`\> & `object`

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.service.ts:29](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.service.ts#L29)

获取Drizzle ORM实例

#### Parameters

##### options

[`DrizzlePostgresConfig`](../../postgres-js.interface/interfaces/DrizzlePostgresConfig.md)

数据库配置选项

#### Returns

`PostgresJsDatabase`\<`any`\> & `object`

Drizzle ORM实例
