import { Module } from '@nestjs/common';

import { ConfigKeyEnum, ConfigRootModule, ConfigRootService } from '@libs/nest/config';
import { configSchema } from './config';
import { DatabaseModule } from '@libs/nest/database';
import { AuthModule } from '@libs/nest/auth';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigRootModule.forRoot({ configSchema, configName: ConfigKeyEnum.ADMIN }),
    DatabaseModule,
    AuthModule,

    AuthenticationModule,
    AuthorizationModule,
  ],
  providers: [ConfigRootService],
  exports: [ConfigRootService],
})
export class AppModule {}
