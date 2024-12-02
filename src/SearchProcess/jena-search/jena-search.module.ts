/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JenaSearchService } from './jena-search.service';

@Module({
  providers: [JenaSearchService],
  exports: [JenaSearchService],
})
export class JenaSearchModule {}

