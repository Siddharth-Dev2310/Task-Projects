import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Schema as mongooseSchema } from "mongoose";

@Schema({
    timestamps : true
})

export class Profile{
    @Prop({
        required : true,
    })
    age : number

    @Prop()
    qualification : string
}

export const ProfileSchemas = SchemaFactory.createForClass(Profile);