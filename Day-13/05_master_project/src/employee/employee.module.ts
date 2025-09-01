import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './Schemas/employee.Schemas';
import { Profile, ProfileSchemas } from './Schemas/profile.Scehmas';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : Employee.name, schema : EmployeeSchema},
      {name : Profile.name, schema : ProfileSchemas}
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
