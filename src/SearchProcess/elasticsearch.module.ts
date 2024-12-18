/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchController } from './elasticsearch.controller';
import { SearchProcessService } from './search-process.service';

@Module({
  providers: [ElasticsearchService,SearchProcessService],
  controllers: [ElasticsearchController],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
