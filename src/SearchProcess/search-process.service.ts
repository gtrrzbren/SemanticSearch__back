/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registro } from '../entities/registro.entity';
import { ElasticsearchService } from './elasticsearch.service';
import { OntologyTreatmentService } from '../OntologyTreatment/ontology-treatment.service';

@Injectable()
export class SearchProcessService {
  constructor(
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly ontologyTreatmentService: OntologyTreatmentService,
  ) {}

  async busquedaPorPalabras(consulta: string): Promise<Registro[]> {
    // Usa OntologyTreatmentService para procesar la consulta
    this.ontologyTreatmentService.setSynonym(consulta);
    const synonyms = await this.ontologyTreatmentService.loadSynonym();

    // Realiza una búsqueda en Elasticsearch usando msearch
    const result = await this.elasticsearchService.customMSearch([
      {
        index: 'registro',
        body: {
          query: {
            multi_match: {
              query: synonyms.join(' '),
              fields: ['titulo', 'contenido'],
            },
          },
        },
      }
    ]);

    const hits = result.responses[0].hits.hits.filter((hit): hit is any & { _source: Registro } => hit._source !== undefined);
    const ids = hits.map(hit => hit._source.materialPeriodisticoId);

    return this.registroRepository.findByIds(ids);
  }
}
