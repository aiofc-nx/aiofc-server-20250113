[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/pino-logger/src/lib/drizzle-logger.service](../README.md) / DrizzleLoggerService

# Class: DrizzleLoggerService

Defined in: [packages/pino-logger/src/lib/drizzle-logger.service.ts:8](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/drizzle-logger.service.ts#L8)

用于记录插值查询的自定义 Drizzle 记录器。这对于准备将查询复制粘贴到 Datagrip/DBeaver/etc 中非常有用

## Implements

- `Logger`

## Constructors

### new DrizzleLoggerService()

> **new DrizzleLoggerService**(): [`DrizzleLoggerService`](DrizzleLoggerService.md)

#### Returns

[`DrizzleLoggerService`](DrizzleLoggerService.md)

## Properties

### logger

> `private` `readonly` **logger**: `Logger`

Defined in: [packages/pino-logger/src/lib/drizzle-logger.service.ts:9](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/drizzle-logger.service.ts#L9)

## Methods

### interpolateQuery()

> `private` **interpolateQuery**(`query`, `parameters`?): `string`

Defined in: [packages/pino-logger/src/lib/drizzle-logger.service.ts:38](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/drizzle-logger.service.ts#L38)

查询参数插值处理

主要机制:
1. 参数替换
- 接收原始SQL查询和参数数组
- 遍历参数数组进行替换处理
- 使用正则表达式匹配$1,$2等占位符

2. 参数格式化
- 对象类型参数转换为JSON字符串
- 非对象类型参数直接使用值
- 所有参数值添加单引号包裹

3. 安全处理
- 检查参数数组是否存在且有值
- 保持原始查询不变如果没有参数

#### Parameters

##### query

`string`

原始SQL查询字符串

##### parameters?

`any`[]

查询参数数组

#### Returns

`string`

插值后的完整SQL查询

***

### logQuery()

> **logQuery**(`query`, `params`): `void`

Defined in: [packages/pino-logger/src/lib/drizzle-logger.service.ts:11](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/drizzle-logger.service.ts#L11)

#### Parameters

##### query

`string`

##### params

`unknown`[]

#### Returns

`void`

#### Implementation of

`Logger.logQuery`
