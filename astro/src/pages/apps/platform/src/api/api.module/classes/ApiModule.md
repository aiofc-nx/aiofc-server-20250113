[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [apps/platform/src/api/api.module](../README.md) / ApiModule

# Class: ApiModule

Defined in: [apps/platform/src/api/api.module.ts:83](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/api.module.ts#L83)

## Implements

- `NestModule`
- `OnModuleInit`

## Constructors

### new ApiModule()

> **new ApiModule**(`appConfig`, `logger`): [`ApiModule`](ApiModule.md)

Defined in: [apps/platform/src/api/api.module.ts:84](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/api.module.ts#L84)

#### Parameters

##### appConfig

[`AppConfig`](../../../config/app-config.service/classes/AppConfig.md)

##### logger

[`PinoLoggerService`](../../../../../../packages/pino-logger/src/lib/pino-logger.service/classes/PinoLoggerService.md)

#### Returns

[`ApiModule`](ApiModule.md)

## Properties

### appConfig

> `private` `readonly` **appConfig**: [`AppConfig`](../../../config/app-config.service/classes/AppConfig.md)

Defined in: [apps/platform/src/api/api.module.ts:85](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/api.module.ts#L85)

***

### logger

> `private` `readonly` **logger**: [`PinoLoggerService`](../../../../../../packages/pino-logger/src/lib/pino-logger.service/classes/PinoLoggerService.md)

Defined in: [apps/platform/src/api/api.module.ts:86](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/api.module.ts#L86)

## Methods

### configure()

> **configure**(`consumer`): `void`

Defined in: [apps/platform/src/api/api.module.ts:112](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/api.module.ts#L112)

中间件配置方法

机制说明:
1. NestJS中间件按照应用顺序依次执行
2. ClsMiddleware用于请求上下文存储,为每个请求创建独立的存储空间
3. TenantMiddleware用于多租户识别与处理

关键要点:
- 使用consumer.apply()方法应用多个中间件
- forRoutes('*')表示对所有路由生效
- 中间件执行顺序: ClsMiddleware -> TenantMiddleware

工作原理:
1. 请求进入时,先由ClsMiddleware创建请求作用域的存储空间
2. TenantMiddleware随后从请求中提取租户信息并存储到CLS中
3. 后续的请求处理可以随时访问租户上下文

#### Parameters

##### consumer

`MiddlewareConsumer`

#### Returns

`void`

#### Implementation of

`NestModule.configure`

***

### onModuleInit()

> **onModuleInit**(): `void`

Defined in: [apps/platform/src/api/api.module.ts:89](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/api.module.ts#L89)

#### Returns

`void`

#### Implementation of

`OnModuleInit.onModuleInit`
