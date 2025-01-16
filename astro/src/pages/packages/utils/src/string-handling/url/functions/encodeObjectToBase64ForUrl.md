[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/utils/src/string-handling/url](../README.md) / encodeObjectToBase64ForUrl

# Function: encodeObjectToBase64ForUrl()

> **encodeObjectToBase64ForUrl**(`obj`): `string`

Defined in: [packages/utils/src/string-handling/url.ts:53](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/utils/src/string-handling/url.ts#L53)

将对象编码为URL安全的Base64字符串

## Parameters

### obj

`Record`\<`string`, `unknown`\>

要编码的JavaScript对象

## Returns

`string`

URL安全的Base64编码字符串

## Description

该函数将JavaScript对象编码为URL安全的Base64字符串:
1. 将对象转换为JSON字符串
2. 使用UTF-8编码转换为Buffer
3. 转换为Base64字符串
4. URL编码确保安全传输
