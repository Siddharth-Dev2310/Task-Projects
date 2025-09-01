import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/Entites/user.entites';
import { JwtStrategy } from './guard/auth/Jwt.Strategy';
import { Post } from './post/Entites/post.entites';

@Module({
  imports: [
    //! Env variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    //! PostgreSQL config
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_SQL,
      autoLoadEntities: true,
      synchronize: true,
    }),

    //! Entities required by middleware
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Post]),

    //! Global JwtModule (one-time registration)
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: config.get<string>('ACCESS_TOKEN_EXPIRY') },
      }),
    }),

    //!  Other feature modules
    UserModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user/auth/register', method: RequestMethod.POST },
        { path: 'user/auth/login', method: RequestMethod.POST },
        { path: 'posts/', method: RequestMethod.POST },
        { path: 'posts', method: RequestMethod.GET }, //! : Get all posts
        { path: 'posts/:id', method: RequestMethod.GET }, //! : Get post by id
        // {path: 'posts/create', method:RequestMethod.POST}
      )
      .forRoutes('*');
  }
}
