import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
@Module({
  imports: [AuthModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
