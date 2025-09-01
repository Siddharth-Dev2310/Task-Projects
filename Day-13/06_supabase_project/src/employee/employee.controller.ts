import { Controller, Get, Body, Post, Param, Put, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './Entity/employee.entity';
import { deprecate } from 'util';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() body : Partial<Employee>) : Promise<Employee>{
    return this.employeeService.creteEmployee(body)
  }

  @Get()
  async fetchAll(){
    return this.employeeService.fetchAll();
  }

  @Get('search')
  async searchEmployee(
    @Query('name') name?: string, 
    @Query('department') department?: string
  ): Promise<Employee[] | null> {
    return this.employeeService.searchEmployee({
      name: name ?? '',
      department: department ?? ''
    });
  }

  @Get(':id')
  async fetchById(@Param('id') id : number ) :Promise<Employee | null > {
    return this.employeeService.fetchEmployeeById(Number(id))
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id : number,
    @Body() body : Partial<Employee>,
  ) : Promise<Employee | null >{
    return this.employeeService.updateEmployee(id ,body);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id : number) : Promise<{message : string}> {
    return await this.employeeService.deleteEmployee(id)
  }
}
