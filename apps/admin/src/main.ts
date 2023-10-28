/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigurationService } from '@libs/nest/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { IConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigurationService<IConfig> =
    app.get(ConfigurationService);

  const tcpConfig = configService.get('tcp');
  const httpConfig = configService.get('http');

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: tcpConfig.port },
  });
  await app.startAllMicroservices();
  Logger.log(`🚀 Microservice is running on TCP ${tcpConfig.port}`);

  app.setGlobalPrefix(httpConfig.prefix);
  await app.listen(httpConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpConfig.port}/${httpConfig.prefix}`
  );
}

bootstrap();

type X = keyof IConfig;
const a: IConfig[X] = null as any;
