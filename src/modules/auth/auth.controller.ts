import { Body, Controller, Post, Res} from '@nestjs/common';
import { createUserDto } from '../users/dto/create-user-dto';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    // @Post('/login')
    // login(@Res() res: Response, @Body() userDto: createUserDto){
    //     const token = this.authService.login(userDto)
        
    //     return res.send({
    //         message: 'OK'
    //     })
    // }

    @Post('/login')
    login(@Body() userDto: createUserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    userRegistration(@Body() userDto: createUserDto){
        return this.authService.userRegistration(userDto)
    }
}
