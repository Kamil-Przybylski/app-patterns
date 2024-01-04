import { IUserDb } from '@libs/nest/database';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class AuthorizationEventsHandler {
  static readonly CMD = { cmd: 'verify-jwt' };
  constructor(private readonly client: ClientProxy) {}

  validateAndGetUser(headers: { [name: string]: unknown }): Observable<IUserDb> {
    return this.client.send<IUserDb>(AuthorizationEventsHandler.CMD, { headers });
  }
}
