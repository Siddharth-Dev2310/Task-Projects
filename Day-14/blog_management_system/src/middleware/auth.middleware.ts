import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/Entites/user.entites';
import { Repository } from 'typeorm';
import { ApiError } from '../utils/ApiError.utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new ApiError(401, 'Unauthorized');
      }
      const decodedToken: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
      );

      const user = await this.userRepo.findOne({
        where: { id: decodedToken?.id },
      });

      if (!user) {
        throw new ApiError(401, 'Invalid access token');
      }

      //! Remove sensitive fields
      const { password, refreshToken, ...userSafe } = user;
      req['user'] = userSafe;
      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || 'Invalid access token');
    }
  }
}
