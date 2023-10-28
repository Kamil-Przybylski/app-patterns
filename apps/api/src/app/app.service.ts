import { CreateUserEvent } from '@libs/nest/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('ADMIN') private readonly adminClient: ClientProxy) {}

  getData(): Observable<any> {
    return this.adminClient.send({ cmd: 'new_test' }, {});
  }

  postData(body: any): Observable<any> {
    console.log(555.1);
    this.adminClient.emit('test', new CreateUserEvent(body.email));
    return this.adminClient.send({ cmd: 'new_test' }, {});
  }
}
