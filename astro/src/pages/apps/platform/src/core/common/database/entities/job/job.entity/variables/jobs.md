[**AIOFC API 文档 v1.0.0**](../../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/entities/job/job.entity](../README.md) / jobs

# Variable: jobs

> `const` **jobs**: `PgTableWithColumns`\<\{\}\>

Defined in: [apps/platform/src/core/common/database/entities/job/job.entity.ts:26](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/entities/job/job.entity.ts#L26)

Job实体表定义

机制说明:
1. 使用pgTable定义PostgreSQL数据表结构
2. 通过扩展运算符...继承基础字段:
   - WithIdPk: 主键ID字段
   - WithModificationDates: 创建/更新时间字段

表结构:
- 表名: jobs
- 字段:
  - id: UUID主键 (来自WithIdPk)
  - name: VARCHAR(256) 任务名称
  - createdAt: 创建时间 (来自WithModificationDates)
  - updatedAt: 更新时间 (来自WithModificationDates)

索引:
- nameIdx: 任务名称索引,提升查询性能
