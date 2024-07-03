import { Injectable, UnauthorizedException, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'
import { createUserDto } from '../users/dto/create-user-dto';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async login(userDto: createUserDto, response: any){
        const user = await this.validateUser(userDto)
        // получил токен авторизации из пользователя
        const token = user.auth_token

        response.cookie('auth_token', token, {httpOnly: true})
        
        response.send({message: 'Авторизация прошла успешно', user: user})
    }

    async userRegistration(userDto: createUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login)

        if(candidate){
            throw new HttpException('Пользователь с таким именем существует', HttpStatus.BAD_REQUEST)
        }
        // тут не используем шифрование с bcrypt а просто делаем обычный хеш
        const hashPassword = await bcrypt.hash(userDto.password, 5)  

        const user = await this.userService.createUser({...userDto, password: hashPassword})

        // вернуть пользователя
        return user
    }


    private async validateUser(userDto: createUserDto){
        const user = await this.userService.getUserByLogin(userDto.login)

        // а здесь сравниваем две строки одну прешедшую с фронта с паролем(хеш) лежащим в базе
        const password = await bcrypt.compare(userDto.password, user.pass_hash)

        if(user && password){
            return user
        }

        throw new UnauthorizedException({message: 'Некорректный Login или пароль'})
    }
}

