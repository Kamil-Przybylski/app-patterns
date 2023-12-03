import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiAuthGuard } from '@libs/nest/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(ApiAuthGuard)
  getData() {
    return true;
  }
}
