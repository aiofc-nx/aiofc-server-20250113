[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/nestjs-drizzle/src/postgres-js/postgres-js.interface](../README.md) / DrizzlePostgresConfig

# Interface: DrizzlePostgresConfig

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.interface.ts:28](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.interface.ts#L28)

Drizzle PostgreSQL 配置接口

机制说明:
1. 定义PostgreSQL数据库连接和Drizzle ORM的配置结构
2. 使用TypeScript接口确保类型安全
3. 支持可选配置参数的灵活配置

主要配置:
1. postgres对象:
   - url: 数据库连接字符串
   - config: postgres.js的连接配置选项(可选)
2. config: Drizzle ORM的全局配置选项(可选)

要点:
- 使用泛型支持自定义PostgreSQL类型
- 通过可选参数提供配置灵活性
- 集成postgres.js和Drizzle ORM的配置类型

工作原理:
1. 在创建数据库连接时使用此配置接口
2. 验证并应用用户提供的配置选项
3. 确保配置参数类型正确性

## Properties

### config?

> `optional` **config**: `DrizzleConfig`\<`any`\>

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.interface.ts:33](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.interface.ts#L33)

***

### postgres

> **postgres**: `object`

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.interface.ts:29](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.interface.ts#L29)

#### config?

> `optional` **config**: `Options`\<`Record`\<`string`, `PostgresType`\>\>

#### url

> **url**: `string`
