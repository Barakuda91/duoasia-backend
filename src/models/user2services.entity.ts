import { 
    Entity, 
    PrimaryGeneratedColumn,  
    OneToOne,
    JoinColumn
    } 
from "typeorm";

import { User } from "./users.entity";
import { Service } from "./services.entity";

@Entity({name: 'user2services'})
export class User2Service{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user_id: User;

    @OneToOne(() => Service)
    @JoinColumn()
    service_id: Service;
}