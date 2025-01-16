[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/nestjs-drizzle/src/postgres-js/postgres-js.decorator](../README.md) / InjectDrizzle

# Function: InjectDrizzle()

> **InjectDrizzle**(`configTag`): `PropertyDecorator` & `ParameterDecorator`

Defined in: [packages/nestjs-drizzle/src/postgres-js/postgres-js.decorator.ts:11](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/nestjs-drizzle/src/postgres-js/postgres-js.decorator.ts#L11)

注入DrizzlePostgresConfig配置

机制:
1. 使用Inject函数注入配置
2. 通过configTag参数指定配置标签
3. 返回注入的配置

## Parameters

### configTag

`string` = `'default'`

## Returns

`PropertyDecorator` & `ParameterDecorator`
