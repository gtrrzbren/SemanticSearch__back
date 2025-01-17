/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('OntologyTreatment') // Etiqueta para agrupar los endpoints en Swagger
@Controller('ontology-treatment')
export class OntologyTreatmentController {
  constructor(private readonly ontologyTreatmentService: OntologyTreatmentService) {}

  @Get('load-all')
  @ApiQuery({ name: 'term', type: String, required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Términos relacionados cargados exitosamente' })
  async loadAll(@Query('term') term: string): Promise<string[]> {
    this.ontologyTreatmentService.setSynonym(term);
    return await this.ontologyTreatmentService.loadAll();
  }

  @Get('load-synonym')
  @ApiQuery({ name: 'term', type: String, required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Sinónimos cargados exitosamente' })
  async loadSynonym(@Query('term') term: string): Promise<string[]> {
    this.ontologyTreatmentService.setSynonym(term);
    return await this.ontologyTreatmentService.loadSynonym();
  }

  @Get('load-related')
  @ApiQuery({ name: 'term', type: String, required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Términos relacionados cargados exitosamente' })
  async loadRelated(@Query('term') term: string): Promise<string[]> {
    this.ontologyTreatmentService.setSynonym(term);
    return await this.ontologyTreatmentService.loadRelated();
  }

  @Get('load-father')
  @ApiQuery({ name: 'term', type: String, required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Términos superiores cargados exitosamente' })
  async loadFather(@Query('term') term: string): Promise<string[]> {
    this.ontologyTreatmentService.setSynonym(term);
    return await this.ontologyTreatmentService.loadFather();
  }
}