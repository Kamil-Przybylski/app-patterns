import {
  ConfigurationKey,
  ConfigurationService,
  loadConfiguration,
} from '@libs/nest/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@libs/nest/database';
import { MicroservicesModule } from '@libs/nest/microservices';
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

    DatabaseModule,
    MicroservicesModule.forAsyncRoot({
      name: 'ADMIN',
      configFn: (cs: ConfigurationService<IConfig>) => cs.get('admin').port,
    }),
  ],
  controllers: [AppController],
  providers: [ConfigurationService, AppService],
})
export class AppModule {}
