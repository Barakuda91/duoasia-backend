import { Body, Controller, Post, Res} from '@nestjs/common';
import { createUserDto } from '../users/dto/create-user-dto';
import {  Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
   async login(@Body() userDto: createUserDto, @Res() res: Response){
        
        return this.authService.login(userDto, res)
    }

    @Post('/registration')
    userRegistration(@Body() userDto: createUserDto){
        return this.authService.userRegistration(userDto)
    }
}
