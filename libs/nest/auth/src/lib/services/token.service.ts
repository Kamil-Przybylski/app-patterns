import { ConfigRootService } from '@libs/nest/config';
import { JwtToken, UserId } from '@libs/shared/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IConfig } from '../config';

type TokenType = 'access' | 'refresh';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cs: ConfigRootService<IConfig>,
  ) {}

  async getTokenPayload(id: UserId, type: TokenType): Promise<JwtToken> {
    const jwtConfig = this.cs.get('jwt');

    const tokenPayload = { sub: id };
    return (await this.jwtService.signAsync(tokenPayload, {
      expiresIn: type === 'refresh' ? jwtConfig.refreshExpiresIn : jwtConfig.accessExpiresIn,
    })) as JwtToken;
  }

  async hashToken(token: JwtToken): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(token, salt);
  }

  async validToken(token: JwtToken, hashedRefreshToken: string | null): Promise<void> {
    if (!hashedRefreshToken) throw new UnauthorizedException();
    const isValid = await bcrypt.compare(token, hashedRefreshToken);
    if (!isValid) throw new UnauthorizedException();
  }
}
