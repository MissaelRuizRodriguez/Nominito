import { Injectable } from '@nestjs/common';

@Injectable()
export class NominaService {
    private nomina = [
        {
            name : 'Fulanito',
            year : '25',
            salary : '2000',
        },
        {
            name : 'Pancho',
            year : '25',
            salary : '2000',
        },
        {
            name : 'Jaun',
            year : '25',
            salary : '2000',
        },
    ];

    getNominas(){
        return this.nomina
    }

}
