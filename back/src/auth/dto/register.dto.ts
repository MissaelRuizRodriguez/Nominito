// Apartado para las validciones al agregar, class_validator
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    nombres: string;
    @IsNotEmpty()
    apellidoPaterno: string;
    @IsNotEmpty()
    apellidoMaterno: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    passwordCofirm: string;
}