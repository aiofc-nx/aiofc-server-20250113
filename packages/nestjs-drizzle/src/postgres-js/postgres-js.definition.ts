import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DrizzlePostgresConfig } from './postgres-js.interface';

/**
 * 动态模块配置构建器
 *
 * 机制:
 * 1. 使用 ConfigurableModuleBuilder 创建可配置的动态模块
 * 2. 通过泛型 DrizzlePostgresConfig 定义模块配置接口
 * 3. setExtras 方法添加额外配置选项
 *
 * 要点:
 * - ConfigurableModuleClass: 生成的可配置模块类
 * - MODULE_OPTIONS_TOKEN: 用于注入配置的 token
 * - OPTIONS_TYPE: 同步配置类型
 * - ASYNC_OPTIONS_TYPE: 异步配置类型
 * - tag 属性默认值为 'default'
 * - 通过回调函数合并默认配置和传入配置
 */
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<DrizzlePostgresConfig>()
  .setExtras(
    {
      tag: 'default',
    },
    (definition, extras) => ({
      ...definition,
      tag: extras.tag,
    }),
  )
  .build();
