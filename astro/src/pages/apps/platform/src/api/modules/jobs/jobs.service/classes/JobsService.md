[**AIOFC API 文档 v1.0.0**](../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../modules.md) / [apps/platform/src/api/modules/jobs/jobs.service](../README.md) / JobsService

# Class: JobsService

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:31](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L31)

Jobs服务层

主要机制:
1. 依赖注入
- 使用@Injectable()装饰器标记为可注入的服务
- 通过构造函数注入JobDao数据访问对象

2. 数据库操作封装
- 所有方法都是异步的,返回Promise
- 通过JobDao封装具体的数据库操作
- 使用TypeScript类型确保类型安全

3. CRUD操作实现
- 实现标准的增删改查功能
- 支持单条和批量操作

要点:
- 业务逻辑与数据访问分离，我们可以通过注入不同的Dao来实现不同的数据库操作（甚至实现使用不同的orm和数据库）
- 统一的错误处理
- 类型安全的数据传输

## Constructors

### new JobsService()

> **new JobsService**(`jobDao`): [`JobsService`](JobsService.md)

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:35](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L35)

#### Parameters

##### jobDao

[`JobDao`](../../../../../core/common/database/entities/job/job.dao/classes/JobDao.md)

#### Returns

[`JobsService`](JobsService.md)

## Properties

### jobDao

> `private` `readonly` **jobDao**: [`JobDao`](../../../../../core/common/database/entities/job/job.dao/classes/JobDao.md)

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:35](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L35)

***

### logger

> `private` `readonly` **logger**: `Logger`

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:32](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L32)

## Methods

### addJob()

> **addJob**(`jobName`, `tenantId`): `Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:44](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L44)

添加新工作

要点:
- 接收工作名称作为参数
- 返回插入的记录信息

#### Parameters

##### jobName

`string`

##### tenantId

`string`

#### Returns

`Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)\>

***

### deleteJob()

> **deleteJob**(`id`): `Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:104](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L104)

删除指定工作

要点:
- 根据ID删除单条记录
- 返回受影响的记录数组

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)[]\>

***

### deleteJobs()

> **deleteJobs**(): `Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:118](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L118)

删除所有工作

要点:
- 批量删除操作
- 返回受影响的记录数组

#### Returns

`Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)[]\>

***

### getAllJobs()

> **getAllJobs**(): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:92](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L92)

获取所有工作

要点:
- 返回完整的实体数组

#### Returns

`Promise`\<`object`[]\>

***

### getById()

> **getById**(`id`): `Promise`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:58](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L58)

根据ID获取工作

要点:
- 指定返回的字段列表
- 类型转换确保返回正确的实体类型

#### Parameters

##### id

`string`

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>

***

### updateJob()

> **updateJob**(`id`, `newName`): `Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)[]\>

Defined in: [apps/platform/src/api/modules/jobs/jobs.service.ts:79](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/jobs.service.ts#L79)

更新工作信息

要点:
- 支持部分字段更新
- 返回更新后的记录数组

#### Parameters

##### id

`string`

##### newName

`string`

#### Returns

`Promise`\<[`JobEntityInsert`](../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntityInsert.md)[]\>
