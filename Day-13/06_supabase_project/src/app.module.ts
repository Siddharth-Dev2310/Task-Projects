import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    TypeOrmModule.forRoot({
      type : 'postgres',
      url : process.env.POSTGRAY_SQL,
      autoLoadEntities : true,
      synchronize : true
    }),
    UserModule,
    EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
