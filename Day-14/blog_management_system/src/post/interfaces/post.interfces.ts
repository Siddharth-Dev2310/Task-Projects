import { User } from 'src/user/Entites/user.entites';
import { Comment } from 'src/comment/Entites/comment.entites';

export class PostResponseDto {
  id: number;
  title: string;
  contents: string;
  status: string;
  userId: number;
  user?: Partial<User>;
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
