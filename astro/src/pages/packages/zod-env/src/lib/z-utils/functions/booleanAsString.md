[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/zod-env/src/lib/z-utils](../README.md) / booleanAsString

# Function: booleanAsString()

> **booleanAsString**(): `ZodEffects`\<`ZodOptional`\<`ZodNullable`\<`ZodUnion`\<\[`ZodEnum`\<\[`"true"`, `"false"`, `""`\]\>, `ZodBoolean`\]\>\>\>, `boolean`, `boolean` \| `""` \| `"true"` \| `"false"`\>

Defined in: [packages/zod-env/src/lib/z-utils.ts:37](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/zod-env/src/lib/z-utils.ts#L37)

把字符串形式的布尔值表达式转换为真正的布尔值的工具函数。

## Returns

`ZodEffects`\<`ZodOptional`\<`ZodNullable`\<`ZodUnion`\<\[`ZodEnum`\<\[`"true"`, `"false"`, `""`\]\>, `ZodBoolean`\]\>\>\>, `boolean`, `boolean` \| `""` \| `"true"` \| `"false"`\>

Zod schema，用于验证和转换布尔值字符串

## Remarks

我们经常会遇到用字符串形式表示布尔值的场景，比如：
- 数据库中的布尔值字段
- 配置文件中的布尔值字段
- 命令行参数中的布尔值字段，等等。
但是，这些字符串形式布尔值表达式需要转换为真正的布尔值才能运算。

该函数可以:
- 接受字符串 'true'、'false' 或空字符串
- 接受原生布尔值 true/false
- 接受 null/undefined 值
将所有输入值将被转换为布尔值:
   - 'true' 或 true 转换为 true
   - 其他所有值转换为 false

## Example

```ts
const schema = booleanAsString();

// 字符串输入
await schema.parseAsync('true')     // 返回 true
await schema.parseAsync('false')    // 返回 false
await schema.parseAsync('')         // 返回 false

// 布尔值输入
await schema.parseAsync(true)       // 返回 true
await schema.parseAsync(false)      // 返回 false

// 特殊值
await schema.parseAsync(null)       // 返回 false
await schema.parseAsync(undefined)  // 返回 false *
```
