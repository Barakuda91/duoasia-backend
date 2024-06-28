import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TelegrafModule } from 'nestjs-telegraf';
import { RequestLoggingMiddleware } from './request-logging.middleware';
import { BarModule } from './modules/bar/bar.module';
import { join } from 'path';
import { BotModule } from './modules/bot/bot.module';
import {ScheduleModule} from "@nestjs/schedule";
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
// import { UsersService } from './modules/users/users.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TG_BOT_TOKEN,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      charset: 'utf8_general_ci',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join('/root/duoasia-frontend/dist'),
    }),
    ScheduleModule.forRoot(),
    BarModule,
    BotModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [UsersController],
  // providers: [UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
