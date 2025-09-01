import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {jwt} from 'jsonwebtoken'

@Injectable()
export class GuardGuard implements CanActivate {

  constructor(private configService : ConfigService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request =  context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthorizedException('No Token Provided!');
    }
    
    const token = authHeader.split(' ')[1];

    const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET')

    if(!jwtSecret){
      throw new UnauthorizedException("JWT Token Can't Not Found")
    }

    try {
      const decoded = jwt.verify(token,jwtSecret);
      request['user'] = decoded;
      return true;
    } catch (error) {
      throw new Error(`Invalid Toke ${error}`)
    } 
  }
}
