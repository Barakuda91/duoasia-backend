import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'semi_finished_daily' })
export class SemiFinishedDaily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'setting_id' })
  settingId: number;

  @Column('json')
  answers: string[];

  @CreateDateColumn({
    name: 'time_when_created',
    type: 'date',
  })
  @Column({
    name: 'time_when_created',
    type: 'date',
  })
  timeWhenCreated: Date;
}
