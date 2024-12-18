/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService extends Client {

  constructor() {
    super({ node: 'http://localhost:9200' })
  }

  // Métodos para interactuar con Elasticsearch
  async search(index: string, query: any): Promise<any> {
    return // implementar logica de buscado
  }
}
