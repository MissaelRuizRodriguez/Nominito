import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';

// Aplica un interceptor de NestJS que serializa las entidades automáticamente
// Esto es útil para ocultar campos sensibles 'password' al devolver objetos
@UseInterceptors(ClassSerializerInterceptor)
// Define un controlador en NestJS para manejar las rutas relacionadas con la autenticación
@Controller()
export class AuthController {
    // Inyecta el servicio de autenticación mediante el constructor
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ){

    }

     // Maneja peticiones POST a la ruta '/register'
     // Validacion para el registro evita que si la contraseña no coincide mada error
    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password !== body.passwordConfirm){
            throw new BadRequestException('Conntraseñas no coinciden'); // Funcion que sirve pára retornar errores
        }

        // Encripta la contraseña del usuario utilizando bcrypt con 12 rondas de sal
        body.password = await bcrypt.hash(body.password, 12);

        // Llama al servicio de authService para crear un nuevo usuario con los datos del cuerpo de la solicitud
        return this.authService.create(body
            // {
        //     nombres: body.nombres,
        //     apellidoPaterno: body.apellidoPaterno,
        //     apellidoMaterno: body.apellidoMaterno,
        //     email: body.email,
        //     password: hashed, // Contraseña Encriptada
        // }
        );
    }

    // Login del empleado
    @Post('login')
    async login(
        @Body('email') email: string,              // Recibe del body el email
        @Body('password') password: string,        // Recibe del body el password
        @Res({ passthrough: true }) response: Response // Inyecta la respuesta HTTP para poder modificar cookies
    ) { 

        // Busca en la BD un usuario que tenga el email dado
        const user = await this.authService.findOneBy({ email });


        // Si no existe un usuario con ese email
        if (!user) {
            throw new BadRequestException('Usuario no existe');
        }

        // Compara la contraseña en texto plano con la contraseña encriptada guardada en la BD
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña no coincide
        if (!isPasswordValid) {
            throw new BadRequestException('Credenciales inválidas');
        }

        // Genera un JWT firmando el ID del usuario (payload = {id: user.id})
        // jstService debe ser JwtService inyectado en tu servicio
        const jwt = await this.jwtService.signAsync({ id: user.id });

        // Guarda el JWT como una cookie en la respuesta
        // httpOnly: true => la cookie no puede ser accedida desde JS del navegador (más seguro)
        response.cookie('jwt', jwt, { httpOnly: true });

        // Devuelve el usuario
        return user;
    }

    @UseInterceptors(AuthInterceptor)
    @Get('user')
    async user(@Req() request: Request) {
        // Obtiene la cookie llamada 'jwt' enviada por el cliente en la petición
        const cookie = request.cookies['jwt'];

        // Verifica el JWT usando JwtService y devuelve su payload si es válido
        // Por ejemplo, payload podría ser { id: 1, email: 'usuario@test.com', iat: ..., exp: ... }
        const data = await this.jwtService.verifyAsync(cookie);

        // Busca en la base de datos el usuario correspondiente al 'id' que viene en el payload
        // Devuelve un UserEntity que será serializado por ClassSerializerInterceptor
        return this.authService.findOneBy({ id: data['id'] });
    }

    @UseInterceptors(AuthInterceptor)
    @Post('logout')
    async logout( @Res({ passthrough: true }) response: Response ) {
        response.clearCookie('jwt');

        return { message: 'Success'}
    }

}
