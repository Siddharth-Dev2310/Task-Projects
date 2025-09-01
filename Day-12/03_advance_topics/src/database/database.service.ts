import { Injectable, OnModuleInit, OnApplicationShutdown   } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected = false;

    onModuleInit(){
        this.isConnected = true;
        console.log('Database Connected!');
    }

    onApplicationShutdown(signal : String){
        this.isConnected = false;
        console.log(`Database Disconnected Daw To App Shutdown . Single ${signal}`);   
    }

    getStatus(){
        return this.isConnected ? 'Connected' : 'Disconnected';
    }
}
