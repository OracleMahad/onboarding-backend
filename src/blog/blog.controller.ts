import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { BlogService } from './blog.service';
import { Post as BlogPost, User } from '@prisma/client';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { FindPostsDto } from './dto/findPosts.dto';

@Controller('blog')
export class BlogController {
  constructor(public readonly blogService: BlogService) {}

  @Post('post')
  @UseGuards(JwtAuthGuard)
  async createPost(
    @AuthUser() user: User,
    @Body() postDto: CreatePostDto,
  ): Promise<BlogPost> {
    return this.blogService.createPost(user, postDto);
  }

  @Put('post/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @AuthUser() user: User,
    @Param('id') id: string,
    @Body() postDto: UpdatePostDto,
  ): Promise<BlogPost> {
    return this.blogService.updatePost(user, id, postDto);
  }

  @Get('post/:id')
  async findPost(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findPost(id);
  }

  @Get('posts')
  async findPosts(@Query() queryDto: FindPostsDto): Promise<BlogPost[]> {
    return this.blogService.findPosts(queryDto);
  }

  @Delete('post/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @AuthUser() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.blogService.deletePost(user, id);
  }
}
