import { stringNumber } from '@aiofc/zod-env';
import { z } from 'zod';

export const EnvSchema = z.object({
  /**
   * API服务配置部分
   */
  server: z.object({
    port: stringNumber(3000), // API服务端口，默认3000
    globalPrefix: z.string().default('api'), // API全局路由前缀，默认'api'
  }),
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
   * 日志配置部分
   */
  logger: z.object({
    trackingIdHeader: z.coerce.string().optional(), // 可选的追踪ID请求头
  }),
});

export type EnvValidatedConfig = z.infer<typeof EnvSchema>;
