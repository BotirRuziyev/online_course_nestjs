import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth-dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(private _prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signUp(data: AuthDto) {
    const hash = await argon.hash(data.password);

    const user = await this._prisma.user.create({
      data: {
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        hash,
      },
    });

    const tokens = await this.tokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(data: AuthDto) {
    const user = await this._prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials tokens');

    const pwMatches = await argon.verify(user.hash, data.password);

    if (!pwMatches) throw new ForbiddenException('Credentials tokens');

    const tokens = await this.tokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }
  async logout(userId: number) {
    await this._prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });

    return true;
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this._prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashRt) throw new ForbiddenException('Access deniem');

    const rtMatches = await argon.verify(user.hashRt, refreshToken);

    if (!rtMatches) throw new ForbiddenException('Access deniem');

    const tokens = await this.tokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async tokens(userId: number, email: string): Promise<Tokens> {
    const payload = {
      sub: userId,
      email,
    };
    const at_secret = await this.config.get('AT_SECRET');
    const rt_secret = await this.config.get('RT_SECRET');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '60m',
        secret: at_secret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '60m',
        secret: rt_secret,
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await argon.hash(rt);

    await this._prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
