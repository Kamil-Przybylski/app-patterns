import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  ConfigurationKey,
  ConfigurationService,
  loadConfiguration,
} from '@libs/nest/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        loadConfiguration(configSchema, [
          ConfigurationKey.ADMIN,
          ConfigurationKey.DATABASE,
        ]),
      ],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {}
