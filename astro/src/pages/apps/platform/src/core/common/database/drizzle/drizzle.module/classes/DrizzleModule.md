[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/drizzle/drizzle.module](../README.md) / DrizzleModule

# Class: DrizzleModule

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.module.ts:49](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.module.ts#L49)

DrizzleModule - Drizzle ORM的核心模块

## Remarks

主要功能:
- 提供数据库连接的全局配置
- 支持多租户数据库连接管理
- 实现同步和异步配置初始化

## Example

```typescript
// 同步配置
@Module({
  imports: [
    DrizzleModule.forRoot({
      postgres: {
        url: 'postgres://user:pass@localhost:5432/db',
        config: { max: 10 }
      }
    })
  ]
})

// 异步配置
@Module({
  imports: [
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        postgres: {
          url: config.get('DATABASE_URL'),
          config: { max: config.get('DB_MAX_CONNECTIONS') }
        }
      })
    })
  ]
})
```

## Constructors

### new DrizzleModule()

> **new DrizzleModule**(): [`DrizzleModule`](DrizzleModule.md)

#### Returns

[`DrizzleModule`](DrizzleModule.md)

## Methods

### forRoot()

> `static` **forRoot**(`drizzleConfig`): `DynamicModule`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.module.ts:56](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.module.ts#L56)

同步配置初始化方法

#### Parameters

##### drizzleConfig

[`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md)

Drizzle配置对象

#### Returns

`DynamicModule`

DynamicModule - 动态模块配置

***

### forRootAsync()

> `static` **forRootAsync**(`options`): `DynamicModule`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.module.ts:98](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.module.ts#L98)

异步配置初始化方法

#### Parameters

##### options

异步配置选项

###### imports

`any`[]

需要导入的模块数组

###### inject

`any`[]

需要注入的依赖数组

###### useFactory

(...`args`) => [`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md) \| `Promise`\<[`DrizzleModuleConfig`](../../drizzle.interface/interfaces/DrizzleModuleConfig.md)\>

工厂函数，用于生成配置

#### Returns

`DynamicModule`

DynamicModule - 动态模块配置
