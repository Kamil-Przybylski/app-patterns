import {
  ConfigurationKey,
  ConfigurationService,
  loadConfiguration,
} from '@libs/nest/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@libs/nest/database';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IConfig, configSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        loadConfiguration(configSchema, [
          ConfigurationKey.API,
          ConfigurationKey.DATABASE,
        ]),
      ],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    ClientsModule.register([
      { name: 'ADMIN', transport: Transport.TCP, options: { port: 3901 } },
    ]),

    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [ConfigurationService<IConfig>, AppService],
})
export class AppModule {}
