import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'The title of the post',
    example: 'Updated Post Title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'The main content of the post',
    example: 'This is the updated content of the blog post.',
  })
  @IsOptional()
  @IsString()
  contents?: string;

  @ApiPropertyOptional({
    description: 'The publication status of the post',
    example: 'published',
    enum: ['draft', 'published'],
  })
  @IsOptional()
  @IsEnum(['draft', 'published'], {
    message: 'Status must be draft or published',
  })
  status?: string;
}
