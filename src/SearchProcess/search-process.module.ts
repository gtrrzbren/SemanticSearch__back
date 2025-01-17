/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { ElasticsearchModule } from './elasticsearch.module';
import { OntologyTreatmentModule } from '../OntologyTreatment/ontology-treatment.module';
import { RegistroService } from 'src/Entities/registro.service';
import { SearchProcessController } from './search-process.controller'; // Importar el controlador

@Module({
  imports: [ElasticsearchModule, OntologyTreatmentModule],
  providers: [SearchProcessService, RegistroService],
  controllers: [SearchProcessController],
  exports: [SearchProcessService],
})
export class SearchProcessModule { }
