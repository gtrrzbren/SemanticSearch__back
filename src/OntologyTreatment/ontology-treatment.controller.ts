/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';

@Controller('ontology-treatment')
export class OntologyTreatmentController {
  constructor(private readonly ontologyTreatmentService: OntologyTreatmentService) {}

  @Get('load-all')
  async loadAll(): Promise<string[]> {
    return await this.ontologyTreatmentService.loadAll();
  }

  @Get('load-synonym')
  async loadSynonym(): Promise<string[]> {
    return await this.ontologyTreatmentService.loadSynonym();
  }

  @Get('load-related')
  async loadRelated(): Promise<string[]> {
    return await this.ontologyTreatmentService.loadRelated();
  }

  @Get('load-father')
  async loadFather(): Promise<string[]> {
    return await this.ontologyTreatmentService.loadFather();
  }
}
