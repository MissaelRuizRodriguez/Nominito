import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.interface';

// Indica que esta clase puede ser inyectada como un servicio en otros componentes
@Injectable()
export class AuthService {

    // Inyecta el repositorio de la entidad UserEntity usando TypeORM
    constructor(
        // Repositorio que permite acceder a la tabla de usuarios
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>
    ){

    }

    // Método asincrónico para crear un nuevo usuario en la base de datos
    async create(user: User): Promise<User>{
        // Guarda el objeto usuario en la base de datos y retorna el resultado
        return await this.userRepository.save(user);
    }

    // Metodo para buscar un usuario
    async findOneBy(condition: Partial<UserEntity>): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: condition });
    }

    // Metodo de update para la contraseña
    async update(id: number, data: any): Promise<any>{
        return await this.userRepository.update(id, data);
    }
}   
