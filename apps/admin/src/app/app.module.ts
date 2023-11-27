import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  ConfigurationKey,
  ConfigurationService,
  loadConfiguration,
} from '@libs/nest/configuration';
import { configSchema } from './config';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from '@libs/nest/database';

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
    DatabaseModule,

    AuthenticationModule,
  ],
  providers: [ConfigurationService],
})
export class AppModule {}
