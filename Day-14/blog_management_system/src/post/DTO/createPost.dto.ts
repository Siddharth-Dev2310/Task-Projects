import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(['draft', 'published'], {
    message: 'Status must be draft or published',
  })
  status?: string = 'draft';
}
