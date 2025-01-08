import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { buildFastifyAdapter } from './setup';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const fastifyBootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    module,
    buildFastifyAdapter(),
    // 设置为 true 时，日志消息将被暂时存储（缓冲）而不是立即输出。
    {
      bufferLogs: true,
      // TODO: 在express 设置为 false 时，将关闭请求的日志记录。但是，在fastify不起作用，我也不知道为什么
      // logger: false
    },
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
};
