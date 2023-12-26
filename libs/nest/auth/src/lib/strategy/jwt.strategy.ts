import { ConfigRootService } from '@libs/nest/config';
import { IUserDb, UsersService } from '@libs/nest/database';
import { ITokenPayloadDto } from '@libs/shared/tokens';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfig } from '../config/config.model';
import { StrategyKeyEnum } from '../models/strategy.models';

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

  async validate(payload: ITokenPayloadDto): Promise<IUserDb> {
    const user = await this.usersService.findOne({ id: payload.sub });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
