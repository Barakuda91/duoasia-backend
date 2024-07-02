import { userInfo } from "os";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToOne,
    ManyToMany,
    JoinTable,
    JoinColumn } 
from "typeorm";

import { Service } from "./services.entity";
import { User } from "./users.entity";

@Entity({name: 'rooms'})
export class Room{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Service)
    @JoinColumn()
    services_id: Service;

    @ManyToMany(() => User, (user) => user.rooms)
    @JoinTable()
    users: User[]

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    chat_id: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}