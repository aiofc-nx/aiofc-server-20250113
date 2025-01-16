[**AIOFC API 文档 v1.0.0**](../../../../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../../../../modules.md) / [apps/platform/src/core/common/database/drizzle/drizzle.decorator](../README.md) / InjectDrizzle

# Function: InjectDrizzle()

> **InjectDrizzle**(`tag`): `PropertyDecorator` & `ParameterDecorator`

Defined in: [apps/platform/src/core/common/database/drizzle/drizzle.decorator.ts:23](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/core/common/database/drizzle/drizzle.decorator.ts#L23)

Drizzle注入装饰器

机制:
1. 依赖注入
- 基于NestJS的@Inject装饰器封装
- 支持自定义注入标识符
- 默认使用PG_CONNECTION作为标识

要点:
- 简化Drizzle实例的注入过程
- 支持多数据库连接场景
- 保持与NestJS依赖注入系统的一致性

原理:
- 利用装饰器工厂模式实现可配置的依赖注入
- 通过闭包保存注入标识符
- 复用NestJS原生注入机制

## Parameters

### tag

`string` = `TENANT_PG_CONNECTION`

## Returns

`PropertyDecorator` & `ParameterDecorator`
