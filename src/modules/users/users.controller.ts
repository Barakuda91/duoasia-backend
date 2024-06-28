import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() userDto: createUserDto){
        return this.userService.createUser(userDto)
    }
}
