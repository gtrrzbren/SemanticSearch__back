import { Module } from '@nestjs/common';
import { JenaSearchService } from './jena-search.service';
import { JenaSearchController } from './jena-search.controller';

@Module({
  controllers: [JenaSearchController],
  providers: [JenaSearchService],
})
export class JenaSearchModule {}
