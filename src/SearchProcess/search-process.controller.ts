/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { Registro } from '@prisma/client';
import { Media, Section } from '@prisma/client';
import { SolicSearchSimple } from 'src/Entities/solics-search-simple.dto';
import { SolicAdvancSearch } from 'src/Entities/solics-search-advanc.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('SearchProcess') // Etiqueta para agrupar los endpoints en Swagger
@Controller('search-process')
export class SearchProcessController {
  constructor(private readonly searchProcessService: SearchProcessService) {}

  @Get('simple')
  @ApiQuery({ name: 'searchTerm', type: String, required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Resultados de la búsqueda simple' })
  async simpleSearch(@Query() query: SolicSearchSimple): Promise<{ registros: Registro[], temaRelacionado: string }> {
    return this.searchProcessService.busquedaPorPalabras(query.searchTerm);
  }

  @Get('suggestions')
  @ApiQuery({ name: 'term', type: String, required: true, description: 'Término para obtener sugerencias' })
  @ApiResponse({ status: 200, description: 'Sugerencias de búsqueda' })
  async getSuggestions(@Query('term') term: string): Promise<string[]> {
    return this.searchProcessService.getSuggestions(term);
  }

  @Get('advanced')
  @ApiQuery({ name: 'searchTerm', type: String, required: false, description: 'Término de búsqueda' })
  @ApiQuery({ name: 'media', type: String, enum: Object.values(Media), required: false, description: 'Medio de prensa' })
  @ApiQuery({ name: 'autor', type: String, required: false, description: 'Autor del artículo' })
  @ApiQuery({ name: 'section', type: String, enum: Object.values(Section), required: false, description: 'Sección del artículo' })
  @ApiQuery({ name: 'publicationDate', type: String, format: 'date-time', required: false, description: 'Fecha de publicación' })
  @ApiResponse({ status: 200, description: 'Resultados de la búsqueda avanzada' })
  async advancedSearch(@Query() query: SolicAdvancSearch): Promise<{ registros: Registro[], temaRelacionado: string }> {
    const consulta = this.buildAdvancedSearchQuery(query);
    return this.searchProcessService.busquedaPorPalabras(consulta);
  }

  private buildAdvancedSearchQuery(query: SolicAdvancSearch): string {
    const terms = [
      query.searchTerm,
      query.media,
      query.autor,
      query.section,
      query.publicationDate ? query.publicationDate.toISOString().split('T')[0] : null,
    ].filter(Boolean);

    return terms.join(' ');
  }
}