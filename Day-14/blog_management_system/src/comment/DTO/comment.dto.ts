import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    description: 'The actual text/content of the comment',
    example: 'This is a great post!',
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString()
  content: string;
}