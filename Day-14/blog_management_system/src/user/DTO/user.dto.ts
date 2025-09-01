import {
  IsArray,
  IsDate,
  IsEmail,
  IsJWT,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../interfaces/user.interfaces';
import { Post } from 'src/post/Entites/post.entites';

export class UserClassDto implements Partial<UserInterface> {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Siddharth Solanki',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'sid@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Password (minimum 8 characters)',
    minLength: 8,
    example: 'password123',
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
    enum: ['admin', 'author', 'reader'],
  })
  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2025-09-01T10:30:00.000Z',
    required: false,
  })
  @IsDate()
  createdAt?: Date | undefined;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2025-09-01T12:45:00.000Z',
    required: false,
  })
  @IsDate()
  updatedAt?: Date | undefined;

  @ApiProperty({
    description: 'Refresh token (JWT)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  @IsJWT()
  refreshToken?: string | undefined;

  @ApiProperty({
    description: 'Access token (JWT)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  @IsJWT()
  accessToken?: string | undefined;
}
