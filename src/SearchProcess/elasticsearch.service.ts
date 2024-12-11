/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({ node: 'http://localhost:9200' }); // Ajusta la URL según tu configuración
  }

  // Métodos para interactuar con Elasticsearch
  async search(index: string, query: any): Promise<any> {
    return this.client.search({
      index,
      body: query,
    });
  }
}
