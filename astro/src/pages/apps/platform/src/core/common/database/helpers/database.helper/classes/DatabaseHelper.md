[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/helpers/database.helper](../README.md) / DatabaseHelper

# Class: DatabaseHelper

Defined in: [apps/platform/src/core/common/database/helpers/database.helper.ts:22](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/helpers/database.helper.ts#L22)

数据库辅助工具类

机制说明:
1. 提供数据库Schema管理的静态方法
2. 支持数据库迁移、Schema清理和检查等操作
3. 使用pg客户端进行数据库连接和操作
4. 集成drizzle-orm进行ORM操作

要点:
- 所有方法都是静态的,可直接调用
- 自动管理数据库连接的开启和关闭
- 支持安全的Schema操作和迁移
- 使用参数化查询防止SQL注入

## Constructors

### new DatabaseHelper()

> **new DatabaseHelper**(): [`DatabaseHelper`](DatabaseHelper.md)

#### Returns

[`DatabaseHelper`](DatabaseHelper.md)

## Methods

### cleanSchema()

> `static` **cleanSchema**(`connectionString`, `schemaName`): `Promise`\<`void`\>

Defined in: [apps/platform/src/core/common/database/helpers/database.helper.ts:62](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/helpers/database.helper.ts#L62)

清理指定Schema

机制:
1. 建立数据库连接
2. 级联删除Schema及其所有对象

原理:
- CASCADE确保删除所有依赖对象
- IF EXISTS防止Schema不存在时报错

#### Parameters

##### connectionString

`string`

##### schemaName

`string`

#### Returns

`Promise`\<`void`\>

***

### hasSchema()

> `static` **hasSchema**(`connectionString`, `schemaName`): `Promise`\<`boolean`\>

Defined in: [apps/platform/src/core/common/database/helpers/database.helper.ts:85](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/helpers/database.helper.ts#L85)

检查Schema是否存在

机制:
1. 查询系统表pg_namespace
2. 返回Schema存在状态

原理:
- 使用PostgreSQL系统目录表进行查询
- 通过EXISTS子查询优化性能

#### Parameters

##### connectionString

`string`

##### schemaName

`string`

#### Returns

`Promise`\<`boolean`\>

***

### runMigrations()

> `static` **runMigrations**(`migrationsFolderPath`, `connectionString`, `schemaName`): `Promise`\<`void`\>

Defined in: [apps/platform/src/core/common/database/helpers/database.helper.ts:32](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/helpers/database.helper.ts#L32)

运行数据库迁移

机制:
1. 建立数据库连接
2. 确保目标Schema存在
3. 切换到目标Schema
4. 执行迁移操作

#### Parameters

##### migrationsFolderPath

`string`

##### connectionString

`string`

##### schemaName

`string`

#### Returns

`Promise`\<`void`\>
