import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvService {
    constructor(private configureService : ConfigService){}

    getDbUrl(){
        return this.configureService.get<string>('DB_URL')
    }
}
