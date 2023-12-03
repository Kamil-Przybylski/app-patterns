import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from '../models/auth.models';
import { IUser, UsersService } from '@libs/nest/database';
import { StrategyKeyEnum } from '../models/strategy.models';
import { IConfig } from '../models/config';
import { ConfigRootService } from '@libs/nest/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyKeyEnum.JWT) {
  constructor(private readonly usersService: UsersService, cs: ConfigRootService<IConfig>) {
    const config = cs.get('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const user = await this.usersService.findOne({ id: payload.sub });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}