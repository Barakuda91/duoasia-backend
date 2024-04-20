import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TryCatchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Логируйте ошибку или делайте что-то еще с ней здесь
        console.error('Error occurred:', error);
        // Возвращаем ошибку, если это необходимо
        return throwError({
          status: 'ERROR',
          error: error.message,
        });
      }),
    );
  }
}
