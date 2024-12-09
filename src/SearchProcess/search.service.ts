/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(query: string): Promise<any[]> {
    const result = await this.elasticsearchService.search({
      index: 'your-index-name', // Asegúrate de reemplazar esto con el nombre de tu índice
      body: {
        query: {
          match: { content: query },
        },
      },
    });
    return result.hits.hits;
  }
}