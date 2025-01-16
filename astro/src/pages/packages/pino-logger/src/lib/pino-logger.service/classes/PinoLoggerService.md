[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/pino-logger/src/lib/pino-logger.service](../README.md) / PinoLoggerService

# Class: PinoLoggerService

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:8](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L8)

## Implements

- `LoggerService`

## Constructors

### new PinoLoggerService()

> **new PinoLoggerService**(`options`, `cls`): [`PinoLoggerService`](PinoLoggerService.md)

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:12](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L12)

#### Parameters

##### options

`PrettyOptions`

##### cls

`ClsService`

#### Returns

[`PinoLoggerService`](PinoLoggerService.md)

## Properties

### cls

> `private` `readonly` **cls**: `ClsService`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:14](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L14)

***

### options

> `private` **options**: `PrettyOptions`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:13](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L13)

***

### pinoLogger

> `private` `readonly` **pinoLogger**: `Logger`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:10](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L10)

***

### instance

> `private` `static` **instance**: [`PinoLoggerService`](PinoLoggerService.md)

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:9](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L9)

## Methods

### debug()

> **debug**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:83](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L83)

Write a 'debug' level log.

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

#### Implementation of

`LoggerService.debug`

***

### error()

> **error**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:73](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L73)

Write an 'error' level log.

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

#### Implementation of

`LoggerService.error`

***

### fatal()

> **fatal**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:93](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L93)

Write a 'fatal' level log.

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

#### Implementation of

`LoggerService.fatal`

***

### getContext()

> `private` **getContext**(): `ClsStore`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:109](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L109)

#### Returns

`ClsStore`

***

### getPinoLogger()

> **getPinoLogger**(): `Logger`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:64](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L64)

#### Returns

`Logger`

***

### info()

> **info**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:98](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L98)

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

***

### log()

> **log**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:69](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L69)

Write a 'log' level log.

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

#### Implementation of

`LoggerService.log`

***

### trace()

> **trace**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:103](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L103)

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

***

### verbose()

> **verbose**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:88](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L88)

Write a 'verbose' level log.

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

#### Implementation of

`LoggerService.verbose`

***

### warn()

> **warn**(`message`, ...`optionalParams`): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:78](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L78)

Write a 'warn' level log.

#### Parameters

##### message

`any`

##### optionalParams

...`any`[]

#### Returns

`void`

#### Implementation of

`LoggerService.warn`

***

### error()

> `static` **error**(`message`, `context`?): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:59](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L59)

#### Parameters

##### message

`any`

##### context?

`any`

#### Returns

`void`

***

### getDefaultLogger()

> `static` **getDefaultLogger**(): `Logger`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:37](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L37)

#### Returns

`Logger`

***

### info()

> `static` **info**(`message`, `context`?): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:55](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L55)

#### Parameters

##### message

`any`

##### context?

`any`

#### Returns

`void`

***

### log()

> `static` **log**(`message`, `context`?): `void`

Defined in: [packages/pino-logger/src/lib/pino-logger.service.ts:51](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/pino-logger.service.ts#L51)

#### Parameters

##### message

`any`

##### context?

`any`

#### Returns

`void`
