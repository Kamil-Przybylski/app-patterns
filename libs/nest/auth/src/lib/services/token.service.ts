import { ConfigRootService } from '@libs/nest/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IConfig } from '../config';
import * as bcrypt from 'bcrypt';

type TokenType = 'access' | 'refresh';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cs: ConfigRootService<IConfig>,
  ) {}

  async getTokenPayload(id: number, type: TokenType): Promise<string> {
    const jwtConfig = this.cs.get('jwt');

    const tokenPayload = { sub: id };
    return await this.jwtService.signAsync(tokenPayload, {
      expiresIn: type === 'refresh' ? jwtConfig.refreshExpiresIn : jwtConfig.accessExpiresIn,
    });
  }

  async hashToken(token: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(token, salt);
  }

  async validToken(token: string, hashedRefreshToken: string | null): Promise<void> {
    if (!hashedRefreshToken) throw new UnauthorizedException();
    const isValid = await bcrypt.compare(token, hashedRefreshToken);
    if (!isValid) throw new UnauthorizedException();
  }
}
