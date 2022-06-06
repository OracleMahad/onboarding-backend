import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  imports: [
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
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
