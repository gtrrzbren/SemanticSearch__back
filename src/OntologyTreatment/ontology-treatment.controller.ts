/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';

@Controller('ontology')
export class OntologyTreatmentController {
  constructor(private readonly ontologyTreatmentService: OntologyTreatmentService) {}

  @Get('load-all')
  loadAll(@Query('synonym') synonym: string): string[] {
    this.ontologyTreatmentService.setSynonym(synonym);
    return this.ontologyTreatmentService.loadAll();
  }

  @Get('load-synonym')
  loadSynonym(@Query('synonym') synonym: string): string[] {
    this.ontologyTreatmentService.setSynonym(synonym);
    return this.ontologyTreatmentService.loadSynonym();
  }

  @Get('load-related')
  loadRelated(@Query('synonym') synonym: string): string[] {
    this.ontologyTreatmentService.setSynonym(synonym);
    return this.ontologyTreatmentService.loadRelated();
  }

  @Get('load-father')
  loadFather(@Query('synonym') synonym: string): string[] {
    this.ontologyTreatmentService.setSynonym(synonym);
    return this.ontologyTreatmentService.loadFather();
  }
}

