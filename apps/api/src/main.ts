/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { ConfigRootService } from '@libs/nest/config';
import { AppModule } from './app/app.module';
import { IConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const cs: ConfigRootService<IConfig> = app.get(ConfigRootService);

  const httpConfig = cs.get('http');

  app.setGlobalPrefix(httpConfig.prefix);
  if (httpConfig.cors) app.enableCors();
  await app.listen(httpConfig.port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpConfig.port}/${httpConfig.prefix}`,
  );
}

bootstrap();
