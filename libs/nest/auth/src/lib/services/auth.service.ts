import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, UsersService } from '@libs/nest/database';
import {
  IRefreshTokenResponseDto,
  ISignInDto,
  ISignInResponseDto,
  ISignUpDto,
} from '@libs/shared/communication';
import { TokenService } from './token.service';
import { UserId } from '@libs/shared/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public signUp(signUpDto: ISignUpDto): Promise<IUser> {
    return this.usersService.signUp(signUpDto);
  }

  public async signIn(signInDto: ISignInDto): Promise<ISignInResponseDto> {
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
    currentUser: IUser,
    refreshToken: string,
  ): Promise<IRefreshTokenResponseDto> {
    const user = await this.usersService.findOne({ id: currentUser.id });
    if (!user) throw new UnauthorizedException();
    await this.tokenService.validToken(refreshToken, user?.hashedRefreshToken);

    const token = await this.tokenService.getTokenPayload(user.id, 'access');
    return {
      accessToken: token,
    };
  }
}
