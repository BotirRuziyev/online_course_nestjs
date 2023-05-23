import { jwtPayload } from './jwtPayload';

export type JwtPayloadWithRt = jwtPayload & { refreshToken: string };
