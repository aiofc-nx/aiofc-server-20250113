[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/entities/abstract.dao](../README.md) / AbstractDao

# Class: AbstractDao\<Entity, InferEntitySelected, InferEntityInsert\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:20](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L20)

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

## Extended by

- [`JobDao`](../../job/job.dao/classes/JobDao.md)

## Type Parameters

• **Entity** *extends* `Table`

• **InferEntitySelected**

• **InferEntityInsert**

## Constructors

### new AbstractDao()

> **new AbstractDao**\<`Entity`, `InferEntitySelected`, `InferEntityInsert`\>(`db`, `entity`): [`AbstractDao`](AbstractDao.md)\<`Entity`, `InferEntitySelected`, `InferEntityInsert`\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:25](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L25)

#### Parameters

##### db

`PostgresJsDatabase`

##### entity

`Entity`

#### Returns

[`AbstractDao`](AbstractDao.md)\<`Entity`, `InferEntitySelected`, `InferEntityInsert`\>

## Properties

### db

> `protected` `readonly` **db**: `PostgresJsDatabase`

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:26](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L26)

***

### entity

> `private` `readonly` **entity**: `Entity`

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:27](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L27)

## Methods

### deleteAll()

> **deleteAll**(): `Promise`\<`Entity`\[`"$inferSelect"`\] *extends* `undefined` ? `RowList`\<`never`[]\> : `Entity`\[`"$inferSelect"`\][]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:137](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L137)

删除所有记录

#### Returns

`Promise`\<`Entity`\[`"$inferSelect"`\] *extends* `undefined` ? `RowList`\<`never`[]\> : `Entity`\[`"$inferSelect"`\][]\>

***

### deleteById()

> **deleteById**(`id`): `Promise`\<`Entity`\[`"$inferSelect"`\] *extends* `undefined` ? `RowList`\<`never`[]\> : `Entity`\[`"$inferSelect"`\][]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:111](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L111)

根据ID删除记录

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`Entity`\[`"$inferSelect"`\] *extends* `undefined` ? `RowList`\<`never`[]\> : `Entity`\[`"$inferSelect"`\][]\>

***

### getAll()

> **getAll**(): `Promise`\<`{ [K in string]: { [Key in string]: SelectResultField<GetSelectTableSelection<Entity>[Key], true> }[K] }`[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:33](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L33)

获取所有记录

#### Returns

`Promise`\<`{ [K in string]: { [Key in string]: SelectResultField<GetSelectTableSelection<Entity>[Key], true> }[K] }`[]\>

***

### getById()

> **getById**(`id`, `fieldsToSelect`?): `Promise`\<`Partial`\<`InferEntitySelected`\>[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:44](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L44)

根据ID获取记录

要点:
- 支持选择性返回字段
- 使用eq进行相等条件查询

#### Parameters

##### id

`string`

##### fieldsToSelect?

keyof `Entity`[]

#### Returns

`Promise`\<`Partial`\<`InferEntitySelected`\>[]\>

***

### getBySingleKey()

> **getBySingleKey**(`key`, `value`, `fieldsToSelect`?): `Promise`\<`Partial`\<`InferEntitySelected`\>[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:69](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L69)

根据单个键值对查询记录

#### Parameters

##### key

keyof `Entity`

##### value

`any`

##### fieldsToSelect?

keyof `Entity`[]

#### Returns

`Promise`\<`Partial`\<`InferEntitySelected`\>[]\>

***

### getOneById()

> **getOneById**(`id`, `fieldsToSelect`?): `Promise`\<`Partial`\<`InferEntitySelected`\>\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:58](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L58)

根据ID获取单条记录

#### Parameters

##### id

`string`

##### fieldsToSelect?

keyof `Entity`[]

#### Returns

`Promise`\<`Partial`\<`InferEntitySelected`\>\>

***

### getOneBySingleKey()

> **getOneBySingleKey**(`key`, `value`, `fieldsToSelect`?): `Promise`\<`Partial`\<`InferEntitySelected`\>\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:85](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L85)

根据单个键值对查询单条记录

#### Parameters

##### key

keyof `Entity`

##### value

`any`

##### fieldsToSelect?

keyof `Entity`[]

#### Returns

`Promise`\<`Partial`\<`InferEntitySelected`\>\>

***

### insertNewRecord()

> **insertNewRecord**(`entity`): `Promise`\<`InferEntityInsert`\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:97](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L97)

插入新记录

#### Parameters

##### entity

`InferEntityInsert`

#### Returns

`Promise`\<`InferEntityInsert`\>

***

### selectFields()

> `private` **selectFields**(`fieldsToSelect`?): `object`

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:144](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L144)

选择性返回字段处理

#### Parameters

##### fieldsToSelect?

keyof `Entity`[]

#### Returns

`object`

***

### updateById()

> **updateById**(`id`, `fieldsToUpdate`): `Promise`\<`InferEntityInsert`[]\>

Defined in: [apps/platform/src/core/common/database/entities/abstract.dao.ts:122](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/abstract.dao.ts#L122)

根据ID更新记录

#### Parameters

##### id

`string`

##### fieldsToUpdate

`Partial`\<`InferEntityInsert`\>

#### Returns

`Promise`\<`InferEntityInsert`[]\>
