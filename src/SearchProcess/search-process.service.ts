/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Registro } from '@prisma/client';
import { ElasticsearchService } from './elasticsearch.service';
import { OntologyTreatmentService } from '../OntologyTreatment/ontology-treatment.service';

@Injectable()
export class SearchProcessService {
  private prisma = new PrismaClient(); // Cliente de Prisma para interactuar con la base de datos

  constructor(
    private readonly elasticsearchService: ElasticsearchService, // Servicio de Elasticsearch
    private readonly ontologyTreatmentService: OntologyTreatmentService, // Servicio de Ontología
  ) {}

  // Método para realizar una búsqueda por palabras
  async busquedaPorPalabras(consulta: string): Promise<{ registros: Registro[], temaRelacionado: string }> {
    // Establecer el término de búsqueda en la ontología
    this.ontologyTreatmentService.setSynonym(consulta);

    // Obtener sinónimos del término de búsqueda
    const synonyms = await this.ontologyTreatmentService.loadSynonym();

    // Realizar la búsqueda en Elasticsearch
    const result = await this.elasticsearchService.customMSearch([
      {
        index: 'registro',
        body: {
          query: {
            multi_match: {
              query: synonyms.join(' '),
              fields: ['titulo', 'contenido', 'autor', 'media', 'section', 'publicationDate'],
            },
          },
        },
      },
    ]);

    // Procesar los resultados de Elasticsearch
    const hits = result.responses[0].hits.hits.filter((hit): hit is any & { _source: Registro } => hit._source !== undefined);
    const ids = hits.map(hit => hit._source.id);

    // Obtener los registros completos desde Prisma
    const registros = await this.prisma.registro.findMany({
      where: {
        id: { in: ids },
      },
    });

    // Obtener un tema relacionado basado en la ontología
    const temaRelacionado = await this.ontologyTreatmentService.loadRelatedTopic(consulta);

    return { registros, temaRelacionado };
  }

  // Método para obtener sugerencias de términos relacionados
  async getSuggestions(term: string): Promise<string[]> {
    // Establecer el término de búsqueda en la ontología
    this.ontologyTreatmentService.setSynonym(term);

    // Obtener sugerencias de la ontología
    const suggestions = await this.ontologyTreatmentService.loadSuggestions();
    return suggestions;
  }
}