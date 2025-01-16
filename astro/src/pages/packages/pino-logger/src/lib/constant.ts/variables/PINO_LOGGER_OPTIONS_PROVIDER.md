[**AIOFC API 文档 v1.0.0**](../../../../../../README.md)

***

[AIOFC API 文档](../../../../../../modules.md) / [packages/pino-logger/src/lib/constant.ts](../README.md) / PINO\_LOGGER\_OPTIONS\_PROVIDER

# Variable: PINO\_LOGGER\_OPTIONS\_PROVIDER

> `const` **PINO\_LOGGER\_OPTIONS\_PROVIDER**: `"PINO_LOGGER_OPTIONS"` = `'PINO_LOGGER_OPTIONS'`

Defined in: packages/pino-logger/src/lib/constant.ts.ts:18

自定义日志选项提供者标识符

机制说明:
1. 常量定义
- 使用常量定义避免魔法字符串
- 作为依赖注入令牌使用

2. 依赖注入
- 在 NestJS 中用作提供者的标识符
- 允许自定义日志选项的注入

要点:
- 使用大写命名规范表示常量
- 字符串类型明确声明
- 命名清晰表达用途
