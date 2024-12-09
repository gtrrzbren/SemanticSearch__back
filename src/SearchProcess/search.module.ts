/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [ElasticsearchModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
