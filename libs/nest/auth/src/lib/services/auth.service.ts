import { IUserDb, UsersService } from '@libs/nest/database';
import {
  IRefreshTokenResDto,
  ISignInReqDto,
  ISignInResDto,
  ISignUpReqDto,
} from '@libs/shared/communication';
import { JwtToken, UserId } from '@libs/shared/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public signUp(signUpDto: ISignUpReqDto): Promise<IUserDb> {
    return this.usersService.signUp(signUpDto);
  }

  public async signIn(signInDto: ISignInReqDto): Promise<ISignInResDto> {
    const user = await this.usersService.signIn(signInDto);

    const accessToken = await this.tokenService.getTokenPayload(user.id, 'access');
    const refreshToken = await this.tokenService.getTokenPayload(user.id, 'refresh');

    const hashedRefreshToken = await this.tokenService.hashToken(refreshToken);
    await this.usersService.updateOne(user.id, { hashedRefreshToken });

    return { accessToken, refreshToken, user };
  }

  public async logout(userId: UserId): Promise<unknown> {
    await this.usersService.updateOne(userId, { hashedRefreshToken: null });
    return null;
  }

  public async getRefreshToken(
    currentUser: IUserDb,
    refreshToken: JwtToken,
  ): Promise<IRefreshTokenResDto> {
    const user = await this.usersService.findOne({ id: currentUser.id });
    if (!user) throw new UnauthorizedException();
    await this.tokenService.validToken(refreshToken, user?.hashedRefreshToken);

    const token = await this.tokenService.getTokenPayload(user.id, 'access');
    return {
      accessToken: token,
    };
  }
}
