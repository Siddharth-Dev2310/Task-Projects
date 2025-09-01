import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './Schemas/employee.Schemas';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create')
  async createEmployee(@Body() data : Partial<Employee>){
    return this.employeeService.createEmployee(data)
  }

  @Get()
  async fetchAll(){
    return this.employeeService.fetchAllEmployee()
  }
}
