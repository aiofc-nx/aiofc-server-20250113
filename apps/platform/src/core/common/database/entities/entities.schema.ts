import * as jobsSchema from '../entities/job/job.entity';

/**
 * 实体Schema聚合对象
 *
 * 机制说明:
 * 1. 使用对象展开运算符(...)合并所有实体Schema
 * 2. 提供统一的Schema访问入口
 *
 * 要点:
 * - 集中管理所有实体Schema定义
 * - 便于在数据库操作中统一引用
 * - 支持动态扩展添加新的实体Schema
 *
 * 工作原理:
 * 1. 导入各个实体模块的Schema定义
 * 2. 通过展开运算符将所有Schema合并到一个对象中
 * 3. 导出统一的EntitiesSchema供系统使用
 */
export const EntitiesSchema: Record<string, unknown> = { ...jobsSchema };

/**
 * 示例：
 *
 * `EntitiesSchema` 是一个聚合（aggregation）文件，它的作用是将所有的表定义集中到一个地方统一管理。
 * 
 * 
### 1. Schema 的组织结构

```typescript
// 1. 单个实体的定义 (job.entity.ts)
export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  name: text('name'),
  // ... 其他字段
});

export const jobLogs = pgTable('job_logs', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').references(() => jobs.id),
  // ... 其他字段
});

// 导出这个领域的所有表
export { jobs, jobLogs };
```

### 2. Schema 的聚合

```typescript:src/core/common/database/entities/entities.schema.ts
// 导入所有领域的 schema
import * as jobsSchema from './job/job.entity';
import * as usersSchema from './user/user.entity';  // 假设还有用户模块
import * as ordersSchema from './order/order.entity';  // 假设还有订单模块

// 聚合所有 schema
export const EntitiesSchema = {
  ...jobsSchema,
  ...usersSchema,
  ...ordersSchema
};
```

### 3. 最终结构

```typescript
// EntitiesSchema 的实际结构会是这样：
{
  jobs: TableConfig,
  jobLogs: TableConfig,
  users: TableConfig,
  userProfiles: TableConfig,
  orders: TableConfig,
  orderItems: TableConfig,
  // ... 其他表
}
```

### 4. 优点

1. **模块化组织**
   - 每个业务领域的表定义可以放在独立的文件中
   - 便于维护和管理
   - 符合领域驱动设计（DDD）的思想

2. **统一入口**
   ```typescript
   drizzle(pool, { 
     schema: EntitiesSchema,  // 一次性注入所有表定义
     logger: new CustomDrizzleLoggingService() 
   });
   ```

3. **灵活扩展**
   ```typescript
   // 添加新的模块只需要：
   import * as newModule from './new/module.entity';
   export const EntitiesSchema = {
     ...jobsSchema,
     ...newModule  // 轻松添加新模块
   };
   ```

4. **类型安全**
   ```typescript
   // 所有表的类型都会被正确推导
   type AllTables = typeof EntitiesSchema;
   ```

这种组织方式让你可以：
- 按领域模块化组织表定义
- 集中管理所有数据库表
- 方便地扩展新的表和模块
- 保持代码的整洁和可维护性

 */
