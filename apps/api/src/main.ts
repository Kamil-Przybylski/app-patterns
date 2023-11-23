/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ConfigurationService } from '@libs/nest/configuration';
import { AppModule } from './app/app.module';
import { IConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService: ConfigurationService<IConfig> =
    app.get(ConfigurationService);

  const httpConfig = configService.get('http');

  app.setGlobalPrefix(httpConfig.prefix);
  await app.listen(httpConfig.port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpConfig.port}/${httpConfig.prefix}`
  );
}

bootstrap();
