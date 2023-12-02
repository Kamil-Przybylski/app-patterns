import { IUser } from '@libs/nest/database';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): IUser => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
