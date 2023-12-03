import { JwtAuthGuard, RcpExceptionsFilter } from '@libs/nest/auth';
import { Controller, UseFilters, UseGuards } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthorizationController {
  @MessagePattern({ cmd: 'verify-jwt' })
  @UseFilters(RcpExceptionsFilter)
  @UseGuards(JwtAuthGuard)
  verifyJwt(): boolean {
    return true;
  }
}
