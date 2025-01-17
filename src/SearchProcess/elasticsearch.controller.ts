/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Elasticsearch') // Etiqueta para agrupar los endpoints en Swagger
@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get('search')
  @ApiQuery({ name: 'index', type: String, required: true, description: 'Índice de Elasticsearch' })
  @ApiQuery({ name: 'q', type: String, required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Resultados de la búsqueda' })
  async search(@Query('index') index: string, @Query('q') query: string) {
    const queries = [
      {
        index,
        body: {
          query: {
            match: { content: query },
          },
        },
      },
    ];
    return this.elasticsearchService.customMSearch(queries);
  }
}
