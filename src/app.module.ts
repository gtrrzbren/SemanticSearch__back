/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegistroModule } from './entities/registro.module';
import { SearchProcessModule } from './SearchProcess/search-process.module';
import { ElasticsearchModule } from './SearchProcess/elasticsearch.module';
import { OntologyTreatmentModule } from './OntologyTreatment/ontology-treatment.module';

@Module({
  imports: [
    RegistroModule,
    SearchProcessModule,
    ElasticsearchModule,
    OntologyTreatmentModule,
  ],
})
export class AppModule {}
