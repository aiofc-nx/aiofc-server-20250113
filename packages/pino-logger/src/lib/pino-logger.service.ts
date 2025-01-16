import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Logger, LoggerOptions, pino } from 'pino';
import { PrettyOptions } from 'pino-pretty';
import { PINO_LOGGER_OPTIONS_PROVIDER } from './constant.ts.js';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private static instance: PinoLoggerService;
  private readonly pinoLogger: Logger;

  constructor(
    @Inject(PINO_LOGGER_OPTIONS_PROVIDER) private options: PrettyOptions,
    private readonly cls: ClsService,
  ) {
    if (!PinoLoggerService.instance) {
      const pinoOptions: LoggerOptions = {
        level: process.env['LOG_LEVEL'] || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ...options,
          },
        },
      };

      this.pinoLogger = pino(pinoOptions);
      PinoLoggerService.instance = this;
    } else {
      this.pinoLogger = PinoLoggerService.instance.pinoLogger;
    }
  }

  // 替代 getInstance 的静态方法
  public static getDefaultLogger(): Logger {
    if (!PinoLoggerService.instance) {
      const defaultLogger = pino({
        level: process.env['LOG_LEVEL'] || 'info',
        transport: {
          target: 'pino-pretty',
          options: { colorize: true },
        },
      });
      return defaultLogger;
    }
    return PinoLoggerService.instance.pinoLogger;
  }

  public static log(message: any, context?: any) {
    this.getDefaultLogger().info(context || {}, message);
  }

  public static info(message: any, context?: any) {
    this.getDefaultLogger().info(context || {}, message);
  }

  public static error(message: any, context?: any) {
    this.getDefaultLogger().error(context || {}, message);
  }

  // 获取原始的 pino logger 实例
  public getPinoLogger(): Logger {
    return this.pinoLogger;
  }

  // 实现 NestJS LoggerService 接口的方法
  log(message: any, ...optionalParams: any[]) {
    return this.info(message, ...optionalParams); // 映射到 Pino 的 info
  }

  error(message: any, ...optionalParams: any[]) {
    const context = this.getContext();
    this.pinoLogger.error({ ...context }, message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    const context = this.getContext();
    this.pinoLogger.warn({ ...context }, message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    const context = this.getContext();
    this.pinoLogger.debug({ ...context }, message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    return this.trace(message, ...optionalParams); // 映射到 Pino 的 trace
  }

  // Pino 原生方法
  fatal(message: any, ...optionalParams: any[]) {
    const context = this.getContext();
    this.pinoLogger.fatal({ ...context }, message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    const context = this.getContext();
    this.pinoLogger.info({ ...context }, message, ...optionalParams);
  }

  trace(message: any, ...optionalParams: any[]) {
    const context = this.getContext();
    this.pinoLogger.trace({ ...context }, message, ...optionalParams);
  }

  // 获取请求上下文信息
  private getContext() {
    try {
      return this.cls.get();
    } catch {
      return {};
    }
  }
}
