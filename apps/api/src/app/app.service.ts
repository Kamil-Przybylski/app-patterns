import { MicroservicesKeyEnum } from '@libs/nest/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject(MicroservicesKeyEnum.ADMIN) private readonly adminClient: ClientProxy) {}

  getData(): Observable<unknown> {
    return of(true);
  }
}
