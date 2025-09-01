import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './Schemas/employee.Schemas';
import { Model } from 'mongoose';
import { Profile } from './Schemas/profile.Scehmas';

@Injectable()
export class EmployeeService {
    constructor( 
        @InjectModel(Employee.name) private EmployeeModel : Model<Employee>,
        @InjectModel(Profile.name) private ProfileModel : Model<Profile>
    ){}

    async createEmployee(data : Partial<Employee>) : Promise<Employee>{
        try {

            if(!data || !data.name){
                throw new Error("Name is required")
            }

            const existingEmployee = await this.EmployeeModel.findOne({name : data.name});

            if(existingEmployee){
                throw new Error(`User Already Existing!`)
            }

            const newCreateProfile = await this.ProfileModel.create({
                age : (data as any).age,
                qualification : (data as any).qualification
            })

            const newCreateEmployee = await this.EmployeeModel.create({
                name : data.name,
                profile : newCreateProfile._id
            })

            const createdEmployee = await this.EmployeeModel.findById(newCreateEmployee?._id);

            if(!createdEmployee){
                throw new Error('created Employee Problem!')
            }

            return createdEmployee;
        } catch (error) {
            throw new Error(`Something Went Wrong : ${error.message}`)
        }
    }

    async fetchAllEmployee(){
        return this.EmployeeModel.find().populate('profile').exec();
    }
}
