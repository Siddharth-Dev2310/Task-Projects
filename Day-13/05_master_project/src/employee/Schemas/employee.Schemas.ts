import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Schema as mongooseSchema } from "mongoose";
import { Profile } from "./profile.Scehmas";

@Schema({
    timestamps :true
})

export class Employee{
    @Prop({
        required : true,
        trim : true,
        lowercase : true
    })
    name : string;

    @Prop({
        required : true,
        type : mongooseSchema.Types.ObjectId,
        ref : "Profile"
    })
    profile : Profile;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);