/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';
import { OntologyTreatmentController } from './ontology-treatment.controller';

@Module({
  providers: [OntologyTreatmentService],
  controllers: [OntologyTreatmentController],
})
export class OntologyTreatmentModule {}
