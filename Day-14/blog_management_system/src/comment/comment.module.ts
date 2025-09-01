import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './Entites/comment.entites';
import { Post } from 'src/post/Entites/post.entites';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
