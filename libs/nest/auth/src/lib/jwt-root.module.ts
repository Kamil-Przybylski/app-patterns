import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigRootService } from '@libs/nest/configuration';

interface IConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

@Global()
@Module({
  imports: [
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
