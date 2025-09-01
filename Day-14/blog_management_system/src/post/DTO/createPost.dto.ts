import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Blog Post',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The main content of the post',
    example: 'This is the content of my first blog post...',
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'The publication status of the post',
    example: 'draft',
    enum: ['draft', 'published'],
    default: 'draft',
  })
  @IsOptional()
  @IsEnum(['draft', 'published'], {
    message: 'Status must be draft or published',
  })
  status?: string = 'draft';
}
