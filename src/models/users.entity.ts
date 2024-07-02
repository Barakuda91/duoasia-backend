import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToOne, 
    ManyToMany,
    JoinColumn, 
    CreateDateColumn, 
    UpdateDateColumn  } 
from "typeorm";

import { UserType } from "./types.entity";
import { Service } from "./services.entity";
import { Room } from "./rooms.entity";

@Entity({name: 'users'})
export class  User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    name: string;

    @Column({default: null})
    second_name: string;

    @Column({default: null})
    tg_token: string;

    @Column({default: null})
    auth_token: string;

    @Column({type: 'date'})
    last_visit: Date;

    @OneToOne(() => UserType)
    @JoinColumn()
    type_id: UserType;

    @ManyToMany(() => Service, (service) => service.users)
    services: Service[]

    @ManyToMany(() => Room, (room) => room.users)
    rooms: Room[]

    @Column()
    login: string;

    @Column()
    pass_hash: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
    
}