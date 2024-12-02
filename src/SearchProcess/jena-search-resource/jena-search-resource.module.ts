/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JenaSearchResourceController } from './jena-search-resource.controller';
import { JenaSearchResourceService } from './jena-search-resource.service';
import { JenaSearchModule } from './jena-search.module';
import { OwlUriStorageService } from '../owl-uri-storage/owl-uri-storage.service';

@Module({
  imports: [JenaSearchModule],
  controllers: [JenaSearchResourceController],
  providers: [JenaSearchResourceService, OwlUriStorageService],
})
export class JenaSearchResourceModule {}


