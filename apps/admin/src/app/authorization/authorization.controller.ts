import { AuthService, GetUser, JwtAuthGuard, RcpExceptionsFilter } from '@libs/nest/auth';
import { IUserDb } from '@libs/nest/database';
import { AuthorizationEventsHandler } from '@libs/nest/events';
import { AuthRoutesEnum, CommonRoutesParamEnum } from '@libs/shared/communication';
import { UserId } from '@libs/shared/models';
import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';

@Controller(AuthRoutesEnum.AUTH)
export class AuthorizationController {
  constructor(private readonly authService: AuthService) {}

  @Get(`${AuthRoutesEnum.LOGOUT}/:${CommonRoutesParamEnum.USER_ID}`)
  logout(@Param(CommonRoutesParamEnum.USER_ID) userId: UserId): Promise<unknown> {
    return this.authService.logout(userId);
  }

  @MessagePattern(AuthorizationEventsHandler.CMD)
  @UseFilters(RcpExceptionsFilter)
  @UseGuards(JwtAuthGuard)
  verifyJwt(@GetUser() user: IUserDb): IUserDb {
    return user;
  }
}
