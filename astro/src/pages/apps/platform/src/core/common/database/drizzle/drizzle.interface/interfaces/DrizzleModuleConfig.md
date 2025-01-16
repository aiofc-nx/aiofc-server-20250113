[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/drizzle/drizzle.interface](../README.md) / DrizzleModuleConfig

# Interface: DrizzleModuleConfig

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.interface.ts:37](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.interface.ts#L37)

Drizzle模块配置接口

 DrizzleModuleConfig

## Description

该接口定义了Drizzle ORM模块的配置选项

## Example

```typescript
const config: DrizzleModuleConfig = {
  postgres: {
    url: 'postgres://user:pass@localhost:5432/db',
    config: {
      max: 10, // 最大连接数
      idle_timeout: 20 // 空闲超时(秒)
    }
  },
  schema: mySchema, // 数据库表结构定义
  config: {
    logger: true // 启用SQL查询日志
  },
  tag: 'main' // 连接池标识
}
```

## Properties

### config?

> `optional` **config**: `DrizzleConfig`\<`any`\>

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.interface.ts:43](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.interface.ts#L43)

Drizzle ORM的配置选项(可选)

***

### postgres

> **postgres**: `object`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.interface.ts:38](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.interface.ts#L38)

PostgreSQL数据库连接配置

#### config?

> `optional` **config**: `Options`\<`Record`\<`string`, `PostgresType`\>\>

#### url

> **url**: `string`

***

### schema?

> `optional` **schema**: `any`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.interface.ts:42](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.interface.ts#L42)

数据库schema定义(可选)

***

### tag?

> `optional` **tag**: `string`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.interface.ts:44](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.interface.ts#L44)

用于标识特定连接池的标签(可选)
