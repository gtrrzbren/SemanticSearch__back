import { Module } from '@nestjs/common';
import { JenaSearchResourceService } from './jena-search-resource.service';
import { JenaSearchResourceController } from './jena-search-resource.controller';

@Module({
  controllers: [JenaSearchResourceController],
  providers: [JenaSearchResourceService],
})
export class JenaSearchResourceModule {}
