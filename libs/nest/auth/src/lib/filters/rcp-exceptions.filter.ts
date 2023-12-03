import { Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { of } from 'rxjs';

@Catch()
export class RcpExceptionsFilter extends BaseRpcExceptionFilter {
  override catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof UnauthorizedException) {
      return of(false);
    }
    return super.catch(exception, host);
  }
}
