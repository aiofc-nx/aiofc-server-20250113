[**AIOFC API 文档 v1.0.0**](../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../modules.md) / [apps/platform/src/core/common/tenant/tenant.middleware](../README.md) / TenantMiddleware

# Class: TenantMiddleware

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:40](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L40)

租户中间件

主要机制:
1. 请求拦截
- 拦截所有HTTP请求
- 从请求头中提取租户信息
- 将租户信息存储到请求上下文

2. 租户隔离
- 使用ClsService维护请求级别的租户上下文
- 通过TenantContextService管理租户状态
- 支持多租户数据隔离

3. 路径排除
- 维护排除路径列表
- 对特定路径使用默认租户

要点:
- 统一的租户信息提取和验证
- 灵活的路径排除机制
- 完善的错误处理和日志记录

原理:
- 基于NestJS中间件机制实现请求拦截
- 利用ClsService实现请求作用域的数据存储
- 通过正则表达式验证租户ID格式

## Implements

- `NestMiddleware`

## Constructors

### new TenantMiddleware()

> **new TenantMiddleware**(`tenantContextService`, `cls`): [`TenantMiddleware`](TenantMiddleware.md)

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:44](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L44)

#### Parameters

##### tenantContextService

[`TenantContextService`](../../tenant-context.service/classes/TenantContextService.md)

##### cls

`ClsService`

#### Returns

[`TenantMiddleware`](TenantMiddleware.md)

## Properties

### cls

> `private` `readonly` **cls**: `ClsService`

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:46](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L46)

***

### EXCLUDED\_PATHS

> `private` `readonly` **EXCLUDED\_PATHS**: `string`[]

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:42](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L42)

***

### logger

> `private` `readonly` **logger**: `Logger`

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:41](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L41)

***

### tenantContextService

> `private` `readonly` **tenantContextService**: [`TenantContextService`](../../tenant-context.service/classes/TenantContextService.md)

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:45](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L45)

## Methods

### formatHeaders()

> `private` **formatHeaders**(`headers`): `string`

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:56](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L56)

#### Parameters

##### headers

`Record`\<`string`, `any`\>

#### Returns

`string`

***

### isExcludedPath()

> `private` **isExcludedPath**(`path`): `boolean`

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:51](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L51)

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### use()

> **use**(`req`, `_res`, `next`): `void`

Defined in: [apps/platform/src/core/common/tenant/tenant.middleware.ts:63](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant.middleware.ts#L63)

#### Parameters

##### req

`Request`

##### \_res

`Response`

##### next

`NextFunction`

#### Returns

`void`

#### Implementation of

`NestMiddleware.use`
