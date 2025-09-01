import { Controller , Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpsExceptionFilter } from 'src/filters/https-exception/https-exception.filter';

@Controller('exception')
@UseFilters(HttpsExceptionFilter)
export class ExceptionController {
    @Get('hello/:id')
    getHelloById(@Param('id', ParseIntPipe) id : number){
        return {message : `Your Id Is : ${id}`}
    }
}