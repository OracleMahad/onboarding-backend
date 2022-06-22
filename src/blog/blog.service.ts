import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Post as BlogPost, User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { FindPostsDto } from './dto/findPosts.dto';

@Injectable()
export class BlogService {
  constructor(public readonly prismaService: PrismaService) {}

  async createPost(user: User, postDto: CreatePostDto) {
    const newPost = await this.prismaService.post.create({
      data: {
        title: postDto.title,
        body: postDto.body,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        author: true,
      },
    });
    if (!newPost) {
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return newPost;
  }

  async updatePost(user: User, id: string, postDto: CreatePostDto) {
    if (!id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const post = await this.prismaService.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
      },
    });

    if (Number(post.authorId) !== Number(user.id)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const updatedPost = await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: postDto.title,
        body: postDto.body,
      },
    });

    return updatedPost;
  }

  async findPost(id: string): Promise<BlogPost> {
    if (!id) {
      throw new NotFoundException();
    }

    const post = await this.prismaService.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async findPosts(queryDto: FindPostsDto): Promise<BlogPost[]> {
    const { page = 1, limit = 10, q } = queryDto;
    console.log(queryDto);
    const offset = (page - 1) * limit;

    return this.prismaService.post.findMany({
      // select: {}, //set attributes
      where: {
        title: q ? { contains: `%${q}%` } : {},
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: { select: { id: true, email: true, username: true } },
      },
    });
  }

  async deletePost(user: User, id: string) {
    if (!id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const post = await this.prismaService.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
      },
    });

    if (Number(post.authorId) !== Number(user.id)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const deletePost = await this.prismaService.post.delete({
      where: {
        id: post.id,
      },
    });

    return deletePost;
  }
}
