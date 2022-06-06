import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

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
  controllers: [BlogController],
  providers: [BlogService, JwtStrategy, PrismaService],
  exports: [JwtModule, BlogService],
})
export class BlogModule {}
