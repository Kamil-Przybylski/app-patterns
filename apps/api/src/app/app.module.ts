import { ConfigRootModule, ConfigRootService } from '@libs/nest/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@libs/nest/database';
import { MicroservicesKeyEnum, MicroservicesModule } from '@libs/nest/microservices';
import { IConfig, configSchema } from './config';
import { WorkspaceModule } from './modules/workspaces/workspaces.module';

@Module({
  imports: [
    ConfigRootModule.forRoot({ configSchema, configName: 'API' }),
    MicroservicesModule.forRoot({
      name: MicroservicesKeyEnum.ADMIN,
      useFactory: (cs: ConfigRootService<IConfig>) => cs.get('admin').port,
    }),

    DatabaseModule,
    WorkspaceModule,
  ],
  providers: [ConfigRootService],
})
export class AppModule {}
