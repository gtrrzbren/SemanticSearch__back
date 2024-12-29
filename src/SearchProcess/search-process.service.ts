/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Registro } from '@prisma/client';
import { ElasticsearchService } from './elasticsearch.service';
import { OntologyTreatmentService } from '../OntologyTreatment/ontology-treatment.service';

@Injectable()
export class SearchProcessService {
  private prisma = new PrismaClient();

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly ontologyTreatmentService: OntologyTreatmentService,
  ) {}

  async busquedaPorPalabras(consulta: string): Promise<Registro[]> {
    this.ontologyTreatmentService.setSynonym(consulta);
    const synonyms = await this.ontologyTreatmentService.loadSynonym();

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
      },
    ]);

    const hits = result.responses[0].hits.hits.filter((hit): hit is any & { _source: Registro } => hit._source !== undefined);
    const ids = hits.map(hit => hit._source.id);

    return this.prisma.registro.findMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
