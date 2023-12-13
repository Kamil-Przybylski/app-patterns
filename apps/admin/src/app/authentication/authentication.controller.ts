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
import { RefreshTokenRequestDto, SignInDto, SingUpDto } from './authentication.dto';
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
  public async singIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    const payload = await this.authService.signIn(signInDto);
    return new SignInResponseDto(payload);
  }

  @Post(AuthRoutesEnum.REFRESH_TOKEN)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getRefreshToken(
    @GetUser() user: IUser,
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<IRefreshTokenResponseDto> {
    if (!refreshTokenDto) throw new UnauthorizedException();
    const payload = await this.authService.getRefreshToken(user, refreshTokenDto.refreshToken);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return payload;
  }
}
