import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";

export type StudentDocument = Student & Mongoose; 

@Schema({
    timestamps : true
})

export class Student{
    @Prop({
        required : true,
        trim : true,
        lowercase : true
    })
    name : string;

    @Prop({
        required : true,
    })
    age : number;

    @Prop()
    email? : string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);