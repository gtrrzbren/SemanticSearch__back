/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OntologyTreatmentService } from './ontology-treatment.service';
import { OntologyTreatmentController } from 'src/OntologyTreatment/ontology-treatment.controller';

@Module({
  providers: [OntologyTreatmentService],
  controllers: [OntologyTreatmentController],
  exports: [OntologyTreatmentService]
})
export class OntologyTreatmentModule { }
