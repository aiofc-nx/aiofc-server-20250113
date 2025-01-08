/**
 * 自定义日志选项提供者标识符
 *
 * 机制说明:
 * 1. 常量定义
 * - 使用常量定义避免魔法字符串
 * - 作为依赖注入令牌使用
 *
 * 2. 依赖注入
 * - 在 NestJS 中用作提供者的标识符
 * - 允许自定义日志选项的注入
 *
 * 要点:
 * - 使用大写命名规范表示常量
 * - 字符串类型明确声明
 * - 命名清晰表达用途
 */
export const CUSTOM_LOGGING_OPTIONS_PROVIDER = 'CUSTOM_LOGGING_OPTIONS';
