import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthRoutesEnum } from '@libs/shared/communication';
import { AuthenticationService } from './authentication.service';
import { SingInDto, SingUpDto } from './authentication.dto';
import { SignInResponseDto, UserResponseDto } from '../dtos/user.dto';
import { JwtAuthGuard } from '@libs/nest/auth';

@Controller(AuthRoutesEnum.AUTH)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post(AuthRoutesEnum.SING_UP)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singUp(@Body() signUpDto: SingUpDto) {
    const user = await this.authenticationService.signUp(signUpDto);
    return new UserResponseDto(user);
  }

  @Post(AuthRoutesEnum.SING_IN)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singIn(@Body() signInDto: SingInDto) {
    const payload = await this.authenticationService.signIn(signInDto);
    return new SignInResponseDto(payload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  test() {
    return true;
  }
}
