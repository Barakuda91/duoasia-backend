import { Module } from '@nestjs/common';
import { BotService } from './bot.sevice';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemiFinishedSettings } from '../../models/semiFinishedSettings.entity';
import { SemiFinishedDaily } from '../../models/semiFinishedDaily.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SemiFinishedSettings, SemiFinishedDaily]),
  ],
  controllers: [],
  providers: [BotService],
})
export class BotModule {}
