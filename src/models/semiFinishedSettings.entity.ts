import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';

@Entity({ name: 'semi_finished_settings' })
export class SemiFinishedSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  required: boolean;

  @Column({ default: 'radio' })
  type: string;

  @Column({ default: null })
  name?: string;

  @Column({ type: 'json' })
  answers: string[];
}
