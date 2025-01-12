import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ApiModule } from './api.module';
import { LoggerUtils } from '../core/logger/utils/logger.utils';
import { PinoLoggerService } from '../core/logger/core/pino-logger.service';
import { LoggerInterceptor } from '../core/logger/core/logger.interceptor';
import { ClsService } from 'nestjs-cls';
import { AppConfig } from '../config/app-config.service';

/**
 * 应用程序引导函数
 *
 * 主要机制:
 * 1. 使用 Fastify 作为底层 HTTP 框架
 * - Fastify 比 Express 性能更好,适合高性能场景
 * - 通过 FastifyAdapter 适配 NestJS
 *
 * 2. 日志系统配置
 * - 使用自定义日志服务 CustomLoggingService
 * - 通过拦截器 CustomLoggingInterceptor 实现请求日志
 * - 结合 ClsService 实现请求上下文追踪
 *
 * 3. 安全与路由配置
 * - enableCors() 启用跨域资源共享
 * - setGlobalPrefix 设置全局路由前缀
 *
 * 要点:
 * - 异步启动确保所有依赖加载完成
 * - 使用依赖注入获取配置和服务
 * - 统一的错误处理和日志记录
 */
async function bootstrap() {
  // 创建 Fastify 适配器，使用默认的 Fastify 日志
  const adapter = new FastifyAdapter(LoggerUtils.defaultFastifyAdapterLogger);
  // 创建 NestJS 应用，使用 Fastify 适配器
  const app = await NestFactory.create(ApiModule, adapter);
  // 使用自定义日志服务
  app.useLogger(app.get(PinoLoggerService));
  // 使用自定义日志拦截器，实现请求日志
  app.useGlobalInterceptors(...[new LoggerInterceptor(app.get(ClsService))]);
  // 启用跨域资源共享
  app.enableCors();
  // 设置全局路由前缀
  const appConfig = app.get<AppConfig>(AppConfig);
  app.setGlobalPrefix(appConfig.api.globalPrefix);
  // 启动 HTTP 服务器
  await app.listen(appConfig.api.port);
}

void bootstrap();
