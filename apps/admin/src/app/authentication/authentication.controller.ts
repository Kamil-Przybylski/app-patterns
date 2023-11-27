import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

import { AuthRoutesEnum } from '@libs/shared/communication';
import { AuthenticationService } from './authentication.service';
import { SingUpDto } from './authentication.dto';
import { UserResponseDto } from '../dtos/user.dto';

@Controller(AuthRoutesEnum.AUTH)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post(AuthRoutesEnum.SING_UP)
  @UseInterceptors(ClassSerializerInterceptor)
  public async singUp(@Body() signUpDto: SingUpDto) {
    const user = await this.authenticationService.signUp(signUpDto);
    return new UserResponseDto(user);
  }
}
