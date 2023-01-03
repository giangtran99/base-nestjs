import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthencationMiddleware } from './middlewares/auth.middleware';



// console.log("vo ly",process.env.MYSQL_DATABASE_HOS)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DATABASE_HOST,
      port: +process.env.MYSQL_DATABASE_PORT,
      username: process.env.MYSQL_DATABASE_USER,
      password: process.env.MYSQL_DATABASE_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthencationMiddleware)
  //     .forRoutes({ path: 'cats', method: RequestMethod.GET });
  // }
}
