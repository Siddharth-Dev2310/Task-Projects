import { Post } from 'src/post/Entites/post.entites';
import { User } from 'src/user/Entites/user.entites';

export interface CommentInterface {
  id: number;
  content: string;
  createdAt: Date;
  post: Post;
  user: User;
}
