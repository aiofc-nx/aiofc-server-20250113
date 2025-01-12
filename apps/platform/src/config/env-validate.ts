import { z } from 'zod';

/**
 * 字符串转数字的工具函数
 * @param defaultValue 默认数值
 * @returns Zod 数字转换器，可以将字符串转为数字并提供默认值
 */
const stringNumber = (defaultValue: number) =>
  z.coerce.number().default(defaultValue);

/**
 * 环境配置验证模式
 * 定义了应用程序所需的所有配置项及其类型
 */
export const EnvSchema = z.object({
  /**
   * 数据库配置部分
   */
  database: z.object({
    user: z.string(), // 数据库用户名
    password: z.string(), // 数据库密码
    host: z.string(), // 数据库主机地址
    port: stringNumber(5438), // 数据库端口，默认5438
    name: z.string(), // 数据库名称
    schema: z.string(), // 数据库schema
    pool: z.object({
      max: stringNumber(20), // 连接池最大连接数，默认20
      min: stringNumber(2), // 连接池最小连接数，默认2
    }),
  }),

  /**
   * API服务配置部分
   */
  api: z.object({
    port: stringNumber(3000), // API服务端口，默认3000
    globalPrefix: z.string().default('api'), // API全局路由前缀，默认'api'
  }),

  /**
   * 日志配置部分
   */
  logger: z.object({
    trackingIdHeader: z.coerce.string().optional(), // 可选的追踪ID请求头
  }),
});

/**
 * 配置验证函数
 * @param config 待验证的配置对象
 * @returns 经过验证和类型转换的配置对象
 * @throws 当验证失败时抛出错误
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

/**
 * 导出环境配置的TypeScript类型
 * 通过Zod的infer功能自动推导出配置对象的类型
 */
export type EnvValidateConfig = z.infer<typeof EnvSchema>;
