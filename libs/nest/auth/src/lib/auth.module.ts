import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportRootModule } from './passport-root.module';
import { JwtRootModule } from './jwt-root.module';
import { JwtRefreshStrategy, JwtStrategy } from './strategy';

@Global()
@Module({
  imports: [
    PassportRootModule.forRoot({ strategies: [JwtStrategy, JwtRefreshStrategy] }),
    JwtRootModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
