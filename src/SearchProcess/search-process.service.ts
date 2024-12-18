/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registro } from '../entities/registro.entity';
import { SearchResponse, SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { ElasticsearchService } from './elasticsearch.service';

@Injectable()
export class SearchProcessService {
  constructor(
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async busquedaPorPalabras(consulta: string): Promise<Registro[]> {
    const result: SearchResponse<Registro> = await this.elasticsearchService.customSearch({
      index: 'registro',
      body: {
        query: {
          multi_match: {
            query: consulta,
            fields: ['titulo', 'contenido'],
          },
        },
      },
    });

    const hits = result.hits.hits.filter((hit): hit is SearchHit<Registro> & { _source: Registro } => hit._source !== undefined);
    const ids = hits.map(hit => hit._source.materialPeriodisticoId);

    return this.registroRepository.findByIds(ids);
  }
}

