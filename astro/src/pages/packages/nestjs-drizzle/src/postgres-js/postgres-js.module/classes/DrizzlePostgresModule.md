[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/nestjs-drizzle/src/postgres-js/postgres-js.module](../README.md) / DrizzlePostgresModule

# Class: DrizzlePostgresModule

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.module.ts:25](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.module.ts#L25)

DrizzlePostgres模块

机制说明:
1. 通过@Global()装饰器将模块声明为全局模块
2. 继承ConfigurableModuleClass以支持动态模块配置
3. 提供同步(register)和异步(registerAsync)两种注册方式

主要功能:
- 注册DrizzlePostgresService服务
- 根据配置创建并导出Drizzle实例
- 支持多实例通过tag区分

## Extends

- [`ConfigurableModuleClass`](../../postgres-js.definition/variables/ConfigurableModuleClass.md)

## Indexable

\[`key`: `string`\]: `any`

## Constructors

### new DrizzlePostgresModule()

> **new DrizzlePostgresModule**(): [`DrizzlePostgresModule`](DrizzlePostgresModule.md)

Defined in: node\_modules/.pnpm/@nestjs+common@10.4.15\_class-transformer@0.5.1\_class-validator@0.14.1\_reflect-metadata@0.1.14\_rxjs@7.8.1/node\_modules/@nestjs/common/module-utils/interfaces/configurable-module-cls.interface.d.ts:12

#### Returns

[`DrizzlePostgresModule`](DrizzlePostgresModule.md)

#### Inherited from

`ConfigurableModuleClass.constructor`

## Methods

### register()

> `static` **register**(`options`): `DynamicModule`

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.module.ts:35](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.module.ts#L35)

同步注册方法

要点:
1. 接收静态配置选项
2. 注册DrizzlePostgresService
3. 通过useFactory创建Drizzle实例
4. 支持自定义tag,默认为'default'

#### Parameters

##### options

[`DrizzlePostgresConfig`](../../postgres-js.interface/interfaces/DrizzlePostgresConfig.md) & `Partial`\<\{ `tag`: `string`; \}\>

#### Returns

`DynamicModule`

#### Overrides

`ConfigurableModuleClass.register`

***

### registerAsync()

> `static` **registerAsync**(`options`): `DynamicModule`

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.module.ts:64](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.module.ts#L64)

异步注册方法

要点:
1. 接收异步配置选项
2. 注册DrizzlePostgresService
3. 通过useFactory异步创建Drizzle实例
4. 注入MODULE_OPTIONS_TOKEN获取配置
5. 支持自定义tag,默认为'default'

#### Parameters

##### options

`ConfigurableModuleAsyncOptions`\<[`DrizzlePostgresConfig`](../../postgres-js.interface/interfaces/DrizzlePostgresConfig.md)\> & `Partial`\<\{ `tag`: `string`; \}\>

#### Returns

`DynamicModule`

#### Overrides

`ConfigurableModuleClass.registerAsync`
