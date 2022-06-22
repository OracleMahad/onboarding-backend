import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [AuthModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
