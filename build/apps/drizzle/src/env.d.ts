import { z } from 'zod';
/**
 * 环境变量验证模式
 *
 * 定义了所需的环境变量及其类型:
 * - NODE_ENV: 运行环境,默认为development
 * - DB_*: 数据库连接相关配置
 * - DATABASE_URL: 完整的数据库连接URL
 * - DB_MIGRATING/DB_SEEDING: 控制数据库迁移和种子数据填充的标志
 */
declare const EnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodString>;
    DB_HOST: z.ZodString;
    DB_USER: z.ZodString;
    DB_PASSWORD: z.ZodString;
    DB_NAME: z.ZodString;
    DB_PORT: z.ZodNumber;
    DATABASE_URL: z.ZodString;
    DB_MIGRATING: z.ZodDefault<z.ZodEffects<z.ZodString, boolean, string>>;
    MIGRATIONS_FOLDER: z.ZodString;
    DB_SEEDING: z.ZodDefault<z.ZodEffects<z.ZodString, boolean, string>>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV?: string;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    DB_PORT?: number;
    DATABASE_URL?: string;
    DB_MIGRATING?: boolean;
    MIGRATIONS_FOLDER?: string;
    DB_SEEDING?: boolean;
}, {
    NODE_ENV?: string;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    DB_PORT?: number;
    DATABASE_URL?: string;
    DB_MIGRATING?: string;
    MIGRATIONS_FOLDER?: string;
    DB_SEEDING?: string;
}>;
/**
 * 导出环境变量类型定义
 */
export type EnvSchema = z.infer<typeof EnvSchema>;
/**
 * 导出经过验证的环境变量对象
 */
declare const _default: {
    NODE_ENV?: string;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    DB_PORT?: number;
    DATABASE_URL?: string;
    DB_MIGRATING?: boolean;
    MIGRATIONS_FOLDER?: string;
    DB_SEEDING?: boolean;
};
export default _default;
