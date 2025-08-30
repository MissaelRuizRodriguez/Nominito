import { Exclude } from "class-transformer";
import {Column, Entity, PrimaryGeneratedColumn}  from "typeorm";

// Indica que esta clase representa una entidad (tabla) llamada 'users' en la base de datos
@Entity('users')
export class UserEntity {
    // Columna con primary key quenerada automaticamente
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidoPaterno: string;

    @Column()
    apellidoMaterno: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()  //Excluye de mostrar
    password: string;

}