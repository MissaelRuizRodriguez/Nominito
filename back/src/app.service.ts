// Servicio bascio con un solo metodo
import { Injectable } from '@nestjs/common';

@Injectable() // Decorador
export class AppService {
  getHello(): string {
    return 'Prueba del cambio!';
  }
}
