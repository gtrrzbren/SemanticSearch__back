/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JenaSearchResourceModule } from './SearchProcess/jena-search-resource/jena-search-resource.module';
import { OwlUriStorageModule } from './SearchProcess/owl-uri-storage/owl-uri-storage.module';

@Module({
  imports: [JenaSearchResourceModule, OwlUriStorageModule],
  controllers: [AppController],
})
export class AppModule {}


