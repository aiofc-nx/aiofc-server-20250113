import { z } from 'zod';

/**
 * 把字符串形式的布尔值表达式转换为真正的布尔值的工具函数。
 * @remarks
 * 我们经常会遇到用字符串形式表示布尔值的场景，比如：
 * - 数据库中的布尔值字段
 * - 配置文件中的布尔值字段
 * - 命令行参数中的布尔值字段，等等。
 * 但是，这些字符串形式布尔值表达式需要转换为真正的布尔值才能运算。
 *
 * 该函数可以:
 * - 接受字符串 'true'、'false' 或空字符串
 * - 接受原生布尔值 true/false
 * - 接受 null/undefined 值
 * 将所有输入值将被转换为布尔值:
 *    - 'true' 或 true 转换为 true
 *    - 其他所有值转换为 false
 * @returns Zod schema，用于验证和转换布尔值字符串
 *
 * @example
 * const schema = booleanAsString();
 *
 * // 字符串输入
 * await schema.parseAsync('true')     // 返回 true
 * await schema.parseAsync('false')    // 返回 false
 * await schema.parseAsync('')         // 返回 false
 *
 * // 布尔值输入
 * await schema.parseAsync(true)       // 返回 true
 * await schema.parseAsync(false)      // 返回 false
 *
 * // 特殊值
 * await schema.parseAsync(null)       // 返回 false
 * await schema.parseAsync(undefined)  // 返回 false *
 */
export const booleanAsString = () =>
  z
    .enum(['true', 'false', ''])
    .or(z.boolean())
    .nullish()
    .transform((value) => {
      return value === 'true' || value === true;
    });

/**
 * 将字符串形式的数字转换为数字类型的工具函数。
 * @remarks
 * 在处理环境变量或配置文件时，数字经常以字符串形式存储。
 * 该函数可以将字符串形式的数字自动转换为数字类型，并提供默认值。
 *
 * @param defaultValue - 当输入为空或无效时使用的默认数字值
 * @returns Zod schema，用于验证和转换数字字符串
 *
 * @example
 * const schema = stringNumber(100);
 *
 * // 字符串输入
 * await schema.parseAsync('42')    // 返回 42
 * await schema.parseAsync('3.14')  // 返回 3.14
 * await schema.parseAsync('')      // 返回 100 (默认值)
 *
 * // 数字输入
 * await schema.parseAsync(42)      // 返回 42
 * await schema.parseAsync(3.14)    // 返回 3.14
 *
 * // 特殊值
 * await schema.parseAsync(null)    // 返回 100 (默认值)
 * await schema.parseAsync(undefined) // 返回 100 (默认值)
 */
export const stringNumber = (defaultValue: number) =>
  z.coerce.number().default(defaultValue);
