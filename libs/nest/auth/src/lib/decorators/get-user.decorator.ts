import { IUserDb } from '@libs/nest/database';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): IUserDb => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
