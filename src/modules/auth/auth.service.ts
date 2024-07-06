import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hashUserPassword } from 'src/helpers/index.helper';
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
        // хешируем пароль который пользователь вводит при регистрации
        const hashPassword =  hashUserPassword(userDto.password);

        const user = await this.userService.createUser({...userDto, password: hashPassword})

        return user
    }


    private async validateUser(userDto: createUserDto){
        const user = await this.userService.getUserByLogin(userDto.login)

        if (!user) {
            throw new UnauthorizedException({message: 'Некорректный Login или пароль'});
        }
        // сравнение хешированных паролей с фронта и бэк (SHA256)
        const isPasswordCorrect =  userDto.password === user.pass_hash 

        if(user && isPasswordCorrect){
            return user
        }

        throw new UnauthorizedException({message: 'Некорректный Login или пароль'});
    }
}

