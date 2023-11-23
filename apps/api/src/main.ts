/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigurationService } from '@libs/nest/configuration';
import { AppModule } from './app/app.module';
import { IConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigurationService<IConfig> =
    app.get(ConfigurationService);

  const httpConfig = configService.get('http');

  app.setGlobalPrefix(httpConfig.prefix);
  await app.listen(httpConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpConfig.port}/${httpConfig.prefix}`
  );
}

bootstrap();
