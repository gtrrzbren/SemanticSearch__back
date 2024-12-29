/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get('search')
  async search(@Query('index') index: string, @Query('q') query: string) {
    const queries = [
      {
        index,
        body: {
          query: {
            match: { content: query },
          },
        },
      },
    ];
    return this.elasticsearchService.customMSearch(queries);
  }
}
