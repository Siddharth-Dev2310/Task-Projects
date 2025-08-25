import { Controller, Get } from '@nestjs/common';

@Controller('emploeyee')
export class EmploeyeeController {
  @Get()
  getEmployee() {
    return 'Employee Create Succfully!!';
  }
}
