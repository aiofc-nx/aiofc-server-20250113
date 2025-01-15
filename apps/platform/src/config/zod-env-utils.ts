import { z } from 'zod';

/**
 * 创建一个处理布尔值字符串的函数，返回一个 Zod schema
 *
 * 该函数返回一个 Zod schema，它可以:
 * 1. 接受字符串 'true'、'false' 或空字符串
 * 2. 接受原生布尔值 true/false
 * 3. 接受 null/undefined 值
 * 4. 将所有输入转换为布尔值:
 *    - 'true' 或 true 转换为 true
 *    - 其他所有值转换为 false
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
 * await schema.parseAsync(undefined)  // 返回 false
 *
 * @returns Zod schema，用于验证和转换布尔值字符串
 */
export const booleanAsString = () =>
  z
    .enum(['true', 'false', ''])
    .or(z.boolean())
    .nullish()
    .transform((value) => {
      return value === 'true' || value === true;
    });
