import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigKeyEnum, ConfigRootModule, ConfigRootService } from '@libs/nest/config';
import { IConfig, configSchema } from './config';
import { TokenService } from './services/token.service';

@Global()
@Module({
  imports: [
    ConfigRootModule.forFeature({ configSchema, configName: ConfigKeyEnum.JWT }),
    JwtModule.registerAsync({
      useFactory: (cs: ConfigRootService<IConfig>) => {
        const { secret, accessExpiresIn } = cs.get('jwt');
        return {
          secret: secret,
          signOptions: { expiresIn: accessExpiresIn },
        };
      },
      inject: [ConfigRootService],
    }),
  ],
  providers: [TokenService],
  exports: [JwtModule, TokenService],
})
export class JwtRootModule {}
