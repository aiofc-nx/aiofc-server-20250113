[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/utils/src/string-handling/url](../README.md) / decodeBase64StringObjectFromUrl

# Function: decodeBase64StringObjectFromUrl()

> **decodeBase64StringObjectFromUrl**(`str`?): `Record`\<`string`, `unknown`\>

Defined in: [packages/utils/src/string-handling/url.ts:24](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/utils/src/string-handling/url.ts#L24)

从URL中解码Base64字符串为对象

## Parameters

### str?

`string`

Base64编码的URL字符串,可选参数

## Returns

`Record`\<`string`, `unknown`\>

解码后的JavaScript对象

## Description

该函数将URL中的Base64编码字符串解码为JavaScript对象:
1. 如果输入为undefined,返回空对象
2. URL解码字符串
3. Base64解码为UTF-8字符串
4. 解析JSON字符串为对象
5. 如果解析失败则返回空对象
