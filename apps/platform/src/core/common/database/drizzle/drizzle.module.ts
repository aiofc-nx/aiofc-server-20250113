import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from './pg-connection';
import { EntitiesSchema } from '../entities/entities.schema';
import { DatabaseConfig } from '../config/database.config';
import { CustomDrizzleLoggingService } from '../../../logging/custom-logging/custom-drizzle-logging.service';
/**
 * DrizzleModule - 数据库连接模块
 *
 * 主要功能:
 * - 创建和管理PostgreSQL数据库的连接池
 * - 配置Drizzle ORM
 * - 导出数据库连接供其他模块使用
 *
 * 实现机制:
 * 1. 配置管理
 *    - 使用ConfigModule加载数据库配置
 *    - 通过DatabaseConfig进行配置验证
 *
 * 2. 连接池管理
 *    - 使用node-postgres的Pool创建连接池
 *    - 通过连接字符串配置数据库连接参数
 *
 * 3. ORM配置
 *    - 使用Drizzle ORM管理数据库操作
 *    - 集成自定义日志服务(CustomDrizzleLoggingService)
 *    - 通过EntitiesSchema定义数据模型
 *
 * 要点:
 * - 使用依赖注入方式管理数据库配置和连接
 * - 通过Provider工厂函数异步创建数据库连接
 * - 导出PG_CONNECTION令牌供其他模块注入使用
 */
@Module({
  imports: [
    /**
     * 配置模块初始化
     *
     * 机制:
     * 1. 使用ConfigModule.forRoot()进行全局配置初始化
     * 2. 通过validate选项进行配置验证
     * 3. 配置验证失败时会抛出异常,阻止应用启动
     *
     * 要点:
     * - 在模块初始化时进行配置验证
     * - 使用DatabaseConfig.validateConfiguration作为验证函数
     * - 验证数据库连接字符串等关键配置
     *
     * 原理:
     * - ConfigModule会加载环境变量和配置文件
     * - 验证函数对配置进行类型检查和有效性验证
     * - 验证通过后配置对象会被注入到依赖注入容器
     */
    ConfigModule.forRoot({
      // 通过validate选项注入验证函数
      validate: DatabaseConfig.validateConfiguration,
    }),
  ],
  providers: [
    DatabaseConfig,
    {
      provide: PG_CONNECTION, // 这个令牌是和大括号内的代码绑定的，调用时注入这个令牌就行了
      inject: [DatabaseConfig], // 注入DatabaseConfig
      // 使用useFactory提供一个异步函数，返回一个PG_CONNECTION
      useFactory: async (dbConfig: DatabaseConfig) => {
        // 使用 postgres.js 创建连接
        const client = postgres(dbConfig.postgresqlConnection);

        return drizzle(client, {
          schema: EntitiesSchema,
          logger: new CustomDrizzleLoggingService(),
        });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}

/**
 *
不需要定义多个 DrizzleModule。你可以在同一个 DrizzleModule 中配置多个 schema 的连接。这里有几种实现方式：

### 1. 使用同一个数据库，不同 schema

```typescript:src/core/common/database/drizzle/drizzle.module.ts
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    DatabaseConfig,
    {
      provide: 'SCHEMA_1_CONNECTION',
      inject: [DatabaseConfig],
      useFactory: async (dbConfig: DatabaseConfig) => {
        const pool = new Pool({
          connectionString: dbConfig.postgresqlConnection,
        });
        return drizzle(pool, { 
          schema: Schema1Entities,  // 第一个 schema
          logger: new CustomDrizzleLoggingService() 
        });
      },
    },
    {
      provide: 'SCHEMA_2_CONNECTION',
      inject: [DatabaseConfig],
      useFactory: async (dbConfig: DatabaseConfig) => {
        const pool = new Pool({
          connectionString: dbConfig.postgresqlConnection,
        });
        return drizzle(pool, { 
          schema: Schema2Entities,  // 第二个 schema
          logger: new CustomDrizzleLoggingService() 
        });
      },
    }
  ],
  exports: ['SCHEMA_1_CONNECTION', 'SCHEMA_2_CONNECTION'],
})
export class DrizzleModule {}
```

### 2. 使用不同数据库连接

```typescript:src/core/common/database/drizzle/drizzle.module.ts
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    DatabaseConfig,
    {
      provide: 'DB1_CONNECTION',
      inject: [DatabaseConfig],
      useFactory: async (dbConfig: DatabaseConfig) => {
        const pool = new Pool({
          connectionString: dbConfig.db1Connection,  // 第一个数据库连接
        });
        return drizzle(pool, { 
          schema: DB1Schema,
          logger: new CustomDrizzleLoggingService() 
        });
      },
    },
    {
      provide: 'DB2_CONNECTION',
      inject: [DatabaseConfig],
      useFactory: async (dbConfig: DatabaseConfig) => {
        const pool = new Pool({
          connectionString: dbConfig.db2Connection,  // 第二个数据库连接
        });
        return drizzle(pool, { 
          schema: DB2Schema,
          logger: new CustomDrizzleLoggingService() 
        });
      },
    }
  ],
  exports: ['DB1_CONNECTION', 'DB2_CONNECTION'],
})
export class DrizzleModule {}
```

### 3. 在 DAO 中使用

```typescript:src/core/common/database/entities/some.dao.ts
export class SomeDao {
  constructor(
    @Inject('DB1_CONNECTION') private db1: PostgresJsDatabase<DB1Schema>,
    @Inject('DB2_CONNECTION') private db2: PostgresJsDatabase<DB2Schema>,
  ) {}

  async someMethod() {
    // 使用第一个数据库
    const result1 = await this.db1.select().from(table1);
    
    // 使用第二个数据库
    const result2 = await this.db2.select().from(table2);
  }
}
```

### 4. 定义连接令牌常量

```typescript:src/core/common/database/constants.ts
export const DB1_CONNECTION = 'DB1_CONNECTION';
export const DB2_CONNECTION = 'DB2_CONNECTION';
```

### 5. 配置类型定义

```typescript:src/core/common/database/config/database.config.ts
export class DatabaseConfig {
  @IsString()
  db1Connection: string;

  @IsString()
  db2Connection: string;

  static validateConfiguration(config: Record<string, unknown>) {
    const dbConfig = new DatabaseConfig();
    dbConfig.db1Connection = config.DB1_CONNECTION as string;
    dbConfig.db2Connection = config.DB2_CONNECTION as string;
    return dbConfig;
  }
}
```

### 优点：

1. **集中管理**：所有数据库连接在一个模块中管理
2. **清晰的依赖关系**：每个连接都有自己的注入令牌
3. **类型安全**：每个 schema 都有自己的类型定义
4. **灵活性**：可以轻松添加更多的数据库连接

### 注意事项：

1. **连接池管理**：每个连接都会创建自己的连接池，需要合理配置连接池大小
2. **资源消耗**：多个连接会消耗更多的系统资源
3. **事务处理**：跨数据库的事务需要特别处理
4. **配置管理**：需要管理多个数据库的配置信息

这种方式可以让你在一个应用中轻松管理多个数据库或 schema，同时保持代码的组织性和可维护性。

 */
