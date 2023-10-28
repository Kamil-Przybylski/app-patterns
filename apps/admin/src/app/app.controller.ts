import { Controller, Get } from '@nestjs/common';

import { CreateUserEvent } from '@libs/nest/events';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: 'new_test' })
  handleNewTest() {
    return this.appService.getData();
  }

  @EventPattern('test')
  handleTestHere(data: CreateUserEvent) {
    this.appService.handleTestHere(data);
  }
}
