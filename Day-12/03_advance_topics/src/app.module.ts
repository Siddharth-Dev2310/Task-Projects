import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MynameController } from './myname/myname.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoogerMiddleware } from './middleware/looger/looger.middleware';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';
import { EvController } from './ev/ev.controller';
import { EvService } from './ev/ev.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal : true})],
  controllers: [AppController, MynameController, ProductController, UserRolesController, ExceptionController, DatabaseController, EvController],
  providers: [AppService,ProductService, DatabaseService, EvService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoogerMiddleware).forRoutes('*')
  }
}
