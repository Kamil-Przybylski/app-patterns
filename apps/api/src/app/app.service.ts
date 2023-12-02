import { CreateUserEvent } from '@libs/nest/events';
import { MicroservicesKeyEnum } from '@libs/nest/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject(MicroservicesKeyEnum.ADMIN) private readonly adminClient: ClientProxy) {}

  getData(): boolean {
    return true;
  }

  postData(body: unknown): boolean {
    this.adminClient.emit('test', new CreateUserEvent(body['email']));
    return true;
  }
}
