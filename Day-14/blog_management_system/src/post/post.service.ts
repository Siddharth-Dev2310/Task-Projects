import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from './Entites/post.entites';
import { User } from 'src/user/Entites/user.entites';
import { ApiResponse } from 'src/utils/ApiResponse.utils';
import { ApiError } from 'src/utils/ApiError.utils';
import { CreatePostDto } from './DTO/createPost.dto';
import { UpdatePostDto } from './DTO/updatePost.dto';
import { PaginatedResult } from 'src/user/interfaces/pagination.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createPost(data: CreatePostDto, req: any): Promise<ApiResponse<Post>> {
    //! : Author-only: create a post
    //? : Validate user is author
    //! : Create post
    //* :  Add The Post On the User Post Array
    //? : Return response

    try {
      let userId = req.user?.id;
      const user = await this.userRepo.findOne({ where: { id: userId } });

      console.log('Requested User:', user);

      if (!user || user.role !== 'author') {
        throw new ApiError(403, 'Only authors can create posts');
      }

      const post = this.postRepo.create({
        ...data,
        content: data.content,
        status: data.status as 'draft' | 'published' | undefined,
        user: { id: user.id },
      });

      await this.postRepo.save(post);

      const createdPost = await this.postRepo.findOne({
        where: { id: post?.id },
        relations: ['user', 'comments'],
      });

      if (!createdPost) {
        throw new ApiError(400, "Post Can't Created, Please Try Again!");
      }

      return new ApiResponse(201, createdPost, 'Post created successfully');
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Post Creation Problem : ${error.message}`);
    }
  }

  async getPosts(
    page: number = 1,
    limit: number = 10,
    search?: string,
    pagination: boolean = true,
  ): Promise<ApiResponse<PaginatedResult<Post[]>>> {
    try {
      let baseWhere: any = { deleted: false };
      if (search) {
        baseWhere = [
          { ...baseWhere, title: Like(`%${search}%`) },
          { ...baseWhere, content: Like(`%${search}%`) },
        ];
      }
      let data: Post[], total: number, totalPages: number;
      if (!pagination) {
        [data, total] = await this.postRepo.findAndCount({
          where: baseWhere,
          order: { createdAt: 'DESC' },
          relations: ['user'],
        });
        page = 1;
        limit = total;
        totalPages = 1;
      } else {
        [data, total] = await this.postRepo.findAndCount({
          where: baseWhere,
          skip: (page - 1) * limit,
          take: limit,
          order: { createdAt: 'DESC' },
          relations: ['user'],
        });
        totalPages = Math.ceil(total / limit);
      }

      return new ApiResponse(
        200,
        {
          data,
          total,
          page,
          limit,
          totalPages,
        },
        'Posts fetched successfully',
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Post Pagination Problem : ${error.message}`);
    }
  }

  async getPostById(id: number): Promise<ApiResponse<Post>> {
    //! : Find post with comments
    //? : Error if not found
    //! : Return post

    try {
      const post = await this.postRepo.findOne({
        where: { id },
        relations: ['user', 'comments'],
      });

      if (!post) {
        throw new ApiError(404, 'Post not found');
      }
      return new ApiResponse(200, post, 'Post fetched successfully');
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        `Getting PostBy Id : ${id} Problem : ${error.message}`,
      );
    }
  }

  async updatePost(
    id: number,
    data: UpdatePostDto,
    req: any,
  ): Promise<ApiResponse<Post>> {
    //! : Find post
    //? : Check ownership and role
    //! : Update post
    //? : Return response

    try {
      let userId = req;

      const post = await this.postRepo.findOne({
        where: { id },
        relations: ['user'],
      });

      // console.log("Updating Post :",post);

      if (!post) {
        throw new ApiError(404, 'Post not found');
      }

      console.log('Updating User Id', userId);

      if (post.user.id !== userId) {
        throw new ApiError(403, 'You can only update your own posts');
      }

      Object.assign(post, data);
      await this.postRepo.save(post);

      return new ApiResponse(200, post, 'Post updated successfully');
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Post Updating Problem : ${error.message}`);
    }
  }

  async deletePost(
    id: number,
    req: any,
  ): Promise<ApiResponse<{ deleted: boolean; message: string }>> {
    //! : Find post
    //? : Find user
    //! : Check role/ownership
    //? : Delete post
    //! : Return response

    try {
      let userId = req;
      const post = await this.postRepo.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!post) {
        throw new ApiError(404, 'Post not found');
      }
      const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['posts'],
      });
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      if (user.role !== 'admin' && post.user.id !== userId) {
        throw new ApiError(403, 'Only admin or post owner can delete');
      }

      (post as any).deleted = true;
      await this.postRepo.save(post);

      return new ApiResponse(
        200,
        { deleted: true, message: 'Post deleted successfully' },
        'Post soft deleted',
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Post Soft Deletion Problem : ${error.message}`);
    }
  }
}
