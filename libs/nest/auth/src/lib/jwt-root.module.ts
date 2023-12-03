import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigKeyEnum, ConfigRootModule, ConfigRootService } from '@libs/nest/config';
import { IConfig, configSchema } from './config';

@Global()
@Module({
  imports: [
    ConfigRootModule.forFeature({ configSchema, configName: ConfigKeyEnum.JWT }),
    JwtModule.registerAsync({
      useFactory: (cs: ConfigRootService<IConfig>) => {
        const { secret, expiresIn } = cs.get('jwt');
        return {
          secret: secret,
          signOptions: { expiresIn: expiresIn },
        };
      },
      inject: [ConfigRootService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtRootModule {}
