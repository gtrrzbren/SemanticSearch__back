/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from '../entities/registro.entity';
import { RegistroService } from '../entities/registro.service';
import { SearchProcessService } from './search-process.service';
import { ElasticsearchModule } from './elasticsearch.module';
import { OntologyTreatmentModule } from '../OntologyTreatment/ontology-treatment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Registro]), ElasticsearchModule, OntologyTreatmentModule],
  providers: [SearchProcessService, RegistroService],
  exports: [SearchProcessService],
})
export class SearchProcessModule {}

