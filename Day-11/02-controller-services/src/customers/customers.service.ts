import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/coustomers.interface';
import { CreateCustomerDto } from './dto/create-customers-dto';

@Injectable()
export class CustomersService {
    private customers : Customer[] = [];

    getAllCustomers() : Customer[]{
        return this.customers
    }

    addCustomers(CreateCustomerDto : CreateCustomerDto) :Customer{
        const newCustomer : Customer = {
            id : Date.now(),
            ...CreateCustomerDto,
        }

        this.customers.push(newCustomer);

        return newCustomer;
    }
}
