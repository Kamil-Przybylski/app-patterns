import { Controller, Get } from '@nestjs/common';

import { CreateUserEvent } from '@libs/nest/events';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }

  @MessagePattern({ cmd: 'new_test' })
  handleNewTest() {
    return this.authService.getData();
  }

  @EventPattern('test')
  handleTestHere(data: CreateUserEvent) {
    this.authService.handleTestHere(data);
  }
}
