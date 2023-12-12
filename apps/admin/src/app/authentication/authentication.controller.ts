import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthRoutesEnum, IRefreshTokenResponseDto } from '@libs/shared/communication';
import {
  AuthService,
  GetUser,
  JwtRefreshGuard,
  SignInResponseDto,
  UserResponseDto,
} from '@libs/nest/auth';
import { SingInDto, SingUpDto } from './authentication.dto';
import { IUser } from '@libs/nest/database';

@Controller(AuthRoutesEnum.AUTH)
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoutesEnum.SING_UP)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singUp(@Body() signUpDto: SingUpDto): Promise<UserResponseDto> {
    const user = await this.authService.signUp(signUpDto);
    return new UserResponseDto(user);
  }

  @Post(AuthRoutesEnum.SING_IN)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singIn(@Body() signInDto: SingInDto): Promise<SignInResponseDto> {
    const payload = await this.authService.signIn(signInDto);
    return new SignInResponseDto(payload);
  }

  @Post(AuthRoutesEnum.REFRESH_TOKEN)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getRefreshToken(
    @GetUser() user: IUser,
    @Body('refreshToken') refreshToken: string,
  ): Promise<IRefreshTokenResponseDto> {
    if (!refreshToken) throw new UnauthorizedException();
    const payload = await this.authService.getRefreshToken(user, refreshToken);
    await new Promise((r) => setTimeout(r, 1000)); // TEMP
    return payload;
  }
}
