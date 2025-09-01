import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  contents?: string;

  @IsOptional()
  @IsEnum(['draft', 'published'], {
    message: 'Status must be draft or published',
  })
  status?: string;
}
