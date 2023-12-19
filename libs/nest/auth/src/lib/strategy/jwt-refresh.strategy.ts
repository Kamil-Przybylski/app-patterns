import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from '../models/auth.models';
import { IUser, UsersService } from '@libs/nest/database';
import { StrategyKeyEnum } from '../models/strategy.models';
import { ConfigRootService } from '@libs/nest/config';
import { IConfig } from '../config/config.model';
import { UserId } from '@libs/shared/models';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, StrategyKeyEnum.JWT_REFRESH) {
  constructor(private readonly usersService: UsersService, cs: ConfigRootService<IConfig>) {
    const config = cs.get('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const user = await this.usersService.findOne({ id: payload.sub as UserId });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
