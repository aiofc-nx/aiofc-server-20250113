[**AIOFC API 文档 v1.0.0**](../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../modules.md) / [apps/platform/src/api/modules/jobs/jobs.controller](../README.md) / JobsController

# Class: JobsController

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:25](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L25)

Jobs控制器

机制要点:
1. 使用@Controller装饰器定义基础路由'jobs'
2. 通过依赖注入方式注入JobsService服务
3. 所有方法都是异步的,返回Promise
4. 使用DTO(Data Transfer Object)进行数据传输

## Constructors

### new JobsController()

> **new JobsController**(`jobsService`): [`JobsController`](JobsController.md)

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:26](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L26)

#### Parameters

##### jobsService

[`JobsService`](../../jobs.service/classes/JobsService.md)

#### Returns

[`JobsController`](JobsController.md)

## Properties

### jobsService

> `private` `readonly` **jobsService**: [`JobsService`](../../jobs.service/classes/JobsService.md)

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:26](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L26)

## Methods

### addJob()

> **addJob**(`jobData`): `Promise`\<\{ `name`: `string`; `tenantId`: `string`; \}\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:48](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L48)

添加新工作

要点:
- 使用@Post()装饰器处理POST请求
- 使用DTO验证请求数据

#### Parameters

##### jobData

`unknown`

#### Returns

`Promise`\<\{ `name`: `string`; `tenantId`: `string`; \}\>

***

### deleteAllJobs()

> **deleteAllJobs**(): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:123](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L123)

删除所有工作

要点:
- 不带参数的DELETE请求
- 清空整个工作列表

#### Returns

`Promise`\<`object`[]\>

***

### deleteJob()

> **deleteJob**(`jobId`): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:109](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L109)

删除指定工作

要点:
- 使用@Delete(':id')处理DELETE请求
- 返回更新后的工作列表

#### Parameters

##### jobId

`string`

#### Returns

`Promise`\<`object`[]\>

***

### getAllJobs()

> **getAllJobs**(): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:36](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L36)

获取所有工作

要点:
- 使用@Get()装饰器处理GET请求
- 返回工作DTO数组

#### Returns

`Promise`\<`object`[]\>

***

### getById()

> **getById**(`jobId`): `Promise`\<\{ `name`: `string`; `tenantId`: `string`; \}\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:63](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L63)

根据ID获取工作

要点:
- 使用@Get(':id')处理带参数的GET请求
- @Param()装饰器获取URL参数

#### Parameters

##### jobId

`string`

#### Returns

`Promise`\<\{ `name`: `string`; `tenantId`: `string`; \}\>

***

### partialUpdateJob()

> **partialUpdateJob**(`jobId`, `jobData`): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:93](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L93)

部分更新工作信息

要点:
- 使用@Patch(':id')处理PATCH请求
- 使用DTO的partial验证进行部分更新

#### Parameters

##### jobId

`string`

##### jobData

`unknown`

#### Returns

`Promise`\<`object`[]\>

***

### updateJob()

> **updateJob**(`jobId`, `jobData`): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.controller.ts:77](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.controller.ts#L77)

更新工作信息

要点:
- 使用@Put(':id')处理PUT请求
- 使用DTO验证完整的请求数据

#### Parameters

##### jobId

`string`

##### jobData

`unknown`

#### Returns

`Promise`\<`object`[]\>
