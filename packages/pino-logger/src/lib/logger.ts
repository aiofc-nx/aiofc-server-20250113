import { FastifyRequest, FastifyServerOptions } from 'fastify';
import pino, { BaseLogger } from 'pino';
import pretty, { PrettyOptions } from 'pino-pretty';
import { FastifyReply } from 'fastify/types/reply';
import { randomUUID } from 'crypto';
import { IncomingMessage } from 'http';
import { LoggerConfig } from './config';

export class Logger {
  private static _config: LoggerConfig;

  public static setConfig(options: LoggerConfig) {
    this._config = options;
  }

  public static get config(): LoggerConfig {
    if (!this._config) {
      // 提供默认值，避免未初始化时的错误
      return {
        logger: {
          trackingIdHeader: 'x-tracking-id',
        },
      } as LoggerConfig;
    }
    return this._config;
  }

  static getLogger(): BaseLogger {
    return Logger.pinoPrettyLogger(Logger.basePinoPrettyOptions());
  }

  static get defaultFastifyAdapterLogger(): FastifyServerOptions {
    if (!Logger.config) {
      console.warn(
        'LoggerUtils not initialized, using default tracking header',
      );
    }
    return {
      logger: false,
      genReqId: (req) => Logger.generateLoggerIdForHttpContext(req),
    };
  }

  /**
   * 使用 TRACKING_ID_HEADER（如果存在），否则生成随机 UUID。
   */
  static generateLoggerIdForHttpContext(req: IncomingMessage): string {
    const headerName = Logger.config.logger.trackingIdHeader || 'x-tracking-id';
    return (req.headers[headerName] as string) || randomUUID();
  }

  static pinoPrettyLogger(options?: PrettyOptions): BaseLogger {
    const pinoPrettyOptions = {
      ...Logger.basePinoPrettyOptions(),
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
