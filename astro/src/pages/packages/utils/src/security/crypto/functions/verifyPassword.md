[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/utils/src/security/crypto](../README.md) / verifyPassword

# Function: verifyPassword()

> **verifyPassword**(`password`, `hashedPassword`): `Promise`\<`boolean`\>

Defined in: [packages/utils/src/security/crypto.ts:75](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/packages/utils/src/security/crypto.ts#L75)

验证密码是否匹配

## Parameters

### password

`string`

待验证的原始密码

### hashedPassword

`string`

已加密的密码哈希值

## Returns

`Promise`\<`boolean`\>

返回密码是否匹配的布尔值
