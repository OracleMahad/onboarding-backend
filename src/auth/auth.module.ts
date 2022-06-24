import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { PrismaService } from 'src/common/prisma.service';
import { EmailModule } from '../mail/email.module';
import { RedisService } from 'src/common/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EmailModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: '12345678',
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    RedisService,
    ConfigService,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
