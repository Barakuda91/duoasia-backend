import {
  Update,
  InjectBot,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { SemiFinishedSettings } from '../../models/semiFinishedSettings.entity';
import { Repository } from 'typeorm';
import { SemiFinishedDaily } from '../../models/semiFinishedDaily.entity';
const chatId = '-4127696309';

@Update()
export class BotService {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    @InjectRepository(SemiFinishedSettings)
    private readonly semiFinishedSettingsRepository: Repository<SemiFinishedSettings>,
    @InjectRepository(SemiFinishedDaily)
    private readonly semiFinishedDailyRepository: Repository<SemiFinishedDaily>,
  ) {}

  private getDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  @Cron('10 55 1 * * *')
  async handleCron() {
    const reports = [];
    const settings = await this.semiFinishedSettingsRepository.find();
    const dailyReports = await this.semiFinishedDailyRepository.find({
      where: {
        timeWhenCreated: this.getDateString(new Date()),
      },
    });

    for (const report of dailyReports) {
      const setting = settings.find(
        (setting) => report.settingId === setting.id,
      );

      if (report) {
        const answers = report.answers
          .map((answer) => {
            if (setting) {
              return setting.answers[answer];
            } else {
              return [];
            }
          })
          .filter((answer) => {
            return answer !== undefined;
          });

        reports.push({
          title: setting.title,
          answers: answers,
        });
      }
    }

    const contains = (arr, value) => arr.some((item) => item.includes(value));

    const markdownText =
      'Сегодня требуется заготовить:\n' +
      reports
        .filter((item) => !contains(item.answers, 'Есть'))
        .map((item) => {
          const filteredAnswers = item.answers.filter(
            (answer) => answer !== 'Надо делать',
          );
          const text = item.title.replace(/\([^()]*\)/g, '').trim();

          return `- ${text}${filteredAnswers.length ? ': ' : ''} ${filteredAnswers.join(', ')}`;
        })
        .join('\n');

    this.bot.telegram.sendMessage(chatId, markdownText);
  }
}
