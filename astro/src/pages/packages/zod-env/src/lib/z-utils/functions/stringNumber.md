[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/zod-env/src/lib/z-utils](../README.md) / stringNumber

# Function: stringNumber()

> **stringNumber**(`defaultValue`): `ZodDefault`\<`ZodNumber`\>

Defined in: [packages/zod-env/src/lib/z-utils.ts:71](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/zod-env/src/lib/z-utils.ts#L71)

将字符串形式的数字转换为数字类型的工具函数。

## Parameters

### defaultValue

`number`

当输入为空或无效时使用的默认数字值

## Returns

`ZodDefault`\<`ZodNumber`\>

Zod schema，用于验证和转换数字字符串

## Remarks

在处理环境变量或配置文件时，数字经常以字符串形式存储。
该函数可以将字符串形式的数字自动转换为数字类型，并提供默认值。

## Example

```ts
const schema = stringNumber(100);

// 字符串输入
await schema.parseAsync('42')    // 返回 42
await schema.parseAsync('3.14')  // 返回 3.14
await schema.parseAsync('')      // 返回 100 (默认值)

// 数字输入
await schema.parseAsync(42)      // 返回 42
await schema.parseAsync(3.14)    // 返回 3.14

// 特殊值
await schema.parseAsync(null)    // 返回 100 (默认值)
await schema.parseAsync(undefined) // 返回 100 (默认值)
```
