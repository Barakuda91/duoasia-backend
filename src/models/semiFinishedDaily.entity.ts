import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'semi_finished_daily' })
export class SemiFinishedDaily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'setting_id' })
  settingId: number;

  @Column('json')
  answers: number[];

  @Column({ name: 'time_when_created' })
  timeWhenCreated: string;
}
