/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigRootService } from '@libs/nest/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { IConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const cs: ConfigRootService<IConfig> = app.get(ConfigRootService);

  const tcpConfig = cs.get('tcp');
  const httpConfig = cs.get('http');

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: tcpConfig.port },
  });
  await app.startAllMicroservices();
  Logger.log(`🚀 Microservice is running on TCP ${tcpConfig.port}`);

  app.setGlobalPrefix(httpConfig.prefix);
  app.enableCors();
  await app.listen(httpConfig.port, '0.0.0.0');
  Logger.log(`🚀 Application is running on: http://localhost:${httpConfig.port}/${httpConfig.prefix}`);
}

bootstrap();
