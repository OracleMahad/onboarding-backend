import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12345678',
    });
  }

  async validate({ id, iat, exp }: { id: number; iat: number; exp: number }) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
      select: {
        id: true,
        email: true,
        username: true,
        password: false,
      },
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
