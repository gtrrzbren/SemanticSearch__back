/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { Registro } from '@prisma/client';
import { SolicSearchSimple } from 'src/Entities/solics-search-simple.dto';
import { SolicAdvancSearch } from 'src/Entities/solics-search-advanc.dto';

@Controller('search-process')
export class SearchProcessController {
  constructor(private readonly searchProcessService: SearchProcessService) {}

  @Get('simple')
  async simpleSearch(@Query() query: SolicSearchSimple): Promise<{ registros: Registro[], temaRelacionado: string }> {
    return this.searchProcessService.busquedaPorPalabras(query.searchTerm);
  }

  @Get('suggestions')
  async getSuggestions(@Query('term') term: string): Promise<string[]> {
    return this.searchProcessService.getSuggestions(term);
  }

  @Get('advanced')
  async advancedSearch(@Query() query: SolicAdvancSearch): Promise<{ registros: Registro[], temaRelacionado: string }> {
    const consulta = this.buildAdvancedSearchQuery(query);
    return this.searchProcessService.busquedaPorPalabras(consulta);
  }

  private buildAdvancedSearchQuery(query: SolicAdvancSearch): string {
    const terms = [
      query.searchTerm,
      query.media,
      query.autor, // Incluimos el autor en la consulta
      query.section,
      query.publicationDate ? query.publicationDate.toISOString().split('T')[0] : null, // Formateamos la fecha
    ].filter(Boolean); // Filtramos valores nulos o vacíos

    return terms.join(' ');
  }
}