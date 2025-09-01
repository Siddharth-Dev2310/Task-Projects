import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customers-dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService : CustomersService){}

    @Get()
    getAllCustomers(){
        return this.customersService.getAllCustomers()
    }

    @Post()
    addCustomers(@Body() CreateCustomerDto : CreateCustomerDto){
        return this.customersService.addCustomers(CreateCustomerDto)
    }

}
