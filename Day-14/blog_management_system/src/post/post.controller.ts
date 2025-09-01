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
  @SwaggerApiResponse({
    status: 201,
    description: 'Post created successfully.',
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
  @SwaggerApiResponse({
    status: 200,
    description: 'Posts fetched successfully.',
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
  })
  async getPostById(@Param('id') id: number): Promise<ApiResponse<Posts>> {
    return this.postService.getPostById(id);
  }

  //! : Author-only: update own post
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('author')
  @ApiOperation({ summary: 'Update own post (author only)' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Post updated successfully.',
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
  @SwaggerApiResponse({ status: 200, description: 'Post soft deleted.' })
  async deletePost(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<ApiResponse<{ deleted: boolean; message: string }>> {
    return this.postService.deletePost(id, req.user.id);
  }
}
