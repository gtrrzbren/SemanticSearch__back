/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { Registro } from '../entities/registro.entity';

@Controller('search')
export class SearchProcessController {
  constructor(private readonly searchProcessService: SearchProcessService) {}

  @Get('buscar')
  async buscar(@Query('q') query: string): Promise<Registro[]> {
    return this.searchProcessService.busquedaPorPalabras(query);
  }
}
