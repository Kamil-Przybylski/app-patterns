import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  AuthService,
  GetUser,
  JwtRefreshGuard,
  RefreshTokenReqDto,
  SignInReqDto,
  SignInResDto,
  SingUpDto,
  UserResDto,
} from '@libs/nest/auth';
import { IUserDb } from '@libs/nest/database';
import { AuthRoutesEnum, IRefreshTokenResDto } from '@libs/shared/communication';

@Controller(AuthRoutesEnum.AUTH)
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoutesEnum.SING_UP)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singUp(@Body() signUpDto: SingUpDto): Promise<UserResDto> {
    const user = await this.authService.signUp(signUpDto);
    return new UserResDto(user);
  }

  @Post(AuthRoutesEnum.SING_IN)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singIn(@Body() signInDto: SignInReqDto): Promise<SignInResDto> {
    const payload = await this.authService.signIn(signInDto);
    return new SignInResDto(payload);
  }

  @Post(AuthRoutesEnum.REFRESH_TOKEN)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getRefreshToken(
    @GetUser() user: IUserDb,
    @Body() refreshTokenDto: RefreshTokenReqDto,
  ): Promise<IRefreshTokenResDto> {
    if (!refreshTokenDto) throw new UnauthorizedException();
    const payload = await this.authService.getRefreshToken(user, refreshTokenDto.refreshToken);
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // TEMP: for test purposes
    return payload;
  }
}
