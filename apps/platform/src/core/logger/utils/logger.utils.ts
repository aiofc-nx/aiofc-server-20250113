import { FastifyRequest, FastifyServerOptions } from 'fastify';
import pino, { BaseLogger } from 'pino';
import pretty, { PrettyOptions } from 'pino-pretty';
import { FastifyReply } from 'fastify/types/reply';
import { randomUUID } from 'crypto';
import { AppConfig } from '../../../config/app-config.service';
import { IncomingMessage } from 'http';

export class LoggerUtils {
  private static _appConfig: AppConfig;

  public static setAppConfig(config: AppConfig) {
    this._appConfig = config;
  }

  public static get appConfig(): AppConfig {
    if (!this._appConfig) {
      // 提供默认值，避免未初始化时的错误
      return {
        logger: {
          trackingIdHeader: 'x-tracking-id',
        },
      } as AppConfig;
    }
    return this._appConfig;
  }

  static getLogger(): BaseLogger {
    return LoggerUtils.pinoPrettyLogger(LoggerUtils.basePinoPrettyOptions());
  }

  static get defaultFastifyAdapterLogger(): FastifyServerOptions {
    if (!LoggerUtils.appConfig) {
      console.warn(
        'LoggerUtils not initialized, using default tracking header',
      );
    }
    return {
      logger: false,
      genReqId: (req) => LoggerUtils.generateLoggerIdForHttpContext(req),
    };
  }

  /**
   * 使用 TRACKING_ID_HEADER（如果存在），否则生成随机 UUID。
   */
  static generateLoggerIdForHttpContext(req: IncomingMessage): string {
    const headerName =
      this.appConfig.logger.trackingIdHeader || 'x-tracking-id';
    return (req.headers[headerName] as string) || randomUUID();
  }

  static pinoPrettyLogger(options?: PrettyOptions): BaseLogger {
    const pinoPrettyOptions = {
      ...LoggerUtils.basePinoPrettyOptions(),
      ...(options ?? {}),
    };
    return pino(pretty(pinoPrettyOptions));
  }

  static microserviceLoggerOptions(): PrettyOptions {
    return {
      sync: true,
      minimumLevel: 'debug',
    } satisfies PrettyOptions;
  }

  static httpLoggerOptions(): PrettyOptions {
    return {
      sync: false,
      minimumLevel: 'debug',
    } satisfies PrettyOptions;
  }

  private static basePinoPrettyOptions(): PrettyOptions {
    return {
      minimumLevel: 'info',
      singleLine: true,
      translateTime: true,
      colorize: true,
      levelFirst: true,
      ignore: 'pid,hostname,req,res,reqId,responseTime',
      messageFormat: `[{tenantId}] [{reqId}] {msg} [{context}]`,
      sync: true,
    };
  }

  static customReceivedMessage(req: FastifyRequest): string {
    const tenantId = (req.headers['x-tenant-id'] as string) || 'default';
    return `[${tenantId}] ->> ${req.method} to '${req.originalUrl}'`;
  }

  static customResponseMessage(
    req: FastifyRequest,
    res: FastifyReply,
    elapsedTime?: number,
    statusCode?: number,
  ): string {
    const tenantId = (req.headers['x-tenant-id'] as string) || 'default';
    return `<<- [${tenantId}] ${req.method} to '${req.originalUrl}' - ${statusCode ?? res.statusCode} after ${Math.ceil(elapsedTime ?? res.elapsedTime)}ms`;
  }
}
