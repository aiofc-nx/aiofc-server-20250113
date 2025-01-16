[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/pino-logger/src/lib/logger.interceptor](../README.md) / LoggerInterceptor

# Class: LoggerInterceptor

Defined in: [packages/pino-logger/src/lib/logger.interceptor.ts:43](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/logger.interceptor.ts#L43)

自定义日志拦截器

主要机制:
1. 请求拦截
- 使用@Injectable()装饰器标记为可注入服务
- 实现NestInterceptor接口进行请求拦截
- 通过ExecutionContext获取请求和响应对象

2. 日志记录
- 使用NestJS内置Logger进行日志输出
- 记录请求接收和响应完成的日志
- 通过LoggerUtils工具类格式化日志消息

3. 性能监控
- 使用ClsService存储请求开始时间
- 计算请求处理耗时
- 在响应时输出耗时信息

要点:
- 统一的日志格式和处理
- 请求全生命周期的监控
- 错误情况下也保证日志输出
- 使用响应式编程处理异步流程

## Implements

- `NestInterceptor`

## Constructors

### new LoggerInterceptor()

> **new LoggerInterceptor**(`cls`): [`LoggerInterceptor`](LoggerInterceptor.md)

Defined in: [packages/pino-logger/src/lib/logger.interceptor.ts:46](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/logger.interceptor.ts#L46)

#### Parameters

##### cls

`ClsService`

#### Returns

[`LoggerInterceptor`](LoggerInterceptor.md)

## Properties

### cls

> `private` `readonly` **cls**: `ClsService`

Defined in: [packages/pino-logger/src/lib/logger.interceptor.ts:46](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/logger.interceptor.ts#L46)

***

### logger

> `private` `readonly` **logger**: `Logger`

Defined in: [packages/pino-logger/src/lib/logger.interceptor.ts:44](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/logger.interceptor.ts#L44)

## Methods

### intercept()

> **intercept**(`context`, `next`): `Observable`\<`any`\>

Defined in: [packages/pino-logger/src/lib/logger.interceptor.ts:48](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/pino-logger/src/lib/logger.interceptor.ts#L48)

Method to implement a custom interceptor.

#### Parameters

##### context

`ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next

`CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns

`Observable`\<`any`\>

#### Implementation of

`NestInterceptor.intercept`
