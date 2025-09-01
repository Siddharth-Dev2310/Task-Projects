import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>, private jwtService : JwtService
    ){}

    async signUp(email : string, password : string){
        const hash = await bcrypt.hash(password, 10);

        const user = new this.userModel({email , password : hash});

        return user.save();
    }

    async signIn(email: string, password: string){
        const user = await this.userModel.findOne({email : email.toLowerCase()});

        if(!user){
            throw new Error('user cannot find')
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new UnauthorizedException('password does not match    ')
        }

        const payload = {email : user.email , sab : user?._id};
        
        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}
