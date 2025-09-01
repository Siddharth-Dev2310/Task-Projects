import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmploeyeeController } from './emploeyee/emploeyee.controller';
import { EmploeyeeModule } from './emploeyee/emploeyee.module';
import { StudentModule } from './student/student.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [EmploeyeeModule, StudentModule, CustomersModule],
  controllers: [
    AppController,
    UserController,
    ProductController,
    EmploeyeeController,
  ],
  providers: [AppService, ProductService],
})
export class AppModule {}
