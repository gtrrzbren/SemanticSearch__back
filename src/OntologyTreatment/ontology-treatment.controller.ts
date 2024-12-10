/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';

@Controller('ontology')
export class OntologyTreatmentController {
  constructor(private readonly ontologyTreatmentService: OntologyTreatmentService) {}

  /*@Get('procesar')
  async procesar(): Promise<any> {
    return this.ontologyTreatmentService.procesar();
  }*/
}
