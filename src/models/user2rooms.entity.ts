import { 
    Entity, 
    PrimaryGeneratedColumn,  
    OneToOne,
    JoinColumn
    } 
from "typeorm";

import { User } from "./users.entity";
import { Room } from "./rooms.entity";

@Entity({name: 'user2rooms'})
export class user2room{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user_id: User

    @OneToOne(() => Room)
    @JoinColumn()
    room_id: Room
}