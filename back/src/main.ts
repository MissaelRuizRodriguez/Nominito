//Funcion pára crear moudulo de nest para el modulo 3000 y funcion bootstrap
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api'); // Para agregar a todo los app la accion API
  app.useGlobalPipes(new ValidationPipe()); // Agregas la liberia de Validator
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

    await app.listen(process.env.PORT ?? 8000);

}
bootstrap();
