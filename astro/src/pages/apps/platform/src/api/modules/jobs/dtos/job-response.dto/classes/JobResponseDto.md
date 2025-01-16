[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/api/modules/jobs/dtos/job-response.dto](../README.md) / JobResponseDto

# Class: JobResponseDto

Defined in: [apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts:13](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts#L13)

基础数据传输对象(DTO)抽象类
定义这个抽象类是为了统一DTO的验证和清理方法

机制说明:
1. 使用Zod进行数据验证和类型推断
2. 提供统一的数据验证和清理方法
3. 所有DTO类都继承自此基类

主要功能:
- 定义统一的schema验证规则
- 提供完整和部分数据的验证方法
- 清理多余的数据字段

## Extends

- [`BaseDto`](../../../../../../core/common/base/base.dto/classes/BaseDto.md)

## Implements

- `Pick`\<[`JobEntity`](../../../../../../core/common/database/entities/job/job.entity/type-aliases/JobEntity.md), `"name"` \| `"tenantId"`\>

## Constructors

### new JobResponseDto()

> **new JobResponseDto**(): [`JobResponseDto`](JobResponseDto.md)

#### Returns

[`JobResponseDto`](JobResponseDto.md)

#### Inherited from

[`BaseDto`](../../../../../../core/common/base/base.dto/classes/BaseDto.md).[`constructor`](../../../../../../core/common/base/base.dto/classes/BaseDto.md#constructors)

## Properties

### name

> **name**: `string`

Defined in: [apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts:17](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts#L17)

#### Implementation of

`Pick.name`

***

### tenantId

> **tenantId**: `string`

Defined in: [apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts:18](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts#L18)

#### Implementation of

`Pick.tenantId`

***

### schema

> `static` **schema**: `ZodObject`\<\{ `name`: `ZodString`; `tenantId`: `ZodString`; \}, `"strip"`, \{ `name`: `string`; `tenantId`: `string`; \}, \{ `name`: `string`; `tenantId`: `string`; \}\> = `jobResponseSchema`

Defined in: [apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts:19](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/api/modules/jobs/dtos/job-response.dto.ts#L19)

Zod验证模式
每个继承的子类都需要定义自己的schema

#### Overrides

[`BaseDto`](../../../../../../core/common/base/base.dto/classes/BaseDto.md).[`schema`](../../../../../../core/common/base/base.dto/classes/BaseDto.md#schema)

## Methods

### cleanData()

> `static` **cleanData**\<`T`\>(`data`): `T`

Defined in: [apps/platform/src/core/common/base/base.dto.ts:72](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/base/base.dto.ts#L72)

清理数据

#### Type Parameters

• **T** *extends* `Record`\<`string`, `any`\>

#### Parameters

##### data

`T`

需要清理的数据对象

#### Returns

`T`

只保留schema中定义的字段的数据

工作流程:
1. 获取schema中定义的所有字段
2. 仅保留schema中存在的字段
3. 返回清理后的数据

#### Inherited from

[`BaseDto`](../../../../../../core/common/base/base.dto/classes/BaseDto.md).[`cleanData`](../../../../../../core/common/base/base.dto/classes/BaseDto.md#cleandata)

***

### validate()

> `static` **validate**\<`S`\>(`this`, `data`): `TypeOf`\<`S`\>

Defined in: [apps/platform/src/core/common/base/base.dto.ts:34](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/base/base.dto.ts#L34)

验证完整数据

#### Type Parameters

• **S** *extends* `ZodObject`\<`any`, \{\}, \{\}\>

#### Parameters

##### this

###### cleanData

\<`T`\>(`data`) => `T`

###### schema

`S`

##### data

`unknown`

待验证的未知数据

#### Returns

`TypeOf`\<`S`\>

验证并清理后的数据

工作流程:
1. 使用schema验证数据
2. 清理验证后的数据

#### Inherited from

[`BaseDto`](../../../../../../core/common/base/base.dto/classes/BaseDto.md).[`validate`](../../../../../../core/common/base/base.dto/classes/BaseDto.md#validate)

***

### validatePartial()

> `static` **validatePartial**\<`S`\>(`this`, `data`): `Partial`\<`TypeOf`\<`S`\>\>

Defined in: [apps/platform/src/core/common/base/base.dto.ts:53](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/base/base.dto.ts#L53)

验证部分数据

#### Type Parameters

• **S** *extends* `ZodObject`\<`any`, \{\}, \{\}\>

#### Parameters

##### this

###### cleanData

\<`T`\>(`data`) => `T`

###### schema

`S`

##### data

`unknown`

待验证的未知数据

#### Returns

`Partial`\<`TypeOf`\<`S`\>\>

验证并清理后的部分数据

工作流程:
1. 将schema转换为部分验证模式
2. 验证数据
3. 清理验证后的数据

#### Inherited from

[`BaseDto`](../../../../../../core/common/base/base.dto/classes/BaseDto.md).[`validatePartial`](../../../../../../core/common/base/base.dto/classes/BaseDto.md#validatepartial)
