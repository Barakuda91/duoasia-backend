import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'semi_finished_settings' })
export class SemiFinishedSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  required: boolean;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column({ type: 'json' })
  answers: string[];
}
