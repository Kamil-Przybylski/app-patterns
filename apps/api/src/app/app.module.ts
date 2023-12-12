import { ConfigRootModule, ConfigRootService } from '@libs/nest/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@libs/nest/database';
import { MicroservicesKeyEnum, MicroservicesModule } from '@libs/nest/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IConfig, configSchema } from './config';

@Module({
  imports: [
    ConfigRootModule.forRoot({ configSchema, configName: 'API' }),
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
