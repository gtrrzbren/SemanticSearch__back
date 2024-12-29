/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({ node: 'http://localhost:9200' });
  }

  async customMSearch(queries: any[]): Promise<any> {
    const msearchBody = queries.reduce((acc, query) => {
      return acc.concat([{ index: query.index }, { query: query.body.query }]);
    }, []);
    return this.client.msearch({ body: msearchBody });
  }
}


