import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel : Model<User>){}

  
    async createUser(): Promise<User>{
        const user = new this.userModel({
            name: 'Farzeen Ali',
            address: {
                street: '123 Street',
                city: 'Karachi'
            }
        })
        return user.save();
    }
  
   async findAll(): Promise<User[]>{
        return this.userModel.find()
    }  
}
