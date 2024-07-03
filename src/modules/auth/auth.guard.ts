import { CanActivate, ExecutionContext, UnauthorizedException,Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UsersService){}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const req = context.switchToHttp().getRequest()

        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }  
            // получаю токен из пользователя в БД
            const user = await this.userService.getUserByToken(token)

            if(!user){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            req.user = user
            
            return true 

        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    } 

}