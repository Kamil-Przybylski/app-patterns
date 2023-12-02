import { Module } from '@nestjs/common';

import { ConfigKeyEnum, ConfigRootModule, ConfigRootService } from '@libs/nest/configuration';
import { configSchema } from './config';
import { DatabaseModule } from '@libs/nest/database';
import { JwtRootModule, JwtStrategy, PassportRootModule } from '@libs/nest/auth';
import { AuthenticationModule } from './authentication/authentication.module';

const configNames = [ConfigKeyEnum.ADMIN, ConfigKeyEnum.DATABASE];

@Module({
  imports: [
    ConfigRootModule.forRoot({ configSchema, configNames }),
    PassportRootModule.forRoot({ strategy: JwtStrategy }),
    JwtRootModule,
    DatabaseModule,

    AuthenticationModule,
  ],
  providers: [ConfigRootService],
  exports: [ConfigRootService],
})
export class AppModule {}
