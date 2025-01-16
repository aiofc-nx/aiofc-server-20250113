[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/pino-logger/src/lib/logger](../README.md) / Logger

# Class: Logger

Defined in: packages/pino-logger/src/lib/logger.ts:9

## Constructors

### new Logger()

> **new Logger**(): [`Logger`](Logger.md)

#### Returns

[`Logger`](Logger.md)

## Properties

### \_config

> `private` `static` **\_config**: [`LoggerConfig`](../../config/interfaces/LoggerConfig.md)

Defined in: packages/pino-logger/src/lib/logger.ts:10

## Accessors

### config

#### Get Signature

> **get** `static` **config**(): [`LoggerConfig`](../../config/interfaces/LoggerConfig.md)

Defined in: packages/pino-logger/src/lib/logger.ts:16

##### Returns

[`LoggerConfig`](../../config/interfaces/LoggerConfig.md)

***

### defaultFastifyAdapterLogger

#### Get Signature

> **get** `static` **defaultFastifyAdapterLogger**(): `FastifyServerOptions`

Defined in: packages/pino-logger/src/lib/logger.ts:32

##### Returns

`FastifyServerOptions`

## Methods

### basePinoPrettyOptions()

> `private` `static` **basePinoPrettyOptions**(): `PrettyOptions`

Defined in: packages/pino-logger/src/lib/logger.ts:74

#### Returns

`PrettyOptions`

***

### customReceivedMessage()

> `static` **customReceivedMessage**(`req`): `string`

Defined in: packages/pino-logger/src/lib/logger.ts:87

#### Parameters

##### req

`FastifyRequest`\<`IncomingMessage`, `ResolveFastifyRequestType`\<`FastifyTypeProviderDefault`, `FastifySchema`, `RouteGenericInterface`\>\>

#### Returns

`string`

***

### customResponseMessage()

> `static` **customResponseMessage**(`req`, `res`, `elapsedTime`?, `statusCode`?): `string`

Defined in: packages/pino-logger/src/lib/logger.ts:92

#### Parameters

##### req

`FastifyRequest`\<`IncomingMessage`, `ResolveFastifyRequestType`\<`FastifyTypeProviderDefault`, `FastifySchema`, `RouteGenericInterface`\>\>

##### res

`FastifyReply`\<`IncomingMessage`, `ServerResponse`\>

##### elapsedTime?

`number`

##### statusCode?

`number`

#### Returns

`string`

***

### generateLoggerIdForHttpContext()

> `static` **generateLoggerIdForHttpContext**(`req`): `string`

Defined in: packages/pino-logger/src/lib/logger.ts:47

使用 TRACKING_ID_HEADER（如果存在），否则生成随机 UUID。

#### Parameters

##### req

`IncomingMessage`

#### Returns

`string`

***

### getLogger()

> `static` **getLogger**(): `BaseLogger`

Defined in: packages/pino-logger/src/lib/logger.ts:28

#### Returns

`BaseLogger`

***

### httpLoggerOptions()

> `static` **httpLoggerOptions**(): `PrettyOptions`

Defined in: packages/pino-logger/src/lib/logger.ts:67

#### Returns

`PrettyOptions`

***

### microserviceLoggerOptions()

> `static` **microserviceLoggerOptions**(): `PrettyOptions`

Defined in: packages/pino-logger/src/lib/logger.ts:60

#### Returns

`PrettyOptions`

***

### pinoPrettyLogger()

> `static` **pinoPrettyLogger**(`options`?): `BaseLogger`

Defined in: packages/pino-logger/src/lib/logger.ts:52

#### Parameters

##### options?

`PrettyOptions`

#### Returns

`BaseLogger`

***

### setConfig()

> `static` **setConfig**(`options`): `void`

Defined in: packages/pino-logger/src/lib/logger.ts:12

#### Parameters

##### options

[`LoggerConfig`](../../config/interfaces/LoggerConfig.md)

#### Returns

`void`
