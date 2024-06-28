import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToOne, 
    JoinColumn } 
from "typeorm";

import { Service } from "./services.entity";

@Entity({name: 'rooms'})
export class Room{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Service)
    @JoinColumn()
    services_id: Service;

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