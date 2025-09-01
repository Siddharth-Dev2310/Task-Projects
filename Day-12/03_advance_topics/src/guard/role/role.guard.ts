import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './role.decorator';
import { Role } from './role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLE_KEY,[
        context.getHandler(),
        context.getClass()
      ]
    )

    if(!requiredRoles) return true

    const request = context.switchToHttp().getRequest<{headers : Record<string, string>}>();

    const userRole = request.headers['x-user-role'] as Role;

    return requiredRoles.includes(userRole)
  }
}
