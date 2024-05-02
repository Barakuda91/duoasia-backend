import { Module } from '@nestjs/common';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { SemiFinishedSettings } from '../../models/semiFinishedSettings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SemiFinishedDaily } from '../../models/semiFinishedDaily.entity';
import { BotModule } from '../bot/bot.module';
import { BotService } from '../bot/bot.sevice';

@Module({
  imports: [
    TypeOrmModule.forFeature([SemiFinishedSettings, SemiFinishedDaily]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BotModule,
  ],
  controllers: [BarController],
  providers: [BarService, BotService],
})
export class BarModule {}
