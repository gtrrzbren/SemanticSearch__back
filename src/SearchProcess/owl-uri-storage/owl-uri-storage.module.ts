import { Module } from '@nestjs/common';
import { OwlUriStorageService } from './owl-uri-storage.service';
import { OwlUriStorageController } from './owl-uri-storage.controller';

@Module({
  controllers: [OwlUriStorageController],
  providers: [OwlUriStorageService],
})
export class OwlUriStorageModule {}
