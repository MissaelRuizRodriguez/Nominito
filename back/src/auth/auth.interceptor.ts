import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService){ 
    // Inyecta el servicio JwtService de NestJS para poder verificar JWTs
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Obtiene la petición HTTP del contexto
    const requests = context.switchToHttp().getRequest();
    try{
      // Intenta leer la cookie llamada 'jwt'
      const jwt = requests.cookies['jwt'];

      // Verifica el token JWT
      // Si no es válido, lanza excepción 401 Unauthorized
      if (!this.jwtService.verify(jwt)){
        throw new UnauthorizedException();
      }
    }catch(e) {
      throw new UnauthorizedException();
    }

    // Si el token es válido, continúa con la ejecución de la ruta
    return next.handle();
    
  }
}
