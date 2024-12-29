/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';

@Module({
  providers: [OntologyTreatmentService],
  controllers: [OntologyTreatmentService],
})
export class OntologyTreatmentModule {}
