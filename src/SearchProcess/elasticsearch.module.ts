/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchController } from './elasticsearch.controller';


@Module({
  imports: [],
  providers: [ElasticsearchService],
  controllers: [ElasticsearchController],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
