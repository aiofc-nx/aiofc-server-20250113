[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/utils/src/string-handling/string](../README.md) / toCapitalizedWords

# Function: toCapitalizedWords()

> **toCapitalizedWords**(`name`?): `string`

Defined in: [packages/utils/src/string-handling/string.ts:24](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/utils/src/string-handling/string.ts#L24)

将字符串转换为大写单词形式

## Parameters

### name?

`string`

输入字符串,可选参数

## Returns

`string`

转换后的大写单词字符串

## Description

该函数将输入字符串转换为大写单词形式:
1. 如果输入为undefined,返回空字符串
2. 将字符串转为小写
3. 使用正则表达式匹配单词
4. 对每个单词进行首字母大写处理
5. 用空格连接所有单词
