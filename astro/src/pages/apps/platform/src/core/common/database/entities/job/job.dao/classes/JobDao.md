[**AIOFC API 文档 v1.0.0**](../../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/entities/job/job.dao](../README.md) / JobDao

# Class: JobDao

Defined in: [apps/platform/src/core/common/database/entities/job/job.dao.ts:12](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/job/job.dao.ts#L12)

抽象数据访问对象基类
Dao属于数据访问层（Data Access Layer），负责与数据库进行交互，相当于typeorm的Repository

这个抽象类的功能:
1. 使用泛型实现通用CRUD操作
2. 提供完整的数据库操作接口
其他的Dao类继承这个抽象类，获得CRUD操作的能力

泛型参数说明:
- Entity: 实体表类型
- InferEntitySelected: 查询结果类型
- InferEntityInsert: 插入数据类型

## Extends

- [`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md)\<*typeof* [`jobs`](../../job.entity/variables/jobs.md), [`JobEntity`](../../job.entity/type-aliases/JobEntity.md), [`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)\>

## Constructors

### new JobDao()

> **new JobDao**(`db`): [`JobDao`](JobDao.md)

Defined in: [apps/platform/src/core/common/database/entities/job/job.dao.ts:17](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/job/job.dao.ts#L17)

#### Parameters

##### db

`PostgresJsDatabase`

#### Returns

[`JobDao`](JobDao.md)

#### Overrides

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`constructor`](../../../abstract.dao/classes/AbstractDao.md#constructors)

## Properties

### db

> `protected` `readonly` **db**: `PostgresJsDatabase`

Defined in: [apps/platform/src/core/common/database/entities/job/job.dao.ts:19](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/job/job.dao.ts#L19)

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`db`](../../../abstract.dao/classes/AbstractDao.md#db-1)

## Methods

### deleteAll()

> **deleteAll**(): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:137](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L137)

删除所有记录

#### Returns

`Promise`\<`object`[]\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`deleteAll`](../../../abstract.dao/classes/AbstractDao.md#deleteall)

***

### deleteById()

> **deleteById**(`id`): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:111](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L111)

根据ID删除记录

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`object`[]\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`deleteById`](../../../abstract.dao/classes/AbstractDao.md#deletebyid)

***

### getAll()

> **getAll**(): `Promise`\<`object`[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:33](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L33)

获取所有记录

#### Returns

`Promise`\<`object`[]\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`getAll`](../../../abstract.dao/classes/AbstractDao.md#getall)

***

### getById()

> **getById**(`id`, `fieldsToSelect`?): `Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:44](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L44)

根据ID获取记录

要点:
- 支持选择性返回字段
- 使用eq进行相等条件查询

#### Parameters

##### id

`string`

##### fieldsToSelect?

(`"id"` \| `"name"` \| `"createdAt"` \| `"updatedAt"` \| `"tenantId"` \| keyof PgTable\<\{ name: "jobs"; schema: undefined; columns: \{ createdAt: PgColumn\<\{ name: "created\_at"; tableName: "jobs"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; ... 7 more ...; generated: undefined; \}, \{\}, \{\}\>; updatedAt: PgColumn\<...\>; name: PgColumn\<...\>; tenant... \| `"enableRLS"`)[]

#### Returns

`Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>[]\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`getById`](../../../abstract.dao/classes/AbstractDao.md#getbyid)

***

### getBySingleKey()

> **getBySingleKey**(`key`, `value`, `fieldsToSelect`?): `Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:69](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L69)

根据单个键值对查询记录

#### Parameters

##### key

`"id"` | `"name"` | `"createdAt"` | `"updatedAt"` | `"tenantId"` | keyof PgTable\<\{ name: "jobs"; schema: undefined; columns: \{ createdAt: PgColumn\<\{ name: "created\_at"; tableName: "jobs"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; ... 7 more ...; generated: undefined; \}, \{\}, \{\}\>; updatedAt: PgColumn\<...\>; name: PgColumn\<...\>; tenant... | `"enableRLS"`

##### value

`any`

##### fieldsToSelect?

(`"id"` \| `"name"` \| `"createdAt"` \| `"updatedAt"` \| `"tenantId"` \| keyof PgTable\<\{ name: "jobs"; schema: undefined; columns: \{ createdAt: PgColumn\<\{ name: "created\_at"; tableName: "jobs"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; ... 7 more ...; generated: undefined; \}, \{\}, \{\}\>; updatedAt: PgColumn\<...\>; name: PgColumn\<...\>; tenant... \| `"enableRLS"`)[]

#### Returns

`Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>[]\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`getBySingleKey`](../../../abstract.dao/classes/AbstractDao.md#getbysinglekey)

***

### getOneById()

> **getOneById**(`id`, `fieldsToSelect`?): `Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:58](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L58)

根据ID获取单条记录

#### Parameters

##### id

`string`

##### fieldsToSelect?

(`"id"` \| `"name"` \| `"createdAt"` \| `"updatedAt"` \| `"tenantId"` \| keyof PgTable\<\{ name: "jobs"; schema: undefined; columns: \{ createdAt: PgColumn\<\{ name: "created\_at"; tableName: "jobs"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; ... 7 more ...; generated: undefined; \}, \{\}, \{\}\>; updatedAt: PgColumn\<...\>; name: PgColumn\<...\>; tenant... \| `"enableRLS"`)[]

#### Returns

`Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`getOneById`](../../../abstract.dao/classes/AbstractDao.md#getonebyid)

***

### getOneBySingleKey()

> **getOneBySingleKey**(`key`, `value`, `fieldsToSelect`?): `Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:85](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L85)

根据单个键值对查询单条记录

#### Parameters

##### key

`"id"` | `"name"` | `"createdAt"` | `"updatedAt"` | `"tenantId"` | keyof PgTable\<\{ name: "jobs"; schema: undefined; columns: \{ createdAt: PgColumn\<\{ name: "created\_at"; tableName: "jobs"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; ... 7 more ...; generated: undefined; \}, \{\}, \{\}\>; updatedAt: PgColumn\<...\>; name: PgColumn\<...\>; tenant... | `"enableRLS"`

##### value

`any`

##### fieldsToSelect?

(`"id"` \| `"name"` \| `"createdAt"` \| `"updatedAt"` \| `"tenantId"` \| keyof PgTable\<\{ name: "jobs"; schema: undefined; columns: \{ createdAt: PgColumn\<\{ name: "created\_at"; tableName: "jobs"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: true; ... 7 more ...; generated: undefined; \}, \{\}, \{\}\>; updatedAt: PgColumn\<...\>; name: PgColumn\<...\>; tenant... \| `"enableRLS"`)[]

#### Returns

`Promise`\<`Partial`\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `tenantId`: `string`; `updatedAt`: `Date`; \}\>\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`getOneBySingleKey`](../../../abstract.dao/classes/AbstractDao.md#getonebysinglekey)

***

### insertNewRecord()

> **insertNewRecord**(`entity`): `Promise`\<[`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:97](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L97)

插入新记录

#### Parameters

##### entity

[`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)

#### Returns

`Promise`\<[`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`insertNewRecord`](../../../abstract.dao/classes/AbstractDao.md#insertnewrecord)

***

### updateById()

> **updateById**(`id`, `fieldsToUpdate`): `Promise`\<[`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:122](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L122)

根据ID更新记录

#### Parameters

##### id

`string`

##### fieldsToUpdate

`Partial`\<[`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)\>

#### Returns

`Promise`\<[`JobEntityInsert`](../../job.entity/type-aliases/JobEntityInsert.md)[]\>

#### Inherited from

[`AbstractDao`](../../../abstract.dao/classes/AbstractDao.md).[`updateById`](../../../abstract.dao/classes/AbstractDao.md#updatebyid)
