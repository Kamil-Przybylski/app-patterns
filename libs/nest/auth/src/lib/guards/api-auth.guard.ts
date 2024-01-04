import { AuthorizationEventsHandler } from '@libs/nest/events';
import { MicroservicesKeyEnum } from '@libs/nest/microservices';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor(@Inject(MicroservicesKeyEnum.ADMIN) private readonly adminClient: ClientProxy) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const clientHandler = new AuthorizationEventsHandler(this.adminClient);
    return clientHandler.validateAndGetUser(request.headers).pipe(
      map((user) => {
        if (!user) throw new UnauthorizedException();
        request.user = user;
        return true;
      }),
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
  }
}
