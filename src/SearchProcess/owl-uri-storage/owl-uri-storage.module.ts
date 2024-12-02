/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OwlUriStorageService } from './owl-uri-storage.service';

@Module({
  providers: [OwlUriStorageService],
  exports: [OwlUriStorageService],
})
export class OwlUriStorageModule {}
