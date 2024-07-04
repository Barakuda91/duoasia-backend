import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateRandomString } from 'src/helpers/index.helper';
import { User } from 'src/models/users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(dto: createUserDto){
        const token = generateRandomString(20)

        const user = await this.userRepository.save({
            login: dto.login,
            pass_hash: dto.password,
            name: dto.name,
            second_name: dto.second_name,
            tg_token: dto.tg_token,
            auth_token: token,
            last_visit: new Date()
        })
        return user;
    }

    async getAllUsers(){
        const users = await this.userRepository.find()
        return users
    }

    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where: {login}})
        return user
    }

    async getUserByToken(auth_token: string){
        const user = await this.userRepository.findOne({where: {auth_token}})
        return user
    }

   
}
