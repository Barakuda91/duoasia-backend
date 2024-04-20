import { Module } from '@nestjs/common';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { SemiFinishedSettings } from '../../models/semiFinishedSettings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SemiFinishedDaily } from '../../models/semiFinishedDaily.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SemiFinishedSettings, SemiFinishedDaily]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [BarController],
  providers: [BarService],
})
export class BarModule {}
