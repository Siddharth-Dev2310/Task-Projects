import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './Entites/post.entites';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/Entites/user.entites';
import { Comment } from 'src/comment/Entites/comment.entites';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
