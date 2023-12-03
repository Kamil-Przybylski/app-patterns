import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthRoutesEnum } from '@libs/shared/communication';
import { GetUser, JwtRefreshGuard } from '@libs/nest/auth';
import { AuthenticationService } from './authentication.service';
import { SingInDto, SingUpDto } from './authentication.dto';
import { SignInResponseDto, UserResponseDto } from '../dtos/user.dto';
import { IUser } from '@libs/nest/database';

@Controller(AuthRoutesEnum.AUTH)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post(AuthRoutesEnum.SING_UP)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singUp(@Body() signUpDto: SingUpDto): Promise<UserResponseDto> {
    const user = await this.authenticationService.signUp(signUpDto);
    return new UserResponseDto(user);
  }

  @Post(AuthRoutesEnum.SING_IN)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singIn(@Body() signInDto: SingInDto): Promise<SignInResponseDto> {
    const payload = await this.authenticationService.signIn(signInDto);
    return new SignInResponseDto(payload);
  }

  @Post(AuthRoutesEnum.REFRESH_TOKEN)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async refreshToken(@GetUser() user: IUser): Promise<SignInResponseDto> {
    const payload = await this.authenticationService.refresh(user);
    return new SignInResponseDto(payload);
  }
}
