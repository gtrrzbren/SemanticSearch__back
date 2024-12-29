/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { Registro } from '@prisma/client';

@Controller('search-process')
export class SearchProcessController {
  constructor(private readonly searchProcessService: SearchProcessService) {}

  @Get('buscar')
  async buscar(@Query('consulta') consulta: string): Promise<Registro[]> {
    return this.searchProcessService.busquedaPorPalabras(consulta);
  }
}
