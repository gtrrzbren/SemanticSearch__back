/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SearchProcessModule } from './SearchProcess/search-process.module';
import { ElasticsearchModule } from './SearchProcess/elasticsearch.module';
import { OntologyTreatmentModule } from './OntologyTreatment/ontology-treatment.module';
import { RegistroModule } from 'src/Entities/registro.module';

@Module({
  imports: [
    RegistroModule,
    SearchProcessModule,
    ElasticsearchModule,
    OntologyTreatmentModule,
  ],
})
export class AppModule { }
