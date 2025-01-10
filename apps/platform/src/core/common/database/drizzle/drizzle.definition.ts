import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DrizzleModuleConfig } from './drizzle.interface';
import { PG_CONNECTION } from './pg-connection';

/**
 * drizzle模块的定义
 * 使用 ConfigurableModuleBuilder 创建可配置的 Drizzle 模块
 * 导出模块相关的配置常量和类型
 */
export const {
  ConfigurableModuleClass, // 用于创建可配置模块的基类，继承此类可实现模块的可配置特性
  MODULE_OPTIONS_TOKEN, // 用于依赖注入的 token，可通过此 token 注入模块配置
  OPTIONS_TYPE, // 定义模块同步配置选项的类型
  ASYNC_OPTIONS_TYPE, // 定义模块异步配置选项的类型（用于异步初始化）
} = new ConfigurableModuleBuilder<DrizzleModuleConfig>() // 创建构建器，指定配置类型为 DrizzleModuleConfig
  .setExtras(
    {
      tag: PG_CONNECTION, // 设置默认的数据库连接标签为 PG_CONNECTION
    },
    // 配置合并函数，用于合并默认配置和用户提供的配置
    (definition, extras) => ({
      ...definition, // 保留原有的模块定义配置
      tag: extras.tag, // 使用用户提供的 tag，如果没有则使用默认值
    }),
  )
  .build(); // 构建并返回最终的模块配置
