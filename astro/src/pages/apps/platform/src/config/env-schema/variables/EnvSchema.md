[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [apps/platform/src/config/env-schema](../README.md) / EnvSchema

# Variable: EnvSchema

> `const` **EnvSchema**: `ZodObject`\<\{ `database`: `ZodObject`\<\{ `host`: `ZodString`; `name`: `ZodString`; `password`: `ZodString`; `pool`: `ZodObject`\<\{ `max`: `ZodDefault`\<`ZodNumber`\>; `min`: `ZodDefault`\<`ZodNumber`\>; \}, `"strip"`, \{ `max`: `number`; `min`: `number`; \}, \{ `max`: `number`; `min`: `number`; \}\>; `port`: `ZodDefault`\<`ZodNumber`\>; `schema`: `ZodString`; `user`: `ZodString`; \}, `"strip"`, \{ `host`: `string`; `name`: `string`; `password`: `string`; `pool`: \{ `max`: `number`; `min`: `number`; \}; `port`: `number`; `schema`: `string`; `user`: `string`; \}, \{ `host`: `string`; `name`: `string`; `password`: `string`; `pool`: \{ `max`: `number`; `min`: `number`; \}; `port`: `number`; `schema`: `string`; `user`: `string`; \}\>; `logger`: `ZodObject`\<\{ `trackingIdHeader`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, \{ `trackingIdHeader`: `string`; \}, \{ `trackingIdHeader`: `string`; \}\>; `server`: `ZodObject`\<\{ `globalPrefix`: `ZodDefault`\<`ZodString`\>; `port`: `ZodDefault`\<`ZodNumber`\>; \}, `"strip"`, \{ `globalPrefix`: `string`; `port`: `number`; \}, \{ `globalPrefix`: `string`; `port`: `number`; \}\>; \}, `"strip"`, \{ `database`: \{ `host`: `string`; `name`: `string`; `password`: `string`; `pool`: \{ `max`: `number`; `min`: `number`; \}; `port`: `number`; `schema`: `string`; `user`: `string`; \}; `logger`: \{ `trackingIdHeader`: `string`; \}; `server`: \{ `globalPrefix`: `string`; `port`: `number`; \}; \}, \{ `database`: \{ `host`: `string`; `name`: `string`; `password`: `string`; `pool`: \{ `max`: `number`; `min`: `number`; \}; `port`: `number`; `schema`: `string`; `user`: `string`; \}; `logger`: \{ `trackingIdHeader`: `string`; \}; `server`: \{ `globalPrefix`: `string`; `port`: `number`; \}; \}\>

Defined in: [apps/platform/src/config/env-schema.ts:4](https://github.com/aiofc-nx/aiofc-server-20250113/blob/c42968e9d610c830827b0ce80268360670d99c8b/apps/platform/src/config/env-schema.ts#L4)
