import { IsString, IsNotEmpty } from 'class-validator';
export class createUserDto{
    @IsString()
    @IsNotEmpty()
    login: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    second_name: string;

    @IsString()
    @IsNotEmpty()
    tg_token: string;

    @IsString()
    @IsNotEmpty()
    auth_token: string;
}