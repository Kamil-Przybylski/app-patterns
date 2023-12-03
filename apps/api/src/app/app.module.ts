import { ConfigRootModule, ConfigKeyEnum, ConfigRootService } from '@libs/nest/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@libs/nest/database';
import { MicroservicesKeyEnum, MicroservicesModule } from '@libs/nest/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IConfig, configSchema } from './config';

const configNames = [ConfigKeyEnum.API, ConfigKeyEnum.DATABASE];

@Module({
  imports: [
    ConfigRootModule.forRoot({ configSchema, configNames }),
    MicroservicesModule.forRoot({
      name: MicroservicesKeyEnum.ADMIN,
      useFactory: (cs: ConfigRootService<IConfig>) => cs.get('admin').port,
    }),

    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [ConfigRootService, AppService],
})
export class AppModule {}
