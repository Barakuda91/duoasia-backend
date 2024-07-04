import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { createUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() userDto: createUserDto){
        return this.userService.createUser(userDto)
    }

    @UseGuards(AuthGuard)
    @Get()
     getAllUsers(){
        return this.userService.getAllUsers()
    }
    
}
