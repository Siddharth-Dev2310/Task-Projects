import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentServices: StudentService) {}

  @Get()
  getAllStudent() {
    return this.studentServices.getAllData();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentServices.getStudentById(Number(id));
  }

  @Post()
  createStudent(@Body() body: { name: string; age: number }) {
    return this.studentServices.createStudent(body);
  }

  @Put(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() body: { name: string; age: number },
  ) {
    return this.studentServices.updateStudent(Number(id), body);
  }

  @Patch(':id')
  updateStudentUsingPatch(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.studentServices.patchStudent(Number(id), body);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentServices.deleteStudent(Number(id));
  }
}
