// Controla el ruteo, controladores y servicios
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NominaModule } from './nomina/nomina.module';
import { AuthModule } from './auth/auth.module';
import { ResetModule } from './reset/reset.module';

@Module({
  imports: [NominaModule, 
    AuthModule,
    ResetModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nominas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //Autodetecta entidades dentro de la carpeta
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
