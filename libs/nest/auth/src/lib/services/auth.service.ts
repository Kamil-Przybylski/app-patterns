import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, UsersService } from '@libs/nest/database';
import {
  IRefreshTokenResponseDto,
  ISignInDto,
  ISignInResponseDto,
  ISignUpDto,
} from '@libs/shared/communication';
import { TokenService } from './token.service';
import { UserResponseDto } from '../models';

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
    const dto = new UserResponseDto(user);

    const refreshToken = await this.tokenService.getTokenPayload(dto.execute(), 'refresh');
    const hashedRefreshToken = await this.tokenService.hashToken(refreshToken);
    await this.usersService.updateOne(user.id, { hashedRefreshToken });

    return {
      accessToken: await this.tokenService.getTokenPayload(dto.execute(), 'access'),
      refreshToken,
    };
  }

  public async getRefreshToken(
    currentUser: IUser,
    refreshToken: string,
  ): Promise<IRefreshTokenResponseDto> {
    const user = await this.usersService.findOne({ id: currentUser.id });
    if (!user) throw new UnauthorizedException();
    await this.tokenService.validToken(refreshToken, user?.hashedRefreshToken);

    const dto = new UserResponseDto(user);
    const token = await this.tokenService.getTokenPayload(dto.execute(), 'access');
    return {
      accessToken: token,
    };
  }
}
