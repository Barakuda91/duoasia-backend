import { Injectable } from '@nestjs/common';
import { SemiFinishedSettings } from '../../models/semiFinishedSettings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SemiFinishedDaily } from '../../models/semiFinishedDaily.entity';
import { AddReportDto } from './dto/addReport.dto';
import { SettingDto } from './dto/settings.dto';

@Injectable()
export class BarService {
  constructor(
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

  async addNewSetting(setting) {
    const row = await this.semiFinishedSettingsRepository.save({
      title: setting.title,
      required: true,
      type: setting.type,
      answers: setting.answers,
    });

    row.name = `g${row.id}`;

    await this.semiFinishedSettingsRepository.update(
      {
        id: row.id,
      },
      row,
    );
    return row;
  }

  async updateSetting(setting: SettingDto) {
    if (!setting.id) {
      return {
        status: 'ERROR',
        error: 'param id is required',
      };
    }

    const updated: any = {};

    if (setting.title) {
      updated.title = setting.title;
    }

    if (setting.type) {
      updated.type = setting.type;
    }

    if (setting.answers) {
      updated.answers = setting.answers;
    }

    return this.semiFinishedSettingsRepository.update(
      {
        id: setting.id,
      },
      updated,
    );
  }

  async removeSetting(settingId: number) {
    return this.semiFinishedSettingsRepository.delete(settingId);
  }

  async addReport(message: AddReportDto): Promise<void> {
    // Логика добавления или обновления списка на сегодняшний день
    // Здесь вы можете использовать методы TypeORM для сохранения данных в базу данных
    // Например:
    // await this.semiFinishedDailyRepository.save(data);

    const settings = await this.semiFinishedSettingsRepository.find();

    const settingsMap = new Map();
    for (const setting of settings) {
      settingsMap.set(setting.name, setting);
    }

    for (const { answers, name } of message.data) {
      const { id: settingId } = settingsMap.get(name);

      const report = await this.semiFinishedDailyRepository.findOne({
        where: {
          settingId,
          timeWhenCreated: this.getDateString(new Date()),
        },
      });

      if (report) {
        report.answers = answers;
        await this.semiFinishedDailyRepository.save(report);
      } else {
        await this.semiFinishedDailyRepository.save({
          settingId,
          answers,
          timeWhenCreated: this.getDateString(new Date()),
        });
      }
    }
  }

  async getReport(date: Date): Promise<any> {
    const reports = [];
    const settings = await this.semiFinishedSettingsRepository.find();
    const dailyReports = await this.semiFinishedDailyRepository.find({
      where: {
        timeWhenCreated: this.getDateString(new Date(date)),
      },
    });

    for (const report of dailyReports) {
      const setting = settings.find(
        (setting) => report.settingId === setting.id,
      );

      if (report && setting) {
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

    return reports;
  }

  async getDailySemiFinished() {
    return this.semiFinishedSettingsRepository.find();
  }

  async createDB() {
    return;

    try {
      const data = [
        {
          title: 'Осветленный лимон (минимальный остаток 1л)',
          required: true,
          type: 'checkbox',
          name: 'q1',
          answers: ['Есть', 'Надо делать', 'Откинуть на разморозку'],
        },
        {
          title: 'Сироп Лемонграсс/кафир (минимальный остаток 1л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q2',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Пряный чили (минимальный остаток 1л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q3',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Cироп ваниль (минимальный остаток 1л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q4',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Грейпфрут/Малина (минимальный остаток 1л)',
          required: true,
          type: 'checkbox', // checkbox | radio
          name: 'q5',
          answers: ['Есть', 'Надо делать', 'Откинуть на разморозку'],
        },
        {
          title: 'Сироп кокос/манго (минимальный остаток 0,5л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q6',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Кордиал кинза (минимальный остаток 1л)',
          required: true,
          type: 'checkbox', // checkbox | radio
          name: 'q7',
          answers: [
            'Есть',
            'Надо делать',
            'Откинуть на разморозку',
            'Проварить с сахаром',
          ],
        },
        {
          title: 'Томат/Базилик (минимальный остаток 0,5л)',
          required: true,
          type: 'checkbox', // checkbox | radio
          name: 'q8',
          answers: [
            'Есть',
            'Надо делать',
            'Откинуть на разморозку',
            'Проварить с сахаром',
          ],
        },
        {
          title: 'Шраб вишня/кукуруза (минимальный остаток 1л)',
          required: true,
          type: 'checkbox', // checkbox | radio
          name: 'q9',
          answers: ['Есть', 'Надо делать', 'Откинуть на разморозку'],
        },
        {
          title: 'Кордиал Базилик (минимальный остаток 0,5л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q10',
          answers: [
            'Есть (в том числе в GBS минимум две бутылки)',
            'Надо делать',
          ],
        },
        {
          title: 'Грушевый Олео',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q11',
          answers: [
            'Есть ( в том числе Japan Punch минимум 3 бутылки)',
            'Надо делать',
          ],
        },
        {
          title: 'Джин ким-чи',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q12',
          answers: [
            'Есть ( в том числе Kimchi Negrony минимум 2 бутылки)',
            'Надо делать',
          ],
        },
        {
          title: 'Пена маракуйя (1 вакуумный пакет)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q13',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Масло Нори/лайм (минимум 1 флакончик)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q14',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Пшеничный чипс ( минимальный остаток 20 шт)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q15',
          answers: ['Есть', 'Надо делать'],
        },
        {
          title: 'Тыквенный чипс (минимальный остаток 20 шт)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q16',
          answers: ['Есть', 'Надо делать'],
        },
      ];

      await this.semiFinishedSettingsRepository.delete({});

      for (const item of data) {
        await this.semiFinishedSettingsRepository.save(item);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
