[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [apps/platform/src/config/app-config.service](../README.md) / AppConfig

# Class: AppConfig

Defined in: [apps/platform/src/config/app-config.service.ts:15](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/config/app-config.service.ts#L15)

AppConfig 类

职责：
1. 管理应用程序的配置
2. 通过依赖注入提供配置数据
3. 提供类型安全的配置访问接口

## Extends

- [`ZodEnv`](../../../../../../packages/zod-env/src/lib/zod-env/classes/ZodEnv.md)\<[`EnvValidatedConfig`](../../env-schema/type-aliases/EnvValidatedConfig.md)\>

## Constructors

### new AppConfig()

> **new AppConfig**(): [`AppConfig`](AppConfig.md)

Defined in: [apps/platform/src/config/app-config.service.ts:16](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/config/app-config.service.ts#L16)

#### Returns

[`AppConfig`](AppConfig.md)

#### Overrides

[`ZodEnv`](../../../../../../packages/zod-env/src/lib/zod-env/classes/ZodEnv.md).[`constructor`](../../../../../../packages/zod-env/src/lib/zod-env/classes/ZodEnv.md#constructors)

## Accessors

### config

#### Get Signature

> **get** **config**(): `T`

Defined in: [packages/zod-env/src/lib/zod-env.ts:73](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/zod-env/src/lib/zod-env.ts#L73)

获取验证后的配置对象

##### Returns

`T`

类型安全的配置对象

#### Inherited from

[`ZodEnv`](../../../../../../packages/zod-env/src/lib/zod-env/classes/ZodEnv.md).[`config`](../../../../../../packages/zod-env/src/lib/zod-env/classes/ZodEnv.md#config)

***

### database

#### Get Signature

> **get** **database**(): `Readonly`\<\{ `host`: `string`; `name`: `string`; `password`: `string`; `pool`: \{ `max`: `number`; `min`: `number`; \}; `port`: `number`; `schema`: `string`; `user`: `string`; \}\>

Defined in: [apps/platform/src/config/app-config.service.ts:22](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/config/app-config.service.ts#L22)

##### Returns

`Readonly`\<\{ `host`: `string`; `name`: `string`; `password`: `string`; `pool`: \{ `max`: `number`; `min`: `number`; \}; `port`: `number`; `schema`: `string`; `user`: `string`; \}\>

***

### logger

#### Get Signature

> **get** **logger**(): `Readonly`\<\{ `trackingIdHeader`: `string`; \}\>

Defined in: [apps/platform/src/config/app-config.service.ts:30](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/config/app-config.service.ts#L30)

##### Returns

`Readonly`\<\{ `trackingIdHeader`: `string`; \}\>

***

### server

#### Get Signature

> **get** **server**(): `Readonly`\<\{ `globalPrefix`: `string`; `port`: `number`; \}\>

Defined in: [apps/platform/src/config/app-config.service.ts:26](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/config/app-config.service.ts#L26)

##### Returns

`Readonly`\<\{ `globalPrefix`: `string`; `port`: `number`; \}\>
