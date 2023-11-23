/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigurationService } from '@libs/nest/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { IConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
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
  await app.listen(httpConfig.port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpConfig.port}/${httpConfig.prefix}`
  );
}

bootstrap();
