import { z } from 'zod';

/**
 * 字符串数字转换器
 */
const stringNumber = (defaultValue: number) =>
  z.coerce.number().default(defaultValue);

/**
 * 修改验证模式以匹配 YAML 结构
 */
export const EnvSchema = z.object({
  database: z.object({
    user: z.string(),
    password: z.string(),
    host: z.string(),
    port: stringNumber(5438),
    name: z.string(),
    schema: z.string(),
    pool: z.object({
      max: stringNumber(20),
      min: stringNumber(2),
    }),
  }),
  api: z.object({
    port: stringNumber(3000),
    globalPrefix: z.string().default('api'),
  }),
});

/**
 * 配置验证函数
 */
export const envValidate = (
  config: Record<string, unknown>,
): z.infer<typeof EnvSchema> => {
  console.log('开始验证配置:', JSON.stringify(config, null, 2));
  try {
    const validated = EnvSchema.parse(config);
    console.log('验证通过:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('验证失败:', error);
    throw error;
  }
};

export type EnvConfig = z.infer<typeof EnvSchema>;
