import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() userDto: createUserDto){
        return this.userService.createUser(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
     getAllUsers(){
        return this.userService.getAllUsers()
    }
    
}
