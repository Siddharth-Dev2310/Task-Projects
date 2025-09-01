import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    { id: 1, name: 'Siddharth', age: 20 },
    { id: 2, name: 'Shivam', age: 22 },
  ];

  getAllData() {
    return this.students;
  }

  getStudentById(id: number) {
    const result = this.students.find((student) => student?.id === id);

    if (!result) {
      throw new NotFoundException('Student Not Found');
    }

    return result;
  }

  createStudent(data: { name: string; age: number }) {
    const newStudent = {
      id: Date.now(),
      ...data,
    };

    this.students.push(newStudent);

    return newStudent;
  }

  updateStudent(id: number, data: { name: string; age: number }) {
    const index = this.students.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundException("Student Can't Found");
    }

    this.students[index] = { id, ...data };

    return this.students[index];
  }

  patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
    const student = this.getStudentById(id);

    Object.assign(student, data);

    return student;
  }

  deleteStudent(id: number) {
    const index = this.students.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundException("Student Can't Found");
    }

    const deleted = this.students.splice(index, 1);

    return { message: 'Student Deleted', student: deleted[0] };
  }
}
