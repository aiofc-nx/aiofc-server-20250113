import { FastifyRequest, FastifyServerOptions } from 'fastify';
import { BaseLogger } from 'pino';
import { PrettyOptions } from 'pino-pretty';
import { FastifyReply } from 'fastify/types/reply';
import { IncomingMessage } from 'http';
import { LoggerConfig } from './config';
export declare class Logger {
    private static _config;
    static setConfig(options: LoggerConfig): void;
    static get config(): LoggerConfig;
    static getLogger(): BaseLogger;
    static get defaultFastifyAdapterLogger(): FastifyServerOptions;
    /**
     * 使用 TRACKING_ID_HEADER（如果存在），否则生成随机 UUID。
     */
    static generateLoggerIdForHttpContext(req: IncomingMessage): string;
    static pinoPrettyLogger(options?: PrettyOptions): BaseLogger;
    static microserviceLoggerOptions(): PrettyOptions;
    static httpLoggerOptions(): PrettyOptions;
    private static basePinoPrettyOptions;
    static customReceivedMessage(req: FastifyRequest): string;
    static customResponseMessage(req: FastifyRequest, res: FastifyReply, elapsedTime?: number, statusCode?: number): string;
}
