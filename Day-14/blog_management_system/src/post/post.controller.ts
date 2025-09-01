import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as HttpPost,
  Put,
  Query,
  Req,
  UseGuards,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse as SwaggerApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { Roles } from 'src/guard/roles/roles.decorator';
import { CreatePostDto } from './DTO/createPost.dto';
import { UpdatePostDto } from './DTO/updatePost.dto';
import { ApiResponse } from 'src/utils/ApiResponse.utils';
import { Post as Posts } from './Entites/post.entites';
import { PaginatedResult } from './interfaces/pagination.interface';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //! : Author-only: create a post
  @Post('/create')
  @HttpPost()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('author')
  @ApiOperation({ summary: 'Create a new post (author only)' })
  @ApiBody({ type: CreatePostDto })
  @SwaggerApiResponse({
    status: 201,
    description: 'Post created successfully.',
    schema: {
      example: {
        success: true,
        message: 'Post created successfully',
        data: {
          id: 1,
          title: 'My first post',
          content: 'This is the content of the post',
          authorId: 5,
        },
      },
    },
  })
  async createPost(
    @Body() body: CreatePostDto,
    @Req() req: any,
  ): Promise<ApiResponse<CreatePostDto>> {
    return this.postService.createPost(body, req.user.id);
  }

  //? : Public: list posts with pagination & search
  @Get('/')
  @ApiOperation({ summary: 'Get all posts with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'nestjs' })
  @ApiQuery({
    name: 'pagination',
    required: false,
    type: String,
    example: 'true',
    description: 'Enable/disable pagination',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Posts fetched successfully.',
    schema: {
      example: {
        success: true,
        message: 'Posts fetched successfully',
        data: {
          posts: [
            {
              id: 1,
              title: 'Intro to NestJS',
              content: 'NestJS is a powerful framework...',
              authorId: 5,
            },
            {
              id: 2,
              title: 'Swagger in NestJS',
              content: 'Swagger helps to document APIs...',
              authorId: 6,
            },
          ],
          total: 2,
          page: 1,
          limit: 10,
        },
      },
    },
  })
  async getPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('pagination') pagination: string = 'true',
  ): Promise<ApiResponse<PaginatedResult<Posts[]>>> {
    return this.postService.getPosts(
      page,
      limit,
      search,
      pagination !== 'false',
    );
  }

  //! : Public: get single post with comments
  @Get(':id')
  @ApiOperation({ summary: 'Get a single post by ID' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Post fetched successfully.',
    schema: {
      example: {
        success: true,
        message: 'Post fetched successfully',
        data: {
          id: 1,
          title: 'Intro to NestJS',
          content: 'NestJS is a progressive Node.js framework...',
          authorId: 5,
          comments: [
            { id: 1, text: 'Great article!', userId: 10 },
            { id: 2, text: 'Very helpful, thanks!', userId: 11 },
          ],
        },
      },
    },
  })
  async getPostById(@Param('id') id: number): Promise<ApiResponse<Posts>> {
    return this.postService.getPostById(id);
  }

  //! : Author-only: update own post
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('author')
  @ApiOperation({ summary: 'Update own post (author only)' })
  @ApiBody({ type: UpdatePostDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Post updated successfully.',
    schema: {
      example: {
        success: true,
        message: 'Post updated successfully',
        data: {
          id: 1,
          title: 'Updated Post Title',
          content: 'Updated content',
          authorId: 5,
        },
      },
    },
  })
  async updatePost(
    @Param('id') id: number,
    @Body() body: UpdatePostDto,
    @Req() req: any,
  ): Promise<ApiResponse<Posts>> {
    return this.postService.updatePost(id, body, req.user.id);
  }

  //! : Author/Admin: delete post
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('author', 'admin')
  @ApiOperation({ summary: 'Soft delete a post (author/admin)' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Post soft deleted successfully.',
    schema: {
      example: {
        success: true,
        message: 'Post soft deleted',
        data: {
          deleted: true,
          message: 'Post with id 1 has been deleted',
        },
      },
    },
  })
  async deletePost(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<ApiResponse<{ deleted: boolean; message: string }>> {
    return this.postService.deletePost(id, req.user.id);
  }
}
