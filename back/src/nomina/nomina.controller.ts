import { Controller, Get } from '@nestjs/common';
import { NominaService } from './nomina.service';

@Controller('nomina')
export class NominaController {

    constructor(private nominaService: NominaService){

    }

    @Get()
    getNomina() {
        //return ['nomina 2', 'nomina 2'];
        return this.nominaService.getNominas();
    }

}
