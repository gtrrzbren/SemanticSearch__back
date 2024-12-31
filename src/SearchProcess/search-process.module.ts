/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { ElasticsearchModule } from './elasticsearch.module';
import { OntologyTreatmentModule } from '../OntologyTreatment/ontology-treatment.module';
import { RegistroService } from 'src/Entities/registro.service';

@Module({
  imports: [ElasticsearchModule, OntologyTreatmentModule],
  providers: [SearchProcessService, RegistroService],
  exports: [SearchProcessService],
})
export class SearchProcessModule { }

