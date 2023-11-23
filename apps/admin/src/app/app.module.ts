import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  ConfigurationKey,
  ConfigurationService,
  loadConfiguration,
} from '@libs/nest/configuration';
import { IConfig, configSchema } from './config';

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
  controllers: [],
  providers: [ConfigurationService<IConfig>],
})
export class AppModule {}
