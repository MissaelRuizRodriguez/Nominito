import { Controller, Body, Post, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { ResetService } from './reset.service';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class ResetController {
    constructor(
        private resetService: ResetService,
        private mailService: MailerService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) {
    }
    
    @Post('forgot')
    async forgot(@Body('email') email: string) {
        const token = crypto.randomBytes(32).toString('hex').substring(0, 10);

        await this.resetService.create({
            email,
            token
        })

        const url = `http://localhost:4200/reset/${token}`;


        await this.mailService.sendMail({
            to: email,
            subject: 'Reset your password',
            html: `Click <a href="${url}"> aqui </a> para resetear tu contrasena`
        })

        return {message: 'Revisa tu correo'}

    }

    @Post('reset')
    async resert(
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if ( password !== password_confirm ){
            throw new BadRequestException('Las contrasenas no coinciden');
        }

        const reset = await this.resetService.findOne({token})
        if (!reset) {
           throw new BadRequestException('Token inválido o expirado');
        }

        const email =  reset.email;

        const user = await this.authService.findOneBy({ email })
        if ( !user ) {
            throw new BadRequestException('Usuario invalido');
        }

        const hashedPasword = await bcrypt.hash(password, 12);

        await this.authService.update(user.id, {password: hashedPasword});

        return{
            message: 'Hecho'
        }
    }
}
