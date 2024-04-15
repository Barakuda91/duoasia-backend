import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('bar')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('daily_semifinished')
  getHello(): any {
    return {
      status: 'OK',
      data:[
        {
          title: 'Осветленный лимон (минимальный остаток 1л)',
          required: true,
          type: 'checkbox',
          name: 'q1',
          answers: [
            'Есть',
            'Надо делать',
            'Откинуть на разморозку',
          ],
        },
        {
          title: 'Сироп Лемонграсс/кафир (минимальный остаток 1л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q2',
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
        {
          title: 'Пряный чили (минимальный остаток 1л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q3',
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
        {
          title: 'Cироп ваниль (минимальный остаток 1л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q4',
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
        {
          title: 'Грейпфрут/Малина (минимальный остаток 1л)',
          required: true,
          type: 'checkbox', // checkbox | radio
          name: 'q5',
          answers: [
            'Есть',
            'Надо делать',
            'Откинуть на разморозку',
          ],
        },
        {
          title: 'Сироп кокос/манго (минимальный остаток 0,5л)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q6',
          answers: [
            'Есть',
            'Надо делать',
          ],
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
          answers: [
            'Есть',
            'Надо делать',
            'Откинуть на разморозку',
          ],
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
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
        {
          title: 'Масло Нори/лайм (минимум 1 флакончик)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q14',
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
        {
          title: 'Пшеничный чипс ( минимальный остаток 20 шт)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q15',
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
        {
          title: 'Тыквенный чипс (минимальный остаток 20 шт)',
          required: true,
          type: 'radio', // checkbox | radio
          name: 'q16',
          answers: [
            'Есть',
            'Надо делать',
          ],
        },
      ],
    };
  }
}
