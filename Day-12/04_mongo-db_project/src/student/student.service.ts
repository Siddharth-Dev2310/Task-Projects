import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.Schema';
import { Model } from 'mongoose';
import { ApiError } from 'src/common/error/apiError';
import { ApiResponse } from 'src/common/response/apiResponce';
import { error } from 'console';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel : Model<StudentDocument>
    ){}

    async createStudent(data : Partial<Student>) : Promise<ApiResponse<Student>>{
        try {

            if(!data.email){
                throw new ApiError(400, "email are required")
            }

            const existingStudent = await this.studentModel.findOne({ email: data.email });
    
            if (existingStudent) {
                throw new ApiError(400, "Student Already Existing");
            }
    
            const newStudent = new this.studentModel(data);
            const savedStudent = await newStudent.save();

            return new ApiResponse(200, savedStudent, "Student Create successfully");
        } catch (error) {

            if(error instanceof ApiError){
                throw error;
            }

            throw new ApiError(500, 'Failed to create student', [error.message]);
        }
    }

    async getAllStudents() :  Promise<ApiResponse<Student[]>>{
        const data = await this.studentModel.find().exec();

        if(!data){
            throw new ApiError(400, "Student Can't Found");
        }

        return new ApiResponse(200, data, "Get All Students Successfully")
    }

    async getStudentById(id : string) : Promise<ApiResponse<Student | null>>{
        const data = await this.studentModel.findById(id).exec();
        if(!data){
            throw new ApiError(400, "Student Can't Found");
        }
        
        return new ApiResponse(200, data, "Student found")
    }

    async updateStudent(id : string , data : Partial<Student>) : Promise<ApiResponse<Student | null>>{
        try{
            const updated = await this.studentModel.findByIdAndUpdate(
                id,
                {
                    name : data.name ?? null,
                    email : data.email ?? null,
                    age : data.age ?? null
                },
                { overwrite: true, new: true}
            )

            if(!updated){
                throw new ApiError(400, "Can't Updated data")
            }

            return new ApiResponse(200, updated, "Student Data Update Successfully")
        } 
        catch{
            if(error instanceof ApiError){
                throw error
            }

            throw new ApiError(500, "Can't Modify Data");
        }
    }

    async patchStudent(id : string , data : Partial<Student>) : Promise<ApiResponse<Student | null>>{
        try{
            const updated = await this.studentModel.findByIdAndUpdate(
                id,
                {
                    data
                },
                { overwrite: true, new: true}
            ).exec()

            if(!updated){
                throw new ApiError(400, "Can't Updated data")
            }

            return new ApiResponse(200, updated, "Student Data Update Successfully")
        } 
        catch{
            if(error instanceof ApiError){
                throw error
            }

            throw new ApiError(500, "Can't Modify Data");
        }
    }

    async deleteStudent(id : string) : Promise<ApiResponse<Student | null>>{
        try {
            const deleteStudent = await this.studentModel.findByIdAndDelete(id);
            
            if(!deleteStudent){
                throw new ApiError(400, "Can't delete the Student")
            }
    
            return new ApiResponse(200, deleteStudent, "Student Update Successfully")
        } catch (error) {
            if(error instanceof ApiError){
                throw error
            }

            throw new ApiError(500, "Can't Deleted Data");
        }
    }
}
