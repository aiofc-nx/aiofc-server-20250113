import { Inject } from '@nestjs/common';

/**
 * 注入DrizzlePostgresConfig配置
 *
 * 机制:
 * 1. 使用Inject函数注入配置
 * 2. 通过configTag参数指定配置标签
 * 3. 返回注入的配置
 */
export const InjectDrizzle = (configTag = 'default') => {
  return Inject(configTag);
};

// 使用示例
// @InjectDrizzle('mySchema')
// private drizzle: DrizzlePostgresConfig;
