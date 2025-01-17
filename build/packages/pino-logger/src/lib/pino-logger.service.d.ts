import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Logger } from 'pino';
import { PrettyOptions } from 'pino-pretty';
export declare class PinoLoggerService implements LoggerService {
    private options;
    private readonly cls;
    private static instance;
    private readonly pinoLogger;
    constructor(options: PrettyOptions, cls: ClsService);
    static getDefaultLogger(): Logger;
    static log(message: any, context?: any): void;
    static info(message: any, context?: any): void;
    static error(message: any, context?: any): void;
    getPinoLogger(): Logger;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug(message: any, ...optionalParams: any[]): void;
    verbose(message: any, ...optionalParams: any[]): void;
    fatal(message: any, ...optionalParams: any[]): void;
    info(message: any, ...optionalParams: any[]): void;
    trace(message: any, ...optionalParams: any[]): void;
    private getContext;
}
