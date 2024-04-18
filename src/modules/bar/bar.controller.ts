import { Controller, Get, Post, Body, Query, ValidationPipe } from '@nestjs/common';
import { BarService } from './bar.service';
import { AddReportDto } from './dto/addReport.dto';

@Controller('bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Post('daily_report')
  async addReport(@Body() data: AddReportDto): Promise<void> {
    await this.barService.addReport(data);
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
