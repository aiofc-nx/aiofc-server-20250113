/**
 * 环境变量配置接口
 * 与 env.config.ts 中的 Zod schema 保持一致
 */
export interface EnvironmentVariables {
  // 数据库配置
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST_NAME: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_SCHEMA_NAME: string;
  DB_POOL_MAX: number;
  DB_POOL_MIN: number;

  // API 配置
  API_PORT: number;
  API_GLOBAL_PREFIX: string;
}

/**
 * 环境变量默认值配置
 */
export const DEFAULT_ENV_CONFIG: Partial<EnvironmentVariables> = {
  DB_PORT: 5438,
  DB_POOL_MAX: 20,
  DB_POOL_MIN: 2,
  API_PORT: 3000,
  API_GLOBAL_PREFIX: 'api',
} as const;
