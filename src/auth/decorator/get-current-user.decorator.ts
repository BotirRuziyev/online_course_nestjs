import { SetMetadata } from '@nestjs/common';

export const GetCurrentUser = (...args: string[]) => SetMetadata('get-current-user', args);
