[**AIOFC API 文档 v1.0.0**](../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../modules.md) / [apps/platform/src/core/common/tenant/tenant-context.service](../README.md) / TenantContextService

# Class: TenantContextService

Defined in: [apps/platform/src/core/common/tenant/tenant-context.service.ts:21](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant-context.service.ts#L21)

租户上下文服务

机制说明:
- 使用 NestJS 的请求作用域注入，确保每个请求都有独立的实例
- 基于 nestjs-cls 实现请求级别的数据存储，用于在请求生命周期内共享租户信息

主要功能:
1. 设置当前请求的租户ID
2. 获取当前请求的租户ID

实现要点:
- 使用 ClsService 存储租户信息，确保线程安全
- 严格的租户ID校验，防止无效数据
- 异常处理确保系统稳定性

## Constructors

### new TenantContextService()

> **new TenantContextService**(`cls`): [`TenantContextService`](TenantContextService.md)

Defined in: [apps/platform/src/core/common/tenant/tenant-context.service.ts:22](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant-context.service.ts#L22)

#### Parameters

##### cls

`ClsService`

#### Returns

[`TenantContextService`](TenantContextService.md)

## Properties

### cls

> `private` `readonly` **cls**: `ClsService`

Defined in: [apps/platform/src/core/common/tenant/tenant-context.service.ts:22](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant-context.service.ts#L22)

## Methods

### getTenantId()

> **getTenantId**(): `string`

Defined in: [apps/platform/src/core/common/tenant/tenant-context.service.ts:43](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant-context.service.ts#L43)

获取当前租户ID

#### Returns

`string`

当前租户ID

#### Throws

BadRequestException 当租户上下文未初始化时抛出异常

***

### setTenant()

> **setTenant**(`tenantId`): `void`

Defined in: [apps/platform/src/core/common/tenant/tenant-context.service.ts:30](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/tenant/tenant-context.service.ts#L30)

设置租户ID

#### Parameters

##### tenantId

`string`

租户标识

#### Returns

`void`

#### Throws

BadRequestException 当租户ID为空时抛出异常
