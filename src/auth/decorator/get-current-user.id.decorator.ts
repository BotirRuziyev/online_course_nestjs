import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { jwtPayload } from '../types';

export const GetCurrentUserId = createParamDecorator((_: undefined, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as jwtPayload;
  return user.sub;
});
