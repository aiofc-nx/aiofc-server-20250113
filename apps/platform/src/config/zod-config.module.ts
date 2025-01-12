import { Global, Module } from '@nestjs/common';
import { AppConfig } from './app-config.service';
import configOptions from './configuration';

/**
 * ZodConfigModule
 *
 * 职责：
 * 1. 提供全局配置服务
 * 2. 管理配置的加载和注入
 * 3. 确保配置的单例性
 */
@Global()
@Module({
  providers: [
    {
      provide: 'APP_CONFIG_OPTIONS', // 配置提供者标记
      useFactory: () => configOptions(), // 工厂函数：执行配置加载
      /**
       * 工作流程：
       * 1. NestJS 启动时执行 configOptions()
       * 2. 加载并验证 YAML 配置文件
       * 3. 将结果注入到需要的地方
       */
    },
    AppConfig, // AppConfig 类本身也作为 provider
  ],
  exports: [AppConfig, 'APP_CONFIG_OPTIONS'], // 导出 AppConfig 供其他模块使用
})
export class ZodConfigModule {}
