import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Mongoose} from 'mongoose';


export type UserDocument = User & Mongoose;

@Schema()
export class User {
    @Prop({
        required : true,
        unique : true
    })
    email : string;

    @Prop({
        required : true
    })
    password : string;
}

export const UserSchema = SchemaFactory.createForClass(User);
