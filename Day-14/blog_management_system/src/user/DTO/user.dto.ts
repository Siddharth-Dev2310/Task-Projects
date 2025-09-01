import {
  IsArray,
  IsDate,
  IsEmail,
  IsJWT,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { UserInterface } from '../interfaces/user.interfaces';
import { Post } from 'src/post/Entites/post.entites';

export class UserClassDto implements Partial<UserInterface> {
  @IsNotEmpty({ message: 'Name Are Required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email Formate' })
  @IsNotEmpty({ message: 'Email Is Required' })
  email: string;

  @MinLength(8, { message: 'Password Must Be at least 8 characters Long' })
  @IsNotEmpty({ message: 'Password Is Required' })
  password: string;

  @IsNotEmpty({ message: 'Role Is Required' })
  role: string;

  @IsDate()
  createdAt?: Date | undefined;

  @IsDate()
  updatedAt?: Date | undefined;

  @IsJWT()
  refreshToken?: string | undefined;

  @IsJWT()
  accessToken?: string | undefined;
}
