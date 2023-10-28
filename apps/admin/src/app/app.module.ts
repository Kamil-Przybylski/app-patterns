import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigurationService, configuration } from '@libs/nest/config';
import { IConfig, configSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration(configSchema)],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
  ],
  controllers: [],
  providers: [ConfigurationService<IConfig>],
})
export class AppModule {}
