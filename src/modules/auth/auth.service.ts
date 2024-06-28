import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/models/users.entity';
import { createUserDto } from '../users/dto/create-user-dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: createUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    private async generateToken(user: User){
        const payload = {login: user.login, id: user.id}
        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto: createUserDto){
        const user = await this.userService.getUserByLogin(userDto.login)
        const password = await bcrypt.compare(userDto.password, user.pass_hash)

        if(user && password){
            return user
        }

        throw new UnauthorizedException({message: 'Некорректный Login или пароль'})
    }
}

