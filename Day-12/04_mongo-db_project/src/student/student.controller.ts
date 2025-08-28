import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.Schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService : StudentService){}

    @Post('create')
    async addStudent(@Body() data : Partial<Student>){
        return this.studentService.createStudent(data);
    }

    @Get('/')
    async getAllStudents(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id : string){
        return this.studentService.getStudentById(id);
    }

    @Put('/update/:id')
    async updateStudent(@Param('id') id : string, @Body() data : Partial<Student>){
        return this.studentService.updateStudent(id,data);
    }

    @Patch('/patch/:id')
    async patchStudents(@Param('id') id : string, @Body() data : Partial<Student>){
        return this.studentService.patchStudent(id,data);
    }

    @Delete('/delete/:id')
    async deletedStudent(@Param('id') id : string){
        return this.studentService.deleteStudent(id);
    }
}
