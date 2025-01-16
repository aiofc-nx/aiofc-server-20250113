[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/utils/src/security/crypto](../README.md) / hashPassword

# Function: hashPassword()

> **hashPassword**(`password`): `Promise`\<`string`\>

Defined in: [packages/utils/src/security/crypto.ts:65](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/utils/src/security/crypto.ts#L65)

使用argon2算法对密码进行加密

## Parameters

### password

`string`

需要加密的原始密码

## Returns

`Promise`\<`string`\>

返回加密后的密码哈希值

## Todo

添加盐值处理
