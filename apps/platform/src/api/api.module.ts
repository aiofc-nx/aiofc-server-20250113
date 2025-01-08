import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfig } from './config/api.config';
import { CustomLoggingModule } from '../core/logging/custom-logging/custom-logging.module';
import { LoggerUtils } from '../core/logging/utils/logger.utils';
import { JobsModule } from './modules/jobs/jobs.module';

/**
 * API 模块配置
 *
 * 主要机制:
 * 1. 依赖注入配置
 * - 通过 providers 注册 ApiConfig 服务
 * - 使用 imports 导入所需模块
 *
 * 2. 日志系统集成
 * - CustomLoggingModule 提供日志功能
 * - 使用 LoggerUtils 配置 HTTP 日志选项
 *
 * 3. 配置管理
 * - ConfigModule 处理环境配置
 * - 使用 ApiConfig.validateConfiguration 验证配置有效性
 *
 * 要点:
 * - 模块化设计,便于维护和扩展
 * - 统一的配置验证机制
 * - 集中管理日志配置
 */
@Module({
  providers: [ApiConfig],
  imports: [
    // 导入自定义日志模块
    CustomLoggingModule.forRoot(LoggerUtils.httpLoggingOptions()),
    // 导入配置模块
    ConfigModule.forRoot({
      validate: ApiConfig.validateConfiguration,
    }),
    // 导入 Jobs 模块
    JobsModule,
  ],
})
export class ApiModule {}
