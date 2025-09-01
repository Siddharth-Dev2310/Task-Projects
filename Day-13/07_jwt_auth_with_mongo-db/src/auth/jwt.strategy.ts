import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt , Strategy} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService : ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get<string>('ACCESS_TOKEN_SECRET')
        })
    }

    async validate(payload : any){
        return {userId : payload.sub, email : payload.email}
    }
}