import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/Entites/post.entites';
import { User } from 'src/user/Entites/user.entites';
import { Repository } from 'typeorm';
import { Comment } from './Entites/comment.entites';
import { CommentDto } from './DTO/comment.dto';
import { ApiError } from 'src/utils/ApiError.utils';
import { ApiResponse } from 'src/utils/ApiResponse.utils';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    // @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async createComment(
    id: number,
    data: Partial<CommentDto>,
  ): Promise<ApiResponse<CommentDto>> {
    //! : collect The Id form Params
    //? : Add The Validation On The Post Id have Or Not?
    //? : Create The Comment Using The createFunction
    //! : add The Validation for Comment Are Created Or Not?
    //? :  Given The response

    try {
      let postId = id;

      const post = await this.postRepo.findOne({ where: { id: postId } });

      if (!post) {
        throw new ApiError(400, " Post Can't Found");
      }

      const comment = await this.commentRepo.create({
        ...data,
        post: post,
        user: post.user,
      });

      await this.commentRepo.save(comment);

      const createdComment = await this.commentRepo.findOne({
        where: { id: comment.id },
        relations: ['post', 'user'],
      });

      if (!createdComment) {
        throw new ApiError(400, "Can't Create Comment");
      }

      console.log('createdComment :', createdComment);
      return new ApiResponse(201, createdComment, 'Comment successfully Add');
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Comment Creation Problem : ${error.message}`);
    }
  }

  async deleteComment(
    id: number,
  ): Promise<ApiResponse<{ deleted: boolean; message: string }>> {
    //! :  Collect The Comment id Form id
    //? :  Check The Comment Are Existing Or Not?
    //! : If The Comment Can Existing Delete the Id
    //? : Given the Response

    try {
      const commentId = id;

      const comment = await this.commentRepo.findOne({
        where: { id: commentId },
      });
      if (!comment) {
        throw new ApiError(400, "Can't Found The Comment");
      }

      (comment as any).deleted = true;
      await this.commentRepo.save(comment);
      return new ApiResponse(
        200,
        { deleted: true, message: 'Comment soft deleted successfully' },
        'Comment soft deleted',
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        `Comment Soft Deletion Problem : ${error.message}`,
      );
    }
  }
}
