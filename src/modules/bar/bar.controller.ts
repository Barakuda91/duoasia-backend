import {Controller, Get, Post, Body, Query, ValidationPipe, UseInterceptors} from '@nestjs/common';
import { BarService } from './bar.service';
import { AddReportDto } from './dto/addReport.dto';
import { SettingDto } from './dto/settings.dto';
import {TryCatchInterceptor} from "../../common/TryCatchInterceptor";

@Controller('bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Post('update_setting')
  async updateSettings(@Body() data: SettingDto) {
    return await this.barService.updateSetting(data);
  }

  @Post('remove_setting')
  async removeSettings(@Body('idToRemove') idToRemove: number) {
    await this.barService.removeSetting(idToRemove);

    return {
      status: 'OK',
    };
  }

  @Post('new_setting')
  async saveNewSettings(@Body() data: SettingDto) {
    return await this.barService.addNewSetting(data);
  }

  @Post('daily_report')
  async addReport(@Body() data: AddReportDto): Promise<void> {
    return await this.barService.addReport(data);
  }

  @Get('reports')
  async getReport(@Query('date') date: string): Promise<any> {
    try {
      return {
        status: 'OK',
        data: await this.barService.getReport(new Date(date)),
      };
    } catch (error) {
      return {
        status: 'ERROR',
        error,
      };
    }
  }

  @Get('daily_semifinished')
  async dailySemiFinished() {
    try {
      const data = await this.barService.getDailySemiFinished();
      return {
        status: 'OK',
        data,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        error,
      };
    }
  }

  @Post('createDB')
  createDB() {
    return this.barService.createDB();
  }
}
