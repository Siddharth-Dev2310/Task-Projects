import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './Entity/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository : Repository<Employee>
    ){}

    async creteEmployee(data : Partial<Employee>) : Promise<Employee>{
        const createdEmployee = await this.employeeRepository.create(data);

        return this.employeeRepository.save(createdEmployee);
    }

    async fetchAll() : Promise<Employee[]> {
        const fetchAllEmployee = await this.employeeRepository.find();

        return fetchAllEmployee;
    }

    async fetchEmployeeById(id : number) : Promise<Employee | null>{
        const fetchAllEmployeeById = await this.employeeRepository.findOneBy({id})

        if(!fetchAllEmployeeById){
            throw new Error("Can't Find Id")
        }

        return fetchAllEmployeeById
    }

    async updateEmployee( id : number, data : Partial<Employee>) : Promise<Employee | null >{
        const employee = await this.employeeRepository.findOneBy({ id });

        if(!employee){
            throw new Error('Can not find employee')
        }

        const updatedEmployee = Object.assign(employee, data);

        return await this.employeeRepository.save(updatedEmployee)
    }

    async deleteEmployee( id : number ) : Promise<{message : string}>{
        let result = await this.employeeRepository.delete(id);

        if(!result){
            throw new Error("can't Find The Id")
        }

        return {  message: `Employee with ID ${id} has been deleted successfully!` }
    }

    async searchEmployee(filters: { name?: string; department?: string }): Promise<Employee[]> {
        const query = this.employeeRepository.createQueryBuilder('employee');

        if (filters.name) {
            query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%` });
        }

        if (filters.department) {
            query.andWhere('employee.department ILIKE :dept', { dept: `%${filters.department}%` });
        }

        return query.getMany();
    }
}
