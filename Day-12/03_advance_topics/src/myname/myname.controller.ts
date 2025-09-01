import { Body, Controller, Post } from '@nestjs/common';
import { ToUppperCasePipe } from 'src/common/pipes/to-uppper-case/to-uppper-case.pipe';

@Controller('myname')
export class MynameController {
    @Post('custom')
    transformName(@Body('name', new ToUppperCasePipe()) name : string){
        return {message : `Received name : ${name}`}
    }
}
