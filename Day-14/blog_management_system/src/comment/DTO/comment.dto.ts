import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty({ message: 'Content is required' })
  @IsString()
  content: string;
}
