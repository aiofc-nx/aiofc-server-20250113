[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/entities/entities.schema](../README.md) / EntitiesSchema

# Variable: EntitiesSchema

> `const` **EntitiesSchema**: `Record`\<`string`, `unknown`\>

Defined in: [apps/platform/src/core/common/database/entities/entities.schema.ts:20](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/entities.schema.ts#L20)

实体Schema聚合对象

机制说明:
1. 使用对象展开运算符(...)合并所有实体Schema
2. 提供统一的Schema访问入口

要点:
- 集中管理所有实体Schema定义
- 便于在数据库操作中统一引用
- 支持动态扩展添加新的实体Schema

工作原理:
1. 导入各个实体模块的Schema定义
2. 通过展开运算符将所有Schema合并到一个对象中
3. 导出统一的EntitiesSchema供系统使用
