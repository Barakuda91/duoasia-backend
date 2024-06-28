import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/models/users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(dto: createUserDto){
        const hashPassword = await bcrypt.hash(dto.password, 5)

        const user = await this.userRepository.save({
            login: dto.login,
            pass_hash: hashPassword,
            name: dto.name,
            second_name: dto.second_name,
            tg_token: dto.tg_token,
            auth_token: dto.auth_token,
            last_visit: new Date()
        })
        return user;
    }

    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where: {login}})
        return user
    }
}

// ВОПРОСЫ:
// где и когда нужно записать в это поле --> auth_token значение?
// Нужно ли как-то возвращать пользователя на клиент после авторизации..? точно знаю что можно но нужно дописывать авторизацию так как в контроллере авторизации получаем только токен его нужно расшифровать и записать пользователя в запрос. Нужно ли это реализовывать...?
// Так же есть вопрос по связям в таблицах один ко многим и многие ко многим и т.д. есть не понимание