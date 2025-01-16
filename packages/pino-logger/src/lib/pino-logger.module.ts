import { Module } from '@nestjs/common';
import { PinoLoggerService } from './pino-logger.service';
import { ClsModule } from 'nestjs-cls';
import { PINO_LOGGER_OPTIONS_PROVIDER } from './constant.ts';

@Module({
  imports: [ClsModule],
  providers: [
    {
      provide: PINO_LOGGER_OPTIONS_PROVIDER,
      useValue: {
        colorize: true,
        levelFirst: true,
      },
    },
    PinoLoggerService,
  ],
  exports: [PinoLoggerService],
})
export class PinoLoggerModule {}
