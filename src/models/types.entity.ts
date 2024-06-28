import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm";

@Entity({name: 'types'})
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;
}